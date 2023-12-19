import NotificatonPage from "@/components/notificaton/NotificatonPage";
import { ScrollArea } from "@/components/ui/scroll-area";

const Notification = () => {
  return (
    <div className="max-w-[1200px] h-full w-full">
      <ScrollArea className="h-[95%] w-full">
        <div className="h-[calc(100%-224px)] w-full md:w-[95%] xl:w-full md:mx-auto mt-2 md:mt-6 mb-12">
          <NotificatonPage />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Notification;
