import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Your middleware logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: [
    '/issues/new',
    '/issues/edit/:id+'
  ]
}