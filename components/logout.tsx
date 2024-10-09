'use client'

import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (response.ok) {
        router.push('/') // Redirect to home page after logout
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
    >
      Logout
    </button>
  )
}