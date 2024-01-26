import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "app/globals.css";
import Providers from "../components/Providers";
import Link from "next/link";

import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "A Blog Webapp",
    description: "A blog webapp built with Next.js and TailwindCSS and Laravel",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className + " flex flex-col min-h-screen"}>
                <header className="px-4 lg:px-6 h-14 flex items-center">
                    <a className="flex items-center justify-center" href="#">
                        <TagsIcon className="h-6 w-6 " />
                        <span className="sr-only">Blog Logo</span>
                    </a>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        <Link
                            className="text-sm font-medium hover:underline underline-offset-4 "
                            href="/"
                        >
                            Home
                        </Link>
                        <Link
                            className="text-sm font-medium hover:underline underline-offset-4 "
                            href="/about"
                        >
                            About
                        </Link>
                        <Link
                            className="text-sm font-medium hover:underline underline-offset-4 "
                            href="/login"
                        >
                            Login
                        </Link>
                        <Link
                            className="text-sm font-medium hover:underline underline-offset-4 "
                            href="/register"
                        >
                            Register
                        </Link>
                    </nav>
                </header>
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    );
}

function TagsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z" />
            <path d="M6 9.01V9" />
            <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
        </svg>
    );
}
