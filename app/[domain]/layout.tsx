import { ReactNode } from 'react'
import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/auth'

export default async function SchoolLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { domain: string }
}) {
  const school = await prisma.school.findUnique({
    where: { domain: params.domain },
    include: { subscription: true }
  })

  if (!school) {
    notFound()
  }

  const user = await getUser()

  if (!user) {
    redirect(`/${params.domain}/login`)
  }

  // Check if the subscription is active
  const isSubscriptionActive = school.subscription && 
    school.subscription.status === 'ACTIVE' &&
    new Date(school.subscription.endDate) > new Date()

  if (!isSubscriptionActive && params.domain !== 'subscription') {
    redirect(`/${params.domain}/subscription`)
  }

  return (
    <div>
      {/* You can add school-specific layout elements here */}
      {children}
    </div>
  )
}