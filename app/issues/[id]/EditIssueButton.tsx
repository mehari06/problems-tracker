"use client";

import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

const EditIssueButton = ({issueId}:{issueId:number}) => {
  return (
    // Render Link as the interactive element styled like a button.
    // Avoid nesting an anchor inside a native button which can cause navigation issues.
    <Link
      href={`/issues/${issueId}/edit`}
      className="inline-flex items-center gap-2 rounded px-3 py-2 bg-slate-800 text-white hover:opacity-90"
    >
      <Pencil2Icon />
      <span>Edit Issue</span>
    </Link>
  )
}

export default EditIssueButton