import OpenAI from 'openai'

// Definir el tipo Intent
interface Intent {
    modo: string
    prioridad: string
    status: string
    para: string
    tags: string[]
    titulo: string
    necesita_documentacion: boolean
}

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const transcription = await openai.audio.transcriptions.create({
        file: audioBuffer,
        model: 'whisper-1',
    })
    return transcription.text
}

export async function classifyIntent(transcript: string): Promise<Intent> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const intent = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: transcript }],
    })
    return intent.choices[0].message.content
}

export async function generateContent(transcript: string, intent: Intent): Promise<string> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const content = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: transcript }],
    })
    return content.choices[0].message.content
}