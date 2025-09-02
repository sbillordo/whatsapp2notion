// Imports (ejemplo de estructura, no código real)
import { isAlreadyProcessed } from "../../lib/store";
import { downloadAudio } from "../../lib/whatsapp";
import { transcribeAudio, classifyIntent, generateContent } from "../../lib/openai";
import { normalizeText } from "../../lib/text-utils";
import { createNotionPage } from "../../lib/notion";
import { sendWhatsappMessage } from "../../lib/whatsapp"; // opcional       


export async function POST(request: Request) {
    //parsear el body
    const body = await request.json()
    const { messageId, from, text, mediaUrl } = body

    // Verificar firma de acceso request: X-Internal-Secret
    const internalSecret = request.headers.get('x-internal')
    if (!internalSecret || internalSecret !== process.env.INTERNAL_SECRET) {
        return new Response('Forbidden', { status: 403 })
    }

    // Verificar si el mensaje ya ha sido procesado
    if (isAlreadyProcessed(messageId)) {
        return new Response('Message already processed', { status: 200 })
    }


    let transcript = ''
    if (mediaUrl) {
        const audioBuffer = await downloadAudio(mediaUrl)
        transcript = await transcribeAudio(audioBuffer)
    } else if (text) {
        transcript = normalizeText(text)
    }

    let intent = ''

    intent = await classifyIntent(transcript)
    if (!intent) {
        intent = {
            modo: 'nota',
            prioridad: 'Medium',
            status: 'Inbox',
            para: 'Projects',
            tags: [],
            titulo: '',
            necesita_documentacion: false
        }
    }

     
    const content = await generateContent(transcript, intent)


    const notionResponse = await createNotionPage(content, intent, messageId, transcript, mediaUrl)

    if (notionResponse) {
        sendWhatsappMessage(from, content)
        return new Response('OK', { status: 200 })
    } else {
        return new Response('Error', { status: 500 })
    }
}
    
