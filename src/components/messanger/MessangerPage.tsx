import MessangerBody from "@/components/messanger/MessangerBody"
import MessangerSidebar from "@/components/messanger/MessangerSidebar"

const MessangerPage = () => {
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