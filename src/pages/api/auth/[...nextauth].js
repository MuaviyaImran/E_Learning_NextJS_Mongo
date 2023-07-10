import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user/user.model";

import dbConnect from "../../../database/conn";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // @ts-ignore
      async authorize(credentials) {
        dbConnect().catch(() => {
          throw new Error("DB Connection Failed!");
        });

        // @ts-ignore
        const result = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        // compare()
        const checkPassword = await result.comparePassword(
          credentials.password
        );

        // incorrect password
        if (!checkPassword) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.firstname + " " + user.lastname,
          image: user.profilePic,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
});
