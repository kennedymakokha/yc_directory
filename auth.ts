/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCookie } from "cookies-next"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { jwtDecode } from 'jwt-decode';
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const existingUser = await fetch(`http://localhost:8000/api/v1/author/${profile?.id}`)
      const user = await existingUser.json()
      if (!user.author) {
        const requestOptions = {
          method: "POST", // Specify the request method
          headers: { "Content-Type": "application/json" }, // Specify the content type
          body: JSON.stringify({
            _type: 'author',
            id: profile?.id,
            name,
            username: profile?.login,
            email,
            image,
            bio: profile?.bio || ""
          }) // Send the data in JSON format
        };
        await fetch(`http://localhost:8000/api/v1/author`, requestOptions)


      }
    
      const response = await fetch(`http://localhost:8000/api/v1/author/${profile?.id}`, { method: "POST" })
      const userObj = await response.json()
      const decoded: any = jwtDecode(userObj?.token);
      const expiry = new Date(parseInt(decoded?.exp?.toString() || '0') * 1000);
      setCookie('tkn', userObj?.token, { expires: expiry });
      
      return true
    },
    // async jwt({ token, account, profile }) {
    //   console.log("PROFILE",profile)
    //   if (account && profile) {
    //     const existingUser = await fetch(`http://localhost:8000/api/v1/author/${profile?.id}`)
    //     const user = await existingUser.json()

    //     if (user) {
    //       token.id = user?._id
    //     }
    //     return token
    //   }
    // },
 
    async session({ session, token }) {
      Object.assign(session, { source: { id: token._id } });
      return session;
    }

  }
})