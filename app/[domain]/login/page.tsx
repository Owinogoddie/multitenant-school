import SchoolLoginForm from '@/components/SchoolLoginForm'

export default function SchoolLoginPage({ params }: { params: { domain: string } }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to {params.domain}</h1>
        <SchoolLoginForm domain={params.domain} />
      </div>
    </div>
  )
}