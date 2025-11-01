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

import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
//import React from 'react'
 import EditissueButton from './EditIssueButton';
import IssueDetails from './IsuueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import AssigneeSelect from './AssigneeSelect';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
//import delay from 'delay';

interface Props{
    params:{
        id:string
    }
}

const IssueDetailPage = async({params}:Props) => {
   const session= await getServerSession(authOptions);
    // AWAIT THE PARAMS - Add this line
    
    // const awaitedParams = await params;
    
    // if (!awaitedParams?.id) {
    //     notFound();
    // }
    if (!params?.id) {
        notFound();
    }
  
    
    const issueId = parseInt(params.id);
    
    if (isNaN(issueId)) {
        notFound();
    }
    
    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });
    
    if(!issue) notFound();

      // await  delay(2000);
    
    
    return (
        <Grid columns={{initial:"1", sm:"5"}} gap="5">
         <Box className='lg:col-span-3'>
              <IssueDetails  issue={issue} />
            </Box>
            { session && (<Box>
                <Flex direction="column" gap="5">
              <AssigneeSelect/>
              <EditissueButton issueId={issue.id} />
              <DeleteIssueButton issueid={issue.id} />
                </Flex>
            </Box>
)}
        </Grid>
    )
}

export default IssueDetailPage