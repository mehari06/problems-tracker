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
  params: Promise<{ id: string }>
}

const EditIssuePage = async ({ params }: Props) => {
  const awaitedParams = await params;

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