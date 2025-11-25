'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/"><AiFillBug /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]

    return (
        <ul className='flex space-x-6'>
            {links.map(link =>
                <li key={link.href}>
                    <Link
                        className={
                            classnames({
                                'text-zinc-900': currentPath === link.href,
                                'text-zinc-500': currentPath !== link.href,
                                'hover:text-zinc-800 transition-colors': true
                            })
                        }
                        href={link.href}>
                        {link.label}
                    </Link>
                </li>
            )}
        </ul>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return null;
    if (status === "unauthenticated") return <Link href="/api/auth/signin">Login</Link>

    // Add defensive check for session data
    if (!session?.user) return null;

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session.user.image || ''}
                        size="2"
                        fallback="?"
                        radius="full"
                        className="cursor-pointer"
                        referrerPolicy="no-referrer"
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">
                            {session.user.email || 'User'}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Logout</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar