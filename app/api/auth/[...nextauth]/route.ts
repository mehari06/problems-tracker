// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "@/prisma/client";


// const handler = NextAuth({
//      adapter: PrismaAdapter(prisma),
//   providers:[
//       GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//   })
//   ],
//   session:{
//     strategy:'jwt'
//   }
//   ,
//   // Custom pages and callbacks to safely link OAuth accounts to existing users
//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/signin'
//   },
//   callbacks: {
//     // Link OAuth account to an existing user with the same verified email
//     async signIn({ user, account, profile }) {
//       try {
//         if (!account || !user?.email) return true;

//         // If an account already exists for this provider+providerAccountId, allow
//         const existingAccount = await prisma.account.findUnique({
//           where: {
//             provider_providerAccountId: {
//               provider: account.provider,
//               providerAccountId: account.providerAccountId
//             }
//           }
//         });

//         if (existingAccount) return true;

//         // If a user with this email exists, and the provider claims the email is verified,
//         // create the account record to link them.
//         const existingUser = await prisma.user.findUnique({ where: { email: user.email } });

//         const emailVerified = (profile && (profile as any).email_verified) ?? true;

//         if (existingUser && emailVerified) {
//           await prisma.account.create({
//             data: {
//               userId: existingUser.id,
//               provider: account.provider,
//               type: account.type,
//               providerAccountId: account.providerAccountId,
//               // NextAuth provides snake_case props on account for oauth
//               access_token: (account as any).access_token ?? null,
//               refresh_token: (account as any).refresh_token ?? null,
//               expires_at: (account as any).expires_at ?? null,
//               scope: (account as any).scope ?? null,
//               token_type: (account as any).token_type ?? null,
//               id_token: (account as any).id_token ?? null
//             }
//           });
          

//           return true;
//         }

//         // Otherwise, allow sign in to continue. NextAuth will handle new user creation.
//         return true;
//       } catch (err) {
//         console.error('signIn callback error', err);
//         return false;
//       }
//     }
//   }
// });

// export { handler as GET, handler as POST }
  
//new
import authOptions from "@/app/auth/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };