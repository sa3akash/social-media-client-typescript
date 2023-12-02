import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
    label: string;
    type: string;
    placeholder: string;
}

const CommonInput:React.FC<Props> = ({label,type,placeholder}) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={label} className='text-left'>{label}</Label>
      <Input type={type} id={label} placeholder={placeholder} />
    </div>
  )
}

export default CommonInput