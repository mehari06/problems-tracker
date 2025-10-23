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
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-4'>
        <TextField.Root placeholder="Title of the issue" />
        <TextArea placeholder="Describe the issue in detail" />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage