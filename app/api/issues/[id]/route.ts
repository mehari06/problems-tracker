import { NextRequest, NextResponse } from "next/server"
import { PatchIssueSchema } from './../../../validationSchema';
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";


// export async function PATCH(
//     request:NextRequest,
//     {params}:{params:{id:string}}){
//     //        const session =await getServerSession(authOptions)
//     //   if(!session){
//     //     return NextResponse.json({message:"Unauthorized"},{status:401});
//     // }
//    const body=await request.json();
//        const validation= PatchIssueSchema.safeParse(body);
//     if(!validation.success)
//       return NextResponse.json(validation.error.format(), {status:400});
  // Validate id
  // Log params for debugging and support fallback when params is missing
  export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
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
    if (assignedToUserId !== undefined && assignedToUserId !== null) {
      const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
      if (!user) {
        return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
      }
    }

    const issue = await prisma.issue.findUnique({ where: { id } });

    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    // const updatedIssue = await prisma.issue.update({
    //   where: { id: issue.id },
    //   data: {
    //     title: body.title,
    //     description: body.description,
    //     assignedToUserId

    //   },
    // });
    // Build update object only with fields provided to avoid overwriting unspecified fields
    const updateData: any = {};
    if (Object.prototype.hasOwnProperty.call(body, 'title')) updateData.title = body.title;
    if (Object.prototype.hasOwnProperty.call(body, 'description')) updateData.description = body.description;
    if (Object.prototype.hasOwnProperty.call(body, 'assigneeId')) updateData.assignedToUserId = body.assigneeId;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields provided to update' }, { status: 400 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: updateData,
      include: { assignedToUser: true }
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

// GET single issue by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({ where: { id }, include: { assignedToUser: true } });
    if (!issue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    return NextResponse.json(issue);
  } catch (err) {
    console.error('GET /api/issues/[id] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}