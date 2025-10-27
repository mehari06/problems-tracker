import { Button } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({issueid}:{issueid:number}) => {
  return (
    <Button color="red">Delete Issue</Button>
  )
}

export default DeleteIssueButton