import { ReactNode } from "react";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <>
            <Head>
                <title>Bullshit Calculator</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen bg-neutral-800 text-white py-8">
                <div className="container mx-auto">{children}</div>
            </main>
        </>
    );
};

export default Layout;
