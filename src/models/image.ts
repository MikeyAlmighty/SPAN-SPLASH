export type ImageModel = {
    id: string
    description: string
    likes: number
    urls: {
        regular: string
        // small?: string
        // thumb?: string
    }
}
