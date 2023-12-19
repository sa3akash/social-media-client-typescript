import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    img: string;
}

const FilterButton:React.FC<Props> = ({img,className}) => {
  return (
    <Button className={cn('text-primary',className)}>
        <img src={img} alt="" />
    </Button>
  )
}

export default FilterButton