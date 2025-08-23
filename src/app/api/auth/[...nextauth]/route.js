const { default: NextAuth } = require("next-auth");
import clientPromise from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Your Email" },
                password: { label: "Password", type: "password", placeholder: "Your Password" }
            },
            async authorize(credentials, req) {
                const client = await clientPromise;
                const db = client.db("sunTech"); // your DB name
                const users = db.collection("users");
                // Add logic here to look up the user from the credentials supplied
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                const user = await users.findOne({ email: credentials.email });
                if (user) {
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) throw new Error("Incorrect password");
                    else return user
                    // Any object returned will be saved in `user` property of the JWT           
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
