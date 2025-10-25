import React from 'react'
import NextLink from 'next/link'
import {Link as RadixLink} from '@radix-ui/themes';
interface Props{
 href:string;
 children:string; 
}

const link = ({ href, children }: Props) => {
  return (
    <NextLink href={href}>
      <RadixLink asChild>
        <span>{children}</span>
      </RadixLink>
    </NextLink>
  )
}
export default link