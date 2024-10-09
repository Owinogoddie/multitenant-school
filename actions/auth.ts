"use server"

import { cookies } from 'next/headers'
import { lucia } from '@/lib/auth'
import  prisma  from '@/lib/prisma'
import { Argon2id } from 'oslo/password'

export async function loginAction(email: string, password: string, domain?: string) {
  try {
    let user
    if (domain) {
      const school = await prisma.school.findUnique({
        where: { domain },
        include: { users: true },
      })

      if (!school) {
        return { success: false, error: 'School not found' }
      }

      user = school.users.find(u => u.email === email)
    } else {
      user = await prisma.user.findUnique({ where: { email } })
    }

    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    const validPassword = await new Argon2id().verify(user.hashedPassword, password)
    if (!validPassword) {
      return { success: false, error: 'Invalid credentials' }
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'An error occurred' }
  }
}

export async function logoutAction() {
  try {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value
    if (!sessionId) {
      return { success: true }
    }

    await lucia.invalidateSession(sessionId)
    cookies().set(lucia.sessionCookieName, '', { expires: new Date(0) })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'An error occurred' }
  }
}

export async function registerAction(name: string, email: string, password: string, schoolName: string, domain: string) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { success: false, error: 'Email already in use' }
    }

    const existingSchool = await prisma.school.findUnique({ where: { domain } })
    if (existingSchool) {
      return { success: false, error: 'Domain already in use' }
    }

    const hashedPassword = await new Argon2id().hash(password)

    const school = await prisma.school.create({
      data: {
        name: schoolName,
        domain,
      },
    })

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: 'ADMIN',
        schoolId: school.id,
      },
    })

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'An error occurred' }
  }
}