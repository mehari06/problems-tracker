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
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
//import React from 'react'
 import EditissueButton from './editissuebutton';
import IssueDetails from './IsuueDetails';
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
        <Grid columns={{initial:"1", md:"2"}} gap="5">
            <Box>
              <IssueDetails  issue={issue} />
            </Box>
            <Box>
              <EditissueButton issueId={issue.id} />
            </Box>
            
        </Grid>
    )
}

export default IssueDetailPage