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
                        <Button color='red'onClick={async()=> 
                            {await axios.delete('/api/issues'+ issueid); 
                                  router.push('/Issues');
                                  router.refresh();

                            }}>Delete issue</Button>
                          

                 </AlertDialog.Action>
                           
            </Flex>
        </AlertDialog.Content>

        
    </AlertDialog.Root> 
  )
}

export default DeleteIssueButton