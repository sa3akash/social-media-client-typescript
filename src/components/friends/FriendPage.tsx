import FriendHeader from "@/components/friends/FriendHeader"
import { userData } from "@/data/AddStoryData"
import SingleFriendItem from "./item/SingleFriendItem"
import { IUserDoc } from "@/interfaces/auth.interface"

const FriendPage = () => {
  return (
    <div className='w-full h-full flex flex-col gap-2 md:gap-4 mt-2 md:mt-8'>
        <FriendHeader />
        <div className='grid grid-cols-1 2xl:grid-cols-2 gap-2 md:gap-4'>
            {
              userData.map((item:IUserDoc,index:number)=>(
                <SingleFriendItem key={index} item={item} active={index === 0}/>
              ))
            }
            {
              userData.map((item:IUserDoc,index:number)=>(
                <SingleFriendItem key={index} item={item} active={index === 0}/>
              ))
            }
            {
              userData.map((item:IUserDoc,index:number)=>(
                <SingleFriendItem key={index} item={item} active={index === 0}/>
              ))
            }
            {
              userData.map((item:IUserDoc,index:number)=>(
                <SingleFriendItem key={index} item={item} active={index === 0}/>
              ))
            }
            {
              userData.map((item:IUserDoc,index:number)=>(
                <SingleFriendItem key={index} item={item} active={index === 0}/>
              ))
            }
            {
              userData.map((item:IUserDoc,index:number)=>(
                <SingleFriendItem key={index} item={item} active={index === 0}/>
              ))
            }
           
        </div>
    </div>
  )
}

export default FriendPage