'use client';
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
     <Select.Root>
        <Select.Trigger  placeholder="Assign.." />
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestion</Select.Label>
                <Select.Item value='3'>Mehari</Select.Item>
            </Select.Group>
        </Select.Content>
     </Select.Root>
  )
}

export default AssigneeSelect