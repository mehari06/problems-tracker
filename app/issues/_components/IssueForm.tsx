// 'use client';
// import { Button, TextArea, TextField} from '@radix-ui/themes'
// import React from 'react'

// const NewIssuePage = () => {
//   return (
//     <div className='max-w-xl space-y-4'>
//         <TextField.Root placeholder="Title of the issue">
// 	<TextField.Slot   >
// 	</TextField.Slot>
//  </TextField.Root>
//  <TextArea placeholder="Describe the issue in detail" />
//  <Button>Submit New Issue</Button>
//     </div>
//   )
// }

// export default NewIssuePage

'use client';
import dynamic from 'next/dynamic';

import { Button, Callout, Spinner, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
// import SimpleMDE  from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import { Text } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';
import { Issue } from '@prisma/client';

// interface IssueForm {
//   title: string;
//   description: string;
// }


type IssueFormData =z.infer<typeof issueSchema>;// inorder to use zod schema directly
  interface Props{
    issue?:Issue
  }
  const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { 
    ssr: false,
    loading: () => <p>Loading editor...</p>
  }
);
const   IssueForm= ({issue}:{ issue?:Issue}) => {
  const router =useRouter();
  const {register,control,handleSubmit,formState:{errors}} =useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const[error,setError]=useState("");
  const[isSubmitting,setSubmitting]=useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      if (issue && issue.id) {
        // Update existing issue
        const res = await axios.patch(`/api/issues/${issue.id}`, data);
        // Navigate to the issue detail page after update
        router.push(`/issues/${issue.id}`);
        router.refresh();
      } else {
        // Create new issue
        const res = await axios.post('/api/issues', data);
        router.push('/issues');
      }
    } catch (err) {
      setSubmitting(false);
      // Try to show a helpful message from the server if available
      // axios errors have response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyErr = err as any;
      console.error('IssueForm submit error', anyErr);
      if (anyErr?.response?.data) {
        // If server returned structured validation errors (zod), show a summary
        const serverData = anyErr.response.data;
        if (typeof serverData === 'string') setError(serverData);
        else if (serverData?.error) setError(serverData.error);
        else setError(JSON.stringify(serverData));
      } else if (anyErr?.message) {
        setError(anyErr.message);
      } else {
        setError('An unexpected Error Occurred');
      }
    }
  });

  return (
    <div  className='max-w-xl'  >
      {error && (
          <Callout.Root color="red"  className='mb-6' >
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
      )}
    <form 
    className='space-y-4' 
    onSubmit={onSubmit}>
        <TextField.Root placeholder="Title of the issue" defaultValue={issue?.title} {...register('title')}/>
     
          <ErrorMessage >{errors.title?.message}</ErrorMessage>
  
        <Controller 
        name="description" 
        defaultValue={issue?.description}
        control={control}
        render={({field})=>
          <SimpleMDE placeholder="Describe the issue in detail" {...field}/>}
        />
       
          <Text >{errors.description?.message}</Text>
    
        <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default  IssueForm