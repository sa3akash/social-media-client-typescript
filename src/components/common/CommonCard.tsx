import React from 'react';
import {Link} from 'react-router-dom';
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
    type: 'REGISTER' | 'LOGIN' | 'FORGOT';
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
          {type === 'REGISTER' && <p>Have an account? <Link to='/login' className='underline cursor-pointer hover:text-green-400 text-green-500 transition-all'>Login</Link></p>}
          {type === 'LOGIN' && <p>Don&apos;t have an account? <Link to='/register' className='underline cursor-pointer hover:text-green-400 text-green-500 transition-all'>Register</Link></p>}
          {type === 'FORGOT' && <p>Have an account? <Link to='/login' className='underline cursor-pointer hover:text-green-400 text-green-500 transition-all'>Login</Link></p>}
        </CardFooter>
      </Card>
  )
}

export default CommonCard