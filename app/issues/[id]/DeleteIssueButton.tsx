'use client';
'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation';
import { Issue } from '@prisma/client';

const DeleteIssueButton = ({issueid}:{issueid:number}) => {
    const router= useRouter();
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>Are you sure you want to Delete.This action can not be undone</AlertDialog.Description>
            <Flex mt="4" gap="3">
                <AlertDialog.Cancel>
                    <Button variant='soft' color="gray">Cancel</Button>
                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button
                                        color="red"
                                        onClick={async () => {
                                            try {
                                                // Ensure the URL includes a slash before the id
                                                await axios.delete(`/api/issues/${issueid}`);
                                                // Navigate back to the issues list (lowercase path)
                                                router.push('/issues');
                                            } catch (err) {
                                                // Log and navigate only on success; show console error for debugging
                                                // eslint-disable-next-line no-console
                                                console.error('Failed to delete issue', err);
                                            }
                                        }}
                                    >
                                        Delete issue
                                    </Button>

                                </AlertDialog.Action>
                           
            </Flex>
        </AlertDialog.Content>

        
    </AlertDialog.Root> 
  )
}

export default DeleteIssueButton