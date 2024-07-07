export type PostRequest = {
  created_at?: Date
  update_at?: Date
  title: string
  content: string
  published: boolean
  author_id: string
  thumbnail: string,
  categories: string[]
}
