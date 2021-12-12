import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GithubProvider from 'next-auth/providers/github';
// @ts-ignore
import clientPromise from '../../../config/mongoAdapter';
import { connectToDatabase } from '../../../config/mongodbClient';
import ObjectID from 'bson-objectid';
const nextAuth = NextAuth({
    // @ts-ignore
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt',
    },
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
            // @ts-ignore
            profile(profile) {
                const { name, login, id, html_url, email, avatar_url } =
                    profile;

                return {
                    name,
                    login,
                    providerAccountId: id,
                    id,
                    email,
                    githubUrl: html_url,
                    image: avatar_url,
                };
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        // @ts-ignore
        session: async params => {
            const { session, token } = params;
            if (session && session.user && token && token.sub) {
                const { db } = await connectToDatabase();
                const user = await db
                    .collection('users')
                    // @ts-ignore
                    .findOne({ _id: ObjectID(token.sub) });

                return Promise.resolve({
                    user: {
                        ...user,
                    },
                });
            }
            return Promise.resolve(session?.user);
        },
    },
    theme: {
        logo: `${process.env.NEXT_PUBLIC_BASE_URL}favicon.ico`,
        colorScheme: 'dark',
    },
});

export default nextAuth;
