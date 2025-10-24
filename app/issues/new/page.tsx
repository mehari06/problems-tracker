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

import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router =useRouter();
  const {register,control,handleSubmit} =useForm<IssueForm>();

  return (
    <form 
    className='max-w-xl space-y-4' 
    onSubmit={handleSubmit(async(data)=>{
      await axios.post('/api/issues',data)
      router.push('/issues');
    })}>
        <TextField.Root placeholder="Title of the issue" {...register('title')}/>
        <Controller 
        name="description" 
        control={control}
        render={({field})=>
          <SimpleMDE placeholder="Describe the issue in detail" {...field}/>}
        />
    
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage