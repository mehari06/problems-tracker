import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Status } from '@prisma/client';
import { issueSchema } from './../../validationSchema';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Find the user by their email from the session
    const user = await prisma.user.findUnique({
        where: { email: session.user?.email! }
    });

    // Create the issue and automatically assign it to the logged-in user
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
            assignedToUserId: user?.id || null  // Assign to current user if found
        }
    });

    return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') ?? undefined;
    const pageStr = url.searchParams.get('page') ?? '1';
    const pageSizeStr = url.searchParams.get('pageSize') ?? '10';

    const allowed = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
    const where = status && status !== 'all' && allowed.includes(status) ? { status: status as Status } : undefined;

    const page = Number.isNaN(parseInt(pageStr, 10)) ? 1 : parseInt(pageStr, 10);
    const pageSize = Number.isNaN(parseInt(pageSizeStr, 10)) ? 10 : parseInt(pageSizeStr, 10);

    // Count total items for pagination
    const total = await prisma.issue.count({ where });

    const issues = await prisma.issue.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (Math.max(1, page) - 1) * pageSize,
        take: pageSize,
    });

    return NextResponse.json({ items: issues, total });
}