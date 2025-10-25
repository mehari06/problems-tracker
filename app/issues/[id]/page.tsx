// import prisma from '@/prisma/client';
// import { notFound } from 'next/navigation';
// import React from 'react'

// interface Props{
//     params:{
//         id:string
//     }
// }

// const IssueDetailPage = async({params}:Props) => {
//     // Add proper validation that params exists
//     if (!params || !params.id) {
//         notFound();
//     }
    
//     const issueId = parseInt(params.id);
//     if (isNaN(issueId)) {
//         notFound();
//     }
    
//     const issue = await prisma.issue.findUnique({
//         where: { id: issueId }
//     });
    
//     if(!issue){
//         notFound();
//     }
    
//     return (
//         <div>
//             <p>{issue.title}</p>
//             <p>{issue.description}</p>
//             <p>{issue.status}</p>
//             <p>{issue.createdAt.toDateString()}</p>
//         </div>
//     )
// }

// export default IssueDetailPage
// import prisma from '@/prisma/client';
// import { notFound } from 'next/navigation';
// import React from 'react'

// interface Props {
//     params: {
//         id: string
//     }
// }

// const IssueDetailPage = async({ params }: Props) => {
//     // Add this to see what's happening
//     console.log('PARAMS:', params);
    
//     if (!params?.id) {
//         console.log('NO ID IN PARAMS');
//         notFound();
//     }
    
//     const issueId = parseInt(params.id);
//     console.log('PARSED ID:', issueId);
    
//     if (isNaN(issueId)) {
//         console.log('INVALID ID');
//         notFound();
//     }
    
//     const issue = await prisma.issue.findUnique({
//         where: { id: issueId }
//     });
    
//     console.log('FOUND ISSUE:', issue);
    
//     if(!issue) {
//         notFound();
//     }
    
//     return (
//         <div>
//             <p>{issue.title}</p>
//             <p>{issue.description}</p>
//             <p>{issue.status}</p>
//             <p>{issue.createdAt.toDateString()}</p>
//         </div>
//     )
// }

// export default IssueDetailPage
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading,Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
//import React from 'react'
 import ReactMarkdown from 'react-markdown';
//import delay from 'delay';

interface Props{
    params:{
        id:string
    }
}

const IssueDetailPage = async({params}:Props) => {
    // AWAIT THE PARAMS - Add this line
    
    const awaitedParams = await params;
    
    if (!awaitedParams?.id) {
        notFound();
    }
  
    
    const issueId = parseInt(awaitedParams.id);
    
    if (isNaN(issueId)) {
        notFound();
    }
    
    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });
    
    if(!issue) notFound();

      // await  delay(2000);
    
    
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my="2">
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose" mt="4">
            <ReactMarkdown >{issue.description}</ReactMarkdown>
            </Card>
            
        </div>
    )
}

export default IssueDetailPage