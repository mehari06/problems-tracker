'use client';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = () => {
   const {data:users,error,isLoading}= useQuery<User[]>({

   queryKey: ['users'],
   queryFn:()=> axios.get('/xapi/users').then(res=>res.data),
   staleTime: 1000 * 60 , // 60 s
   retry: 3,

 });
 if(error) return;
 if(isLoading) return <Skeleton/>;
  // const[users,setUsers]=useState<User[]>([]);
  // //effect hook
  // useEffect(() => {
  //   const fetchUsers= async()=>{
  //     const {data}= await axios.get<User[]>('/api/users');
  //     setUsers(data);
  //   }
  //   fetchUsers();
  //   },[] )

  return (
     <Select.Root>
        <Select.Trigger  placeholder="Assign.." />
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestion</Select.Label>
                {users?.map(user=>(<Select.Item key={user.id} value={user.id}>
                        {user.name}</Select.Item>
                ))}
            </Select.Group>
        </Select.Content>
     </Select.Root>
  )
}

export default AssigneeSelect