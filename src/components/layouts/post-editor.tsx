'use client'
import { PostRequest } from '@/models/post.request'
import ApiService, { API_PATHS } from '@/services/api.service'
import { useSession } from 'next-auth/react'
import { z } from 'zod'
import PostForm, { postFormSchema } from '../forms/post.form'


export function PostEditor() {
  const { data: session, status} = useSession();

  const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
    if (status != 'authenticated') return

    const newPost: PostRequest = {
      title: values.postTitle,
      content: values.content,
      author_id: session.user.id,
      created_at: new Date(),
      published: false, 
      thumbnail: '',
      categories: values.categories
    }
    console.log(newPost)
    try {
      await ApiService.post(API_PATHS.addPost, newPost)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PostForm onSubmit={onSubmit}/>
  )
}
