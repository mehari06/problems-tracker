import { NextRequest, NextResponse } from "next/server"
import { string } from "zod"
import { safeParse } from "zod/v4/core";
import { issueSchema,PatchIssueSchema } from './../../../validationSchema';
import prisma from "@/prisma/client";
import { Issue } from '@prisma/client';
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";


export async function PATCH(
    request:NextRequest,
    {params}:{params:{id:string}}){
           const session =await getServerSession(authOptions)
      if(!session){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }
   const body=await request.json();
       const validation= PatchIssueSchema.safeParse(body);
    if(!validation.success)
      return NextResponse.json(validation.error.format(), {status:400});
  // Validate id
  // Log params for debugging and support fallback when params is missing
  try {
    console.log('PATCH /api/issues/[id] called. params:', params, 'request.url:', request.url);
  } catch (e) {
    /* ignore logging errors */
  }

  const idStr = params?.id ?? (() => {
    try {
      const segments = request.nextUrl.pathname.split('/').filter(Boolean);
      return segments[segments.length - 1];
    } catch (e) {
      return undefined;
    }
  })();

  const id = idStr ? parseInt(String(idStr)) : NaN;
  if (isNaN(id)) {
    console.error('Invalid id received in PATCH /api/issues/[id]:', { idStr, params, url: request.url });
    return NextResponse.json({ error: 'Invalid id', detail: { id: idStr } }, { status: 400 });
  }

  try {
    const assignedToUserId = body.assigneeId;
    if (assignedToUserId) {
      const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
      if (!user) {
        return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
      }
    }

    const issue = await prisma.issue.findUnique({ where: { id } });

    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: body.title,
        description: body.description,
        assignedToUserId

      },
    });

    return NextResponse.json(updatedIssue);
  } catch (err) {
    console.error('PATCH /api/issues/[id] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

}

export async function DELETE(
    request:NextRequest,
    {params}:{params:{id:string}}){
           const session =await getServerSession(authOptions)
      if(!session){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }
  // Log for debugging
  try {
    console.log('DELETE /api/issues/[id] called. params:', params, 'url:', request.url);
  } catch (e) {
    /* ignore */
  }

  // Determine id (support fallback when params missing)
  const idStr = params?.id ?? (() => {
    try {
      const segments = request.nextUrl.pathname.split('/').filter(Boolean);
      return segments[segments.length - 1];
    } catch (e) {
      return undefined;
    }
  })();

  const id = idStr ? parseInt(String(idStr)) : NaN;
  if (isNaN(id)) {
    console.error('Invalid id received in DELETE /api/issues/[id]:', { idStr, params, url: request.url });
    return NextResponse.json({ error: 'Invalid id', detail: { id: idStr } }, { status: 400 });
  }

  try {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    await prisma.issue.delete({ where: { id: issue.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/issues/[id] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

}