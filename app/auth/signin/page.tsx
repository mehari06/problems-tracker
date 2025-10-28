"use client"

import React from 'react'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded border bg-white/50">
        <h1 className="text-2xl mb-4">Sign in</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => signIn('google')}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
