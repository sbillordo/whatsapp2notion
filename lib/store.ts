import { Client } from '@notionhq/client'

export async function isAlreadyProcessed(messageId: string): Promise<boolean> {
    // 1. Query Notion database
    const notion = new Client({
        auth: process.env.NOTION_TOKEN,
    })

    const databaseId = process.env.NOTION_DATABASE_ID
    const existingPages = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'WhatsAppID',
            rich_text: {
                equals: messageId
            }
        }
    })

    return existingPages.results.length > 0
    // 2. Buscar páginas con messageId
    // 3. Retornar true si existe, false si no
}

