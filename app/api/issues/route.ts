import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {z} from 'zod';
 const createIssueSchema=z.object({
    title:z.string().min(3,'Title is Required').max(100),
    description:z.string().min(10,'Description is Required').max(1000)
    
 })
export async function  POST(request:Request){

    const body=await request.json();
    const validation= createIssueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status:400});
 const newIssue=await  prisma.issue.create({
    data:{title:body.title,description:body.description}

});
return NextResponse.json(newIssue,{status:201});
}