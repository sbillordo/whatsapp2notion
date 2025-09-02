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
    
    // Convertir Buffer a formato compatible usando casting de tipos
    const audioFile = new File([audioBuffer as any], 'audio.wav', { type: 'audio/wav' })
    
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
    })
    return transcription.text
}

export async function classifyIntent(transcript: string): Promise<Intent> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    
    const prompt = `Analiza el siguiente texto y clasifícalo según estas categorías:
    
Texto: "${transcript}"

Responde en formato JSON con esta estructura:
{
    "modo": "nota|tarea|recordatorio|pregunta",
    "prioridad": "High|Medium|Low", 
    "status": "Inbox|In Progress|Done",
    "para": "Projects|Areas|Resources|Archive",
    "tags": ["tag1", "tag2"],
    "titulo": "título descriptivo",
    "necesita_documentacion": true|false
}`

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: "json_object" }
    })
    
    try {
        const intentData = JSON.parse(response.choices[0].message.content || '{}')
        return {
            modo: intentData.modo || 'nota',
            prioridad: intentData.prioridad || 'Medium',
            status: intentData.status || 'Inbox',
            para: intentData.para || 'Projects',
            tags: intentData.tags || [],
            titulo: intentData.titulo || '',
            necesita_documentacion: intentData.necesita_documentacion || false
        }
    } catch (error) {
        // Fallback si hay error parseando JSON
        return {
            modo: 'nota',
            prioridad: 'Medium',
            status: 'Inbox',
            para: 'Projects',
            tags: [],
            titulo: '',
            necesita_documentacion: false
        }
    }
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