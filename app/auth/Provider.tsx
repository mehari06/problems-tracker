'use client';
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider basePath="/api/auth">{children}</SessionProvider>
  )
}

export default AuthProvider