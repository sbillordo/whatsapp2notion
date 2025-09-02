export function normalizeText(text: string): string {
    return text.toLowerCase().trim()
}

export function extractTags(text: string): string[] {
    return text.match(/#[^ ]+/g) || []
}   

export function extractTagsFromTranscript(text: string): string[] {
    return text.match(/#[^ ]+/g) || []
}