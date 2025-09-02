import crypto from 'crypto'
import { env } from 'process'

export function verifyMetaSignature(req: Request, rawBody: string, appSecret: string): boolean {

    const signature = req.headers.get['x-hub-signature-256']
    if (!signature) {
        return false
    }

    const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', appSecret)
        .update(rawBody)
        .digest('hex')

    return crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(expectedSignature, 'utf8'))
}

export async function getMediaUrl(mediaId: string): Promise<string | null> {
    try {
        const mediaResponse = await fetch(`https://graph.facebook.com/v18.0/${mediaId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`
            }
        })
        const mediaData = await mediaResponse.json()
        if (!mediaResponse.ok) {
            console.error(`Meta API error: ${mediaResponse.status}`)
            return null
        }
        return mediaData.url ? mediaData.url : null
        }
    catch (error) {
        console.error('Error getting media url', error)
        return null
    }
}

export async function downloadAudio(mediaUrl: string): Promise<Buffer | null> {

    try {
        const response = await fetch(mediaUrl, {
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`
            }
        })
        if (!response.ok) {
            console.error(`Meta API error: ${response.status}`)
            return null
        }
        const mediaData = await response.arrayBuffer()
        return Buffer.from(mediaData)
    }
    catch (error) {
        console.error('Error downloading audio', error)
        return null
    }

}

export async function sendWhatsappMessage(to: string, text: string): Promise<boolean> {
    try {
        // Limpiar el formato "whatsapp:+1234567890" -> "1234567890"
        const cleanTo = to.replace('whatsapp:', '').replace('+', '')
        
        const body = {
            messaging_product: "whatsapp",
            to: cleanTo,
            type: "text",
            text: {
                body: text
            }
        }

        const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_TO_NUMBER}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            console.error(`Meta API error: ${response.status}`)
            return false
        }

        return true
    } catch (error) {
        console.error('Error sending WhatsApp message:', error)
        return false
    }
}


export function extractMessagesFromWebhook(body: any): Array<any> {
    const messages: Array<any> = []
    
    // 1. Validar que existe la estructura esperada
    if (!body.entry || !body.entry[0]?.changes || !body.entry[0].changes[0]?.value?.messages) {
        return messages // Array vacío si no hay mensajes
    }
    
    // 2. Obtener los mensajes del webhook
    const webhookMessages = body.entry[0].changes[0].value.messages
    
    // 3. Procesar cada mensaje
    for (const message of webhookMessages) {
        const normalizedMessage = {
            messageId: message.id,
            from: `whatsapp:${message.from}`,
            type: message.type
        }
        
        // 4. Agregar contenido específico según el tipo
        if (message.type === 'text') {
            normalizedMessage.text = message.text?.body
        } else if (message.type === 'audio') {
            normalizedMessage.audioId = message.audio?.id
        }
        
        messages.push(normalizedMessage)
    }
    
    return messages
}