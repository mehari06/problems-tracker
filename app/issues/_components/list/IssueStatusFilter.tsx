import React from 'react'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';


const  Statuses:{label:string;value?:Status}[]=[
    {label:"All " },
    {label:"Open",value:'OPEN'},
    {label:"In Progress",value:'CLOSED'}, 
] 
const IssueStatusFilter = () => {
  return (
     <Select.Root>
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>  
            {Statuses.map((status)=>(
                <Select.Item key={status.label} value={status.value || ""}>
                    {status.label}
                </Select.Item>
            ))}  
        </Select.Content>
          
    
          
     </Select.Root>
  )
}

export default IssueStatusFilter