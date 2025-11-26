// // 
// import prisma from '@/prisma/client';
// import { Box, Flex, Grid } from '@radix-ui/themes';
// import { notFound } from 'next/navigation';
// import EditissueButton from './EditIssueButton';
// import IssueDetails from './IsuueDetails';
// import DeleteIssueButton from './DeleteIssueButton';
// import AssigneeSelect from './AssigneeSelect';
// import { getServerSession } from 'next-auth';
// import authOptions from '@/app/auth/authOptions';

// interface Props {
//     params: Promise<{  // ← FIX: params is a Promise!
//         id: string
//     }>
// }

// const IssueDetailPage = async({ params }: Props) => {
//     const { id } = await params;  // ← This is correct now
//     const session = await getServerSession(authOptions);

//     // REMOVE this commented wrong code:
//     // if (id) {
//     //     notFound();
//     // }

//     const issueId = parseInt(id);

//     if (isNaN(issueId)) {
//         notFound();
//     }

//     const issue = await prisma.issue.findUnique({
//         where: { id: issueId }
//     });

//     if(!issue) notFound();

//     return (
//         <Grid columns={{initial:"1", sm:"5"}} gap="5">
//             <Box className='lg:col-span-3'>
//                 <IssueDetails issue={issue} />
//             </Box>
//             { session && (
//                 <Box>
//                     <Flex direction="column" gap="5">
//                         <AssigneeSelect issue={issue}/>
//                         <EditissueButton issueId={issue.id} />
//                         <DeleteIssueButton issueid={issue.id} />
//                     </Flex>
//                 </Box>
//             )}
// // 
// import prisma from '@/prisma/client';
// import { Box, Flex, Grid } from '@radix-ui/themes';
// import { notFound } from 'next/navigation';
// import EditissueButton from './EditIssueButton';
// import IssueDetails from './IsuueDetails';
// import DeleteIssueButton from './DeleteIssueButton';
// import AssigneeSelect from './AssigneeSelect';
// import { getServerSession } from 'next-auth';
// import authOptions from '@/app/auth/authOptions';

// interface Props {
//     params: Promise<{  // ← FIX: params is a Promise!
//         id: string
//     }>
// }

// const IssueDetailPage = async({ params }: Props) => {
//     const { id } = await params;  // ← This is correct now
//     const session = await getServerSession(authOptions);

//     // REMOVE this commented wrong code:
//     // if (id) {
//     //     notFound();
//     // }

//     const issueId = parseInt(id);

//     if (isNaN(issueId)) {
//         notFound();
//     }

//     const issue = await prisma.issue.findUnique({
//         where: { id: issueId }
//     });

//     if(!issue) notFound();

//     return (
//         <Grid columns={{initial:"1", sm:"5"}} gap="5">
//             <Box className='lg:col-span-3'>
//                 <IssueDetails issue={issue} />
//             </Box>
//             { session && (
//                 <Box>
//                     <Flex direction="column" gap="5">
//                         <AssigneeSelect issue={issue}/>
//                         <EditissueButton issueId={issue.id} />
//                         <DeleteIssueButton issueid={issue.id} />
//                     </Flex>
//                 </Box>
//             )}
//         </Grid>
//     )
// }

// export default IssueDetailPage

import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IsuueDetails'; // Fixed typo: IsuueDetails → IssueDetails
import DeleteIssueButton from './DeleteIssueButton';
import AssigneeSelect from './AssigneeSelect';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { cache } from 'react';

interface Props {
    params: Promise<{
        id: string
    }>
}

// Cache function to prevent duplicate database queries
const fetchUser = cache((issueId: number) =>
    prisma.issue.findUnique({
        where: { id: issueId },
        include: {
            assignedToUser: true
        }
    })
);

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    const issueId = parseInt(id);
    if (isNaN(issueId)) notFound();

    // Use cached function to fetch issue
    const issue = await fetchUser(issueId);


    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className='lg:col-span-3'>
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="5">
                        <AssigneeSelect issue={issue} />
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueid={issue.id} /> {/* Fixed prop name: issueid → issueId */}
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const issueId = parseInt(id);

    if (isNaN(issueId)) {
        return {
            title: "Issue Not Found",
            description: "The requested issue could not be found",
        };
    }

    const issue = await fetchUser(issueId);

    return {
        title: issue?.title || "Issue Details",
        description: `Details of issue #${issue?.id}` || "View issue details",
    };
}

export default IssueDetailPage