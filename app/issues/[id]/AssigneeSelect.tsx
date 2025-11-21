// // 'use client';
// // import { Issue, User } from '@prisma/client';
// // import { Select } from '@radix-ui/themes'
// // import { useQuery } from '@tanstack/react-query';
// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react'
// // import Skeleton from 'react-loading-skeleton';

// // const AssigneeSelect = ({issue}:{issue:Issue}) => {
// //    const {data:users,error,isLoading}= useQuery<User[]>({

// //    queryKey: ['users'],
// //    queryFn:()=> axios.get('/api/users').then(res=>res.data),
// //    staleTime: 1000 * 60 , // 60 s
// //    retry: 3,

// //  });
// //  if(error) return;
// //  if(isLoading) return <Skeleton/>;
// //   // const[users,setUsers]=useState<User[]>([]);
// //   // //effect hook
// //   // useEffect(() => {
// //   //   const fetchUsers= async()=>{
// //   //     const {data}= await axios.get<User[]>('/api/users');
// //   //     setUsers(data);
// //   //   }
// //   //   fetchUsers();
// //   //   },[] )

// //   return (
// // //      <Select.Root onValueChange={(userId)=>{
// // //         defaultValue={issue.assignedToUserId || "unassigned"}
// // //       axios.patch('/api/issues/'+ issue.id,{assignedToUserId:userId||null

// // //       })

// // // }}

// // // >
// // <Select.Root
// //   value={issue.assignedToUserId || ""}
// //   onValueChange={(userId) => {
// //     axios.patch("/api/issues/" + issue.id, {
// //       assignedToUserId: userId === "unassigned" ? null : userId,
// //     });
// //   }}
// // >

// //         <Select.Trigger  placeholder="Assign.." />
// //         <Select.Content>
// //             <Select.Group>
// //                 <Select.Label>Suggestion</Select.Label>
// //                 <Select.Item value="">Unassigned</Select.Item>
// //                 {users?.map(user=>(<Select.Item key={user.id} value={user.id}>
// //                         {user.name}</Select.Item>
// //                 ))}
// //             </Select.Group>
// //         </Select.Content>
// //      </Select.Root>
// //   )
// // }

// // export default AssigneeSelect
// 'use client';
// import { Issue, User } from '@prisma/client';
// import { Select } from '@radix-ui/themes';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useState } from 'react';
// import Skeleton from 'react-loading-skeleton';

// const AssigneeSelect = ({ issue }: { issue: Issue }) => {
//   const {
//     data: users,
//     error,
//     isLoading,
//   } = useQuery<User[]>({
//     queryKey: ['users'],
//     queryFn: () => axios.get('/api/users').then((res) => res.data),
//     staleTime: 1000 * 60,
//     retry: 3,
//   });

//   // ✅ local state to reflect UI changes instantly
//   const [selectedUser, setSelectedUser] = useState(
//     issue.assignedToUserId || 'unassigned'
//   );

//   if (error) return;
//   if (isLoading) return <Skeleton />;

//   return (
//     <Select.Root
//       value={selectedUser}
//       onValueChange={async (userId) => {
//         setSelectedUser(userId); // ✅ update UI immediately
//         await axios.patch('/api/issues/' + issue.id, {
//           assignedToUserId: userId === 'unassigned' ? null : userId,
//         });
//       }}
//     >
//       <Select.Trigger placeholder="Assign.." />
//       <Select.Content>
//         <Select.Group>
//           <Select.Label>Suggestion</Select.Label>
//           <Select.Item value="unassigned">Unassigned</Select.Item>
//           {users?.map((user) => (
//             <Select.Item key={user.id} value={user.id}>
//               {user.name}
//             </Select.Item>
//           ))}
//         </Select.Group>
//       </Select.Content>
//     </Select.Root>
//   );
// };

// export default AssigneeSelect;
'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const router = useRouter();
    
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 1000 * 60, // 60 s
        retry: 3,
    });

    const handleAssign = async (userId: string) => {
        try {
            await axios.patch('/api/issues/' + issue.id, {
                assignedToUserId: userId === "" ? null : userId
            });
            toast.success('Assignee updated successfully');
            router.refresh(); // Refresh the page data
        } catch (error) {
            toast.error('Failed to update assignee');
            console.error('Assignment error:', error);
        }
    };

    if (error) {
        console.error('Error fetching users:', error);
        return <div>Error loading users</div>;
    }
    
    if (isLoading) return <Skeleton height="2rem" />;

    const currentAssignee = issue.assignedToUserId || "";

    return (
        <Select.Root 
            value={currentAssignee} 
            onValueChange={handleAssign}
        >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="">Unassigned</Select.Item>
                    {users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
}

export default AssigneeSelect;
