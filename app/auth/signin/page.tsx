// "use client"

// import React from 'react'
// import { signIn } from 'next-auth/react'

// export default function SignInPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="p-6 rounded border bg-white/50">
//         <h1 className="text-2xl mb-4">Sign in</h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//           onClick={() => signIn('google')}
//         >
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   )
// }

//new 
'use client';

import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSignIn = async () => {
    try {
      const result = await signIn('google', { 
        callbackUrl: '/',
        redirect: false 
      });
      
      if (result?.error) {
        console.error('Sign in error:', result.error);
        // The error will be handled by the URL parameter
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded border bg-white/50 max-w-md w-full">
        <h1 className="text-2xl mb-4">Sign in</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-semibold">Sign in failed</p>
            <p className="text-sm mt-1">Error: {error}</p>
            <p className="text-xs mt-2">
              This might be due to incorrect Google OAuth configuration or database issues.
            </p>
          </div>
        )}

        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={handleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}