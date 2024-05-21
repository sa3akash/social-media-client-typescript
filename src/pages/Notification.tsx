import NotificatonPage from "@/components/notificaton/NotificatonPage";
import { ScrollArea } from "@/components/ui/scroll-area";

const Notification = () => {
  return (
    <section className="max-w-[1200px] h-[calc(100%-70px)] md:h-full w-full">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full md:w-[95%] xl:w-full md:mx-auto mt-2 md:mt-6">
          <NotificatonPage />
        </div>
      </ScrollArea>
    </section>
  );
};

export default Notification;
