// import { IssueStatusBadge } from '@/app/components'
// import { Issue } from '@prisma/client'
// import { Heading, Flex,Text, Card } from '@radix-ui/themes'
// import React from 'react'
// import ReactMarkdown from 'react-markdown'

// const IsuueDetails = ({issue}:{issue:Issue}) => {
//   return (
//     <>
//       <Heading>{issue.title}</Heading><Flex className='space-x-3' my="2">
//           <IssueStatusBadge status={issue.status} />
//           <Text>{issue.createdAt.toDateString()}</Text>
//       </Flex><Card className="prose" mt="4">
//               <ReactMarkdown>{issue.description}</ReactMarkdown>
//           </Card>
//     </>
     
//   )
// }

// export default IsuueDetails
import { Issue, User } from '@prisma/client';
import { IssueStatusBadge } from '@/app/components'

import { Heading, Flex,Text, Card } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface IssueWithUser extends Issue {
    assignedToUser?: User | null;
}

const IssueDetails = ({ issue }: { issue: IssueWithUser }) => {
    return (
        <div>
            <h1>{issue.title}</h1>
            <p>{issue.description}</p>
            {issue.assignedToUser && (
                <div>
                    <strong>Assigned to:</strong> {issue.assignedToUser.name}
                    {issue.assignedToUser.image && (
                        <img 
                            src={issue.assignedToUser.image} 
                            alt={issue.assignedToUser.name || 'User'} 
                            className="w-8 h-8 rounded-full"
                        />
                    )}
                </div>
            )}
        </div>
    );
}
export default IssueDetails
