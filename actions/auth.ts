'use server'

import { cookies, headers } from 'next/headers'
import { lucia } from '@/lib/auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs';
import { generateEmailVerificationToken, sendVerificationEmail } from '@/lib/mail'

export async function registerAction(email: string, password: string) {
  try {
    const headersList = headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const origin = `${protocol}://${host}`
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { success: false, message: 'Email already in use' }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = await generateEmailVerificationToken()
    const expiresAt = new Date(Date.now() + 600000); // 10 minutes from now

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        verificationCode: {
          create: {
            code: verificationCode,
            email,
            expiresAt,
          },
        },
      },
    })

    await sendVerificationEmail(email, verificationCode)

    return { success: true, message: "User created. Please check your email for the verification code." }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An error occurred' }
  }
}

export async function verifyEmailAction(email: string, code: string) {
  try {
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
      },
      include: { user: true },
    });

    if (!verificationCode) {
      return { success: false, message: 'Invalid or expired token' }
    }

    if (verificationCode.expiresAt < new Date()) {
      await prisma.verificationCode.delete({
        where: { id: verificationCode.id },
      });
      return { success: false, message: "Verification code has expired" };
    }
    await prisma.user.update({
      where: { id: verificationCode.userId },
      data: { emailVerified: true },
    });

    await prisma.verificationCode.delete({
      where: { id: verificationCode.id },
    });
    return { success: true, message: "Email verified successfully" }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An error occurred' }
  }
}

export async function loginAction(email: string, password: string, domain?: string) {
  try {
    let user
    if (domain) {
      const school = await prisma.school.findUnique({
        where: { domain },
        include: { users: { where: { email } } },
      })

      if (!school || school.users.length === 0) {
        return { success: false, message: 'Invalid credentials' }
      }

      user = school.users[0]
    } else {
      user = await prisma.user.findUnique({ where: { email } })
    }

    if (!user) {
      return { success: false, message: 'Invalid credentials' }
    }

    if (!user.emailVerified) {
      return { success: false, message: 'Please verify your email before logging in' }
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword!);
    if (!validPassword) {
      return { success: false, message: 'Invalid credentials' }
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true,message:"successfully logged in" }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An error occurred' }
  }
}

export async function logoutAction() {
  try {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value
    if (!sessionId) {
      return { success: true }
    }

    await lucia.invalidateSession(sessionId);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'An error occurred' }
  }
}

export async function sendPasswordResetCodeAction(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return { success: false, message: 'User not found' }
    }

    const verificationCode = await generateEmailVerificationToken()
    const expiresAt = new Date(Date.now() + 600000) // 10 minutes from now

    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code: verificationCode,
        email,
        expiresAt,
        type: 'PASSWORD_RESET',
      },
    })

    await sendVerificationEmail(email, verificationCode)

    return { success: true, message: 'Verification code sent. Please check your email.' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An error occurred' }
  }
}

export async function verifyPasswordResetCodeAction(email: string, verificationCode: string) {
  try {
    const code = await prisma.verificationCode.findFirst({
      where: {
        email,
        code: verificationCode,
        type: 'PASSWORD_RESET',
        expiresAt: { gt: new Date() },
      },
    })

    if (!code) {
      return { success: false, message: 'Invalid or expired verification code' }
    }

    return { success: true, message: 'Verification code valid' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An error occurred' }
  }
}

export async function resetPasswordAction(email: string, verificationCode: string, newPassword: string) {
  try {
    const code = await prisma.verificationCode.findFirst({
      where: {
        email,
        code: verificationCode,
        type: 'PASSWORD_RESET',
        expiresAt: { gt: new Date() },
      },
    })

    if (!code) {
      return { success: false, message: 'Invalid or expired verification code' }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { hashedPassword },
    })

    await prisma.verificationCode.delete({ where: { id: code.id } })

    return { success: true, message: 'Password reset successfully' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An error occurred' }
  }
}