'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="EduManage Logo" width={40} height={40} />
            <span className="ml-2 text-2xl font-bold text-blue-600">EduManage</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/features" className="text-gray-600 hover:text-blue-600">Features</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link href="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
          </nav>
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 py-2">
            <Link href="/features" className="block py-2 text-gray-600 hover:text-blue-600">Features</Link>
            <Link href="/pricing" className="block py-2 text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link href="/about" className="block py-2 text-gray-600 hover:text-blue-600">About</Link>
            <Link href="/login" className="block py-2 text-blue-600 hover:text-blue-800">Login</Link>
            <Link href="/register" className="block py-2 bg-blue-600 text-white px-4 rounded hover:bg-blue-700">Register</Link>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4">
        <section className="text-center py-20 md:py-32">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Revolutionize Your School Management
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600">
            Streamline administration, enhance communication, and boost productivity with EduManage - the all-in-one solution for modern educational institutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
              Start Free Trial
            </Link>
            <Link href="/demo" className="bg-white text-blue-600 border border-blue-600 px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition duration-300">
              Request Demo
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            title="Efficient Administration"
            description="Manage students, staff, and resources all in one place with our intuitive dashboard."
            icon="🏫"
          />
          <FeatureCard
            title="Seamless Communication"
            description="Connect parents, teachers, and students effortlessly with integrated messaging and notifications."
            icon="💬"
          />
          <FeatureCard
            title="Insightful Analytics"
            description="Make data-driven decisions with powerful reporting tools and customizable dashboards."
            icon="📊"
          />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {[...Array(5)].map((_, index) => (
                <Testimonial key={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-8">Trusted by Schools Worldwide</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Image src="/school1-logo.png" alt="School 1" width={120} height={60} />
            <Image src="/school2-logo.png" alt="School 2" width={120} height={60} />
            <Image src="/school3-logo.png" alt="School 3" width={120} height={60} />
            <Image src="/school4-logo.png" alt="School 4" width={120} height={60} />
            <Image src="/school5-logo.png" alt="School 5" width={120} height={60} />
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg mb-20">
          <h2 className="text-3xl font-bold mb-4 text-center">Ready to Transform Your School?</h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            Join thousands of schools already using EduManage to streamline their operations and enhance educational outcomes.
          </p>
          <div className="text-center">
            <Link href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduManage</h3>
              <p className="text-gray-400">Revolutionizing school management for the digital age.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 EduManage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }:any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function Testimonial() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-4 w-80 flex-shrink-0">
      <p className="text-gray-600 mb-4">"EduManage has completely transformed how we manage our school. It's user-friendly and incredibly efficient!"</p>
      <div className="flex items-center">
        <Image src="/user-avatar.jpg" alt="User" width={40} height={40} className="rounded-full mr-3" />
        <div>
          <p className="font-semibold">Jane Doe</p>
          <p className="text-sm text-gray-500">Principal, XYZ School</p>
        </div>
      </div>
    </div>
  )
}