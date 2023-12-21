import React from 'react'
import TestDware from './WithScrollBackground';
import Dowor2 from './WithOutScrolllBackgroun';
import SnapPoint from './SnapPoint';
import Scrollablewithinputs from './Scrollablewithinputs';
import Nesteddrawers from './Nesteddrawers';
import NonDismiable from './NonDismiable';

const Test = () => {
  return (
    <div className='flex flex-col gap-8'>
        <NonDismiable/>
        <Nesteddrawers/>
        <Scrollablewithinputs/>
        <SnapPoint/>
        <Dowor2/>
        <TestDware/>
    </div>
  )
}

export default Test