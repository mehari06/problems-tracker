// import prisma from "@/prisma/client";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { NextAuthOptions } from "next-auth";


// const authOptions:NextAuthOptions={
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt'
//   },
//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/signin'
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       console.log('SignIn callback triggered:', { user: user?.email, provider: account?.provider });
      
//       // Allow all sign-ins for now to test the flow
//       // We'll add the account linking logic back once basic auth works
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       // Redirect to home page after successful sign in
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     }
//   },
//   debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
// };

// function PrismaAdapter(prisma: any) {
//     throw new Error("Function not implemented.");
// }


// function GoogleProvider(arg0: { clientId: string; clientSecret: string; authorization: { params: { prompt: string; access_type: string; response_type: string; }; }; }) {
//     throw new Error("Function not implemented.");
// }
// export default authOptions;
import prisma from "@/prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback triggered:', { user: user?.email, provider: account?.provider });
      
      // Allow all sign-ins for now to test the flow
      // We'll add the account linking logic back once basic auth works
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to home page after successful sign in
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
};

export default authOptions;