import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'

export default async function SchoolHomePage({ params }: { params: { domain: string } }) {
  const user = await getUser()

  if (!user) {
    redirect(`/${params.domain}/login`)
  }

  return (
    <div>
      <h1>Welcome to {params.domain} School Dashboard</h1>
      {/* Add your school dashboard content here */}
    </div>
  )
}