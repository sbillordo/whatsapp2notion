import { verifyMetaSignature, getMediaUrl, extractMessagesFromWebhook } from "../../../lib/whatsapp"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const mode = url.searchParams.get('hub.mode')
    const token = url.searchParams.get('hub.verify_token')
    const challenge = url.searchParams.get('hub.challenge')

    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {  
        return new Response(challenge, { status: 200 })
    }

    return new Response ('Forbidden', { status: 403 }	)
}

export async function POST(request: Request) {
    const body = await request.json()
    
    if (!verifyMetaSignature(request, JSON.stringify(body), process.env.WHATSAPP_APP_SECRET)) {
        return  new Response('Forbidden', { status: 403 })
        }
    
    // Extraer mensajes del webhook de WhatsApp
        const messages = extractMessagesFromWebhook(body)

        for (const message of messages) {
            let payload: any = {
                messageId: message.messageId,
                from: message.from,
            }
        
            if (message.type === 'text') {
                payload.text = message.text
            } else if (message.type === 'audio') {
                const mediaUrl = await getMediaUrl(message.audioId)
                if (mediaUrl) {
                    payload.mediaUrl = mediaUrl
                }
            }

            // Lanzar procesamiento interno (fire-and-forget)
            fetch(`${new URL(request.url).origin}/api/process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-internal': process.env.INTERNAL_SECRET || 'secret'
                },
                body: JSON.stringify(payload)
            }).catch(console.error) // No esperamos respuesta
        }
    

    return new Response('OK', { status: 200 })
}