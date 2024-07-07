import { BookPlus, CircleCheckBig, LineChart, List, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function LeftNavigation(props: {
  hash: string
  setHash: (hash: string) => void
}) {
  const onToggle = (hash: string) => {
    props.setHash(hash)
    document.getElementById(hash)?.classList.add('text-primary')
  }
  const classIfIsActivating = (hash: string) => {
    const defaultClassName =
      'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
    return `${defaultClassName} ${
      props.hash === hash ? 'text-primary bg-muted' : 'text-muted-foreground'
    }`
  }
  return (
    <div className="flex md:flex-col w-full px-2 text-sm font-medium lg:px-4">
      <div>
        <Link
          id="posts"
          href="#posts"
          onClick={() => onToggle('posts')}
          className={classIfIsActivating('posts')}
        >
          <List className="h-4 w-4" />
          My Posts
        </Link>
      </div>
      <div>
        <Link
          id="create"
          href="#create"
          onClick={() => onToggle('create')}
          className={classIfIsActivating('create')}
        >
          <BookPlus className="h-4 w-4" />
          Create a post
        </Link>
      </div>
      <div>
        <Link
          id="approve"
          href="#approve"
          onClick={() => onToggle('approve')}
          className={classIfIsActivating('approve')}
        >
          <CircleCheckBig className="h-4 w-4" />
          Wait for approval
        </Link>
      </div>
    </div>
  )
}
