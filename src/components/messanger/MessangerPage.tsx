import MessangerBody from "@/components/messanger/MessangerBody"
import MessangerSidebar from "@/components/messanger/MessangerSidebar"
import { api } from "@/services/http/api"
import { useEffect } from "react"

const MessangerPage = () => {

  useEffect(()=>{
    api.getConversationCall().then((data)=>{
  console.log(data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <div className="w-full h-full flex">
        <div className="w-[350px] h-full border-r">
           <MessangerSidebar />
        </div>
        <div className="flex-1 h-full">
            <MessangerBody/>
        </div>
    </div>
  )
}

export default MessangerPage