import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import SequelizeAdapter from "@auth/sequelize-adapter";
import {sequelize, adapter} from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter
})
