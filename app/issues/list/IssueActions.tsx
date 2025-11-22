// 'use client';
// import { Button, Flex } from '@radix-ui/themes'
// import React from 'react'
// import Link from 'next/link'
// import IssueStatusFilter from './_components/list/IssueStatusFilter'
// const IssueActions = () => {
//   return (
//        <Flex  mb="5" justify="between" align="center" >
//         <IssueStatusFilter />
//           <Button>
//             <Link href='/issues/new'>New Issue</Link>
//           </Button>
//         </Flex> 
//   )
// }

// export default IssueActions
'use client';
import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between" align="center">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;