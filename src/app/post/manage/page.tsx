'use client'
import { columns } from '@/components/common/tables/post/column'
import { DataTable } from '@/components/common/tables/table'
import LeftNavigation from '@/components/layouts/left-navigation'
import { PostEditor } from '@/components/layouts/post-editor'
import { PostDTO } from '@/models/post'
import ApiService, { API_PATHS } from '@/services/api.service'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function ProfileManage() {
  const { data: session, status } = useSession()
  const [hash, setHash] = useState<string>('posts')
  const [posts, setPosts] = useState<PostDTO[]>([])
  const [postsWaitForApprove, setPostsWaitForApprove] = useState<PostDTO[]>([])
  useEffect(() => {
    const getPosts = async () => {
      if (status !== 'authenticated' && !session) return
      const userId = session.user.id
      const data: PostDTO[] = await ApiService.get(
        API_PATHS.getPostsByUserId.replace(':user_id', userId)
      )
      const dataWaitForApprove: PostDTO[] = await ApiService.get(
        API_PATHS.getPostsWaitForApprove.replace(':user_id', userId)
      )
      setPosts(data)
      setPostsWaitForApprove(dataWaitForApprove)
    }
    getPosts()
  }, [status])

  return (
    <div className="flex md:flex-row min-[375px]:flex-col">
      <div className='max-w-xs:w-full xl:w-2/12'>
        <LeftNavigation hash={hash} setHash={setHash} />
      </div>
      <div className="w-full mt-14 lg:w-8/12">
        <section className="">
          {hash === 'posts' && (
            <div className="">
              <DataTable columns={columns} data={posts} />
            </div>
          )}
          {hash === 'create' && (
            <div className="">
              <PostEditor />
            </div>
          )}
          {hash === 'approve' && (
            <div className="">
              <DataTable columns={columns} data={postsWaitForApprove} />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
