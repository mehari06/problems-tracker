// import React from 'react'
// import IssueForm from '../../_components/IssueForm'
// import prisma from '@/prisma/client';
// import { notFound } from 'next/navigation';
//    interface Props{
//       params:{id:string}
//    }
// const EditIssuePage = async ({params}:Props) => {
//       if (!params.id || isNaN(parseInt(params.id))) {
//     notFound();
//   }
//   const issue=  await prisma.issue.findUnique({
//       where:{id:parseInt(params.id)}

//     });
//     if(!issue) notFound();
//   return (
//     <IssueForm issue={issue} />
//   )
// }

// export default EditIssuePage
import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../loading';

const IssueForm = dynamic(
  () => import('../../_components/IssueForm'),
  { 
    loading: () => <IssueFormSkeleton />
  }
)

interface Props {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
  // params can be a Promise in the App Router. Await it before using.
  const awaitedParams = await params;

  // Validate the ID
  if (!awaitedParams?.id || isNaN(parseInt(awaitedParams.id))) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(awaitedParams.id) }
  });

  if (!issue) notFound();

  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage