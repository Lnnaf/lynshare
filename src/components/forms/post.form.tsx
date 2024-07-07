'use client'
import { Button } from '../ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import React from 'react'
import { TagInput } from '../common/tags-list'

const CustomEditor = dynamic(() => import('@/components/common/ckeditor'), {
  ssr: false
})

export const postFormSchema = z.object({
  postTitle: z
    .string()
    .min(30, {
      message: 'Post title must be at least 30 characters.'
    })
    .max(200, { message: 'Post title only has maximum 200 characters.' }),
  content: z.string().min(30, {
    message: 'Your content too short, please type more.'
  }),
  categories: z
    .array(z.string())
    .nonempty({ message: 'Please select at least one category.' })
})

const PostForm = (props: {
  onSubmit: (data: z.infer<typeof postFormSchema>) => void
}) => {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema)
  })
  const [categories, setCategories] = React.useState<string[]>([])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="postTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of your post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <CustomEditor
                  data={field.value}
                  setData={field.onChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder="Enter a topic"
                  tags={categories}
                  className="sm:min-w-[450px]"
                  maxSizeOneTag={4}
                  setTags={(newTags) => {
                    setCategories(newTags)
                    form.setValue(
                      'categories',
                      newTags as [string, ...string[]]
                    )
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default PostForm
