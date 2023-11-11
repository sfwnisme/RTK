export const shortTitleUtil = (title, limit) => title.length >= limit ? title.substring(0, limit) + '...' : title

/**
 * NOTE: short text by adding the text and the limit
 * limit: number
 * text: string
*/
