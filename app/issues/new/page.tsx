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

import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import { Text } from '@radix-ui/themes';

// interface IssueForm {
//   title: string;
//   description: string;
// }


type IssueForm =z.infer<typeof createIssueSchema>;// inorder to use zod schema directly

const NewIssuePage = () => {
  const router =useRouter();
  const {register,control,handleSubmit,formState:{errors}} =useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const[error,setError]=useState("");

  return (
    <div  className='max-w-xl'  >
      {error && (
          <Callout.Root color="red"  className='mb-6' >
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
      )}
    <form 
    className='space-y-4' 
    onSubmit={handleSubmit(async(data)=>{
      try {
        await axios.post('/api/issues',data)
        router.push('/issues');
      } catch (error) {
         setError("An unexpected Error Occurred");
      }
    })}>
        <TextField.Root placeholder="Title of the issue" {...register('title')}/>
        {errors.title && (
          <Text color='red'>{errors.title.message}</Text>
        )}
        <Controller 
        name="description" 
        control={control}
        render={({field})=>
          <SimpleMDE placeholder="Describe the issue in detail" {...field}/>}
        />
        {errors.description && (
          <Text color='red'>{errors.description.message}</Text>
        )}
        <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage