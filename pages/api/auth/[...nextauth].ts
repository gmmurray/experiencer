import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import ObjectID from 'bson-objectid';
import clientPromise from '../../../config/mongoAdapter';

const nextAuth = NextAuth({
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
                const db = (await clientPromise).db();
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
        logo: `${process.env.NEXT_PUBLIC_BASE_URL}e_icon.png`,
        colorScheme: 'dark',
    },
});

export default nextAuth;
