import { Container, Link } from '@mui/material';

import { Fragment } from 'react';
import NextLink from 'next/link';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
    const { data: session } = useSession();

    return (
        <Container>
            <div>
                links
                <ul>
                    <li>
                        <NextLink href="/github" passHref>
                            <Link>search github users</Link>
                        </NextLink>
                    </li>
                    {session && session.user && (
                        <Fragment>
                            <li>
                                <NextLink
                                    // @ts-ignore
                                    href={`/github/${session.user.login}`}
                                    passHref
                                >
                                    <Link>my github profile</Link>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    // @ts-ignore
                                    href={`/users/${session.user.providerAccountId}`}
                                    passHref
                                >
                                    <Link>my experiencer profile</Link>
                                </NextLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </Container>
    );
};

export default Home;
