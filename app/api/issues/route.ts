import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
// import issueSchema from "../issueSchema"
import { issueSchema } from './../../validationSchema';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
export async function  POST(request:Request){
     const session =await getServerSession(authOptions)
      if(!session){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }
    const body=await request.json();
    const validation= issueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status:400});
 const newIssue=await  prisma.issue.create({
    data:{title:body.title,description:body.description}

});
return NextResponse.json(newIssue,{status:201});
}
export async function GET(request: Request) {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') ?? undefined;

    const where = status && status !== 'all' ? { status } : undefined;

    const issues = await prisma.issue.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(issues);
}