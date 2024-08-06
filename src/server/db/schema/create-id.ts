

export function createId(prefix: string) {
    const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().toString()

    return `${prefix}_${timestamp}${randomId}`
}