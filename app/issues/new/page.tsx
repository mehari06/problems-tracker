import React from 'react'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../loading'

const IssueForm = dynamic(
  () => import('../_components/IssueForm'),
  {
    loading: () => <IssueFormSkeleton />,
  }
)

const NewIssuePage = async () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Create New Issue</h1>
      {/* IssueForm handles create vs edit depending on presence of `issue` prop */}
      {/* @ts-ignore server component can render client component via dynamic import */}
      <IssueForm />
    </div>
  )
}

export default NewIssuePage
