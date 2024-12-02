"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navigation() {
    const pathName = usePathname();
    return (
        <nav className="flex justify-center item-center p-4">
            <Link href="/" className={pathName === "/" ? "font-bold mr-4" : "mr-4 text-blue-500"}>
                Home
            </Link>
            <Link href="/about" className={pathName === "/about" ? "font-bold mr-4" : "mr-4 text-blue-500"}>
                About
            </Link>
            <Link href="/products/1" className={pathName === "/products/1" ? "font-bold mr-4" : "mr-4 text-blue-500"}>
                Products 1
            </Link>
            <SignedOut>
                <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </nav>
    );
}