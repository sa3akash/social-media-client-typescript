import React from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  interface Props {
    title: string;
    title2: string;
    type: 'REGISTER';
    children: React.ReactNode
  }

const CommonCard:React.FC<Props> = ({title,title2,type,children}) => {
  return (
       <Card className="max-w-[500px] w-[95%]">
        <CardHeader className='text-center'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{title2}</CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          {children}
        </CardContent>
        <CardFooter className='justify-center'>
          {type === 'REGISTER' && <p>I’m already member? <span className='underline'>Login</span></p>}
        </CardFooter>
      </Card>
  )
}

export default CommonCard