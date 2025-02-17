import PostArea from "@/components/home/PostArea";
import CardArea from "@/components/home/CardArea";
import usePostSocket from "@/hooks/socket/usePostSocket";

const Home = () => {
  
  usePostSocket();

  return (
    <section className="max-w-[1200px] h-[calc(100%-70px)] md:h-full w-full flex gap-8">
      <PostArea />
      <CardArea />
    </section>
  );
};

export default Home;
