import PostArea from "@/components/home/PostArea";
import CardArea from "@/components/home/CardArea";
import { useEffect } from "react";
import { api } from "@/services/http/api";

const Home = () => {
  useEffect(() => {
    api.getNotification();
  }, []);
  return (
    <div className="max-w-[1200px] h-[calc(100%-140px)] md:h-[calc(100%-80px)] w-full flex gap-8">
      <PostArea />
      <CardArea />
    </div>
  );
};

export default Home;
