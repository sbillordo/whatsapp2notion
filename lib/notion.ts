import { Client } from '@notionhq/client'

export async function createNotionPage(
    content: string, 
    intent: any, 
    messageId: string, 
    transcript?: string, 
    mediaUrl?: string
): Promise<boolean> {
    const notion = new Client({
        auth: process.env.NOTION_TOKEN,
    })

    try {
        await notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE_ID
            },
            properties: {
                // Título de la página
                "Name": {
                    title: [{ text: { content: intent.titulo || content.substring(0, 100) } }]
                },
                // ID de WhatsApp para evitar duplicados
                "WhatsAppID": {
                    rich_text: [{ text: { content: messageId } }]
                },
                // Propiedades del intent
                "Priority": {
                    select: { name: intent.prioridad || "Medium" }
                },
                "Status": {
                    status: { name: intent.status || "Inbox" }
                },
                "P.A.R.A.": {
                    select: { name: intent.para || "Projects" }
                }
            },
            children: [
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [{ text: { content: content } }]
                    }
                }
            ]
        })
        return true
    } catch (error) {
        console.error('Error creating Notion page:', error)
        return false
    }
}