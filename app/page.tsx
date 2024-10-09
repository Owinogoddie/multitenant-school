import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="EduManage Logo" width={40} height={40} />
          <span className="ml-2 text-2xl font-bold text-blue-600">EduManage</span>
        </div>
        <nav>
          <Link href="/login" className="text-blue-600 hover:text-blue-800 mr-4">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Revolutionize Your School Management</h1>
          <p className="text-xl mb-8">Streamline administration, enhance communication, and boost productivity with EduManage.</p>
          <Link href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">Get Started</Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            title="Efficient Administration" 
            description="Manage students, staff, and resources all in one place."
            icon="🏫"
          />
          <FeatureCard 
            title="Seamless Communication" 
            description="Connect parents, teachers, and students effortlessly."
            icon="💬"
          />
          <FeatureCard 
            title="Insightful Analytics" 
            description="Make data-driven decisions with powerful reporting tools."
            icon="📊"
          />
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Trusted by Schools Worldwide</h2>
          <div className="flex justify-center space-x-8">
            <Image src="/school1-logo.png" alt="School 1" width={100} height={50} />
            <Image src="/school2-logo.png" alt="School 2" width={100} height={50} />
            <Image src="/school3-logo.png" alt="School 3" width={100} height={50} />
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Ready to Transform Your School?</h2>
          <p className="text-center mb-8">Join thousands of schools already using EduManage to streamline their operations.</p>
          <div className="text-center">
            <Link href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">Start Your Free Trial</Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 EduManage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}