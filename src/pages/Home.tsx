import PostArea from "@/components/home/PostArea";
import CardArea from "@/components/home/CardArea";

const Home = () => {
  return (
    <div className="max-w-[1200px] h-[calc(100%-140px)] md:h-full w-full flex gap-8">
      <PostArea />
      <CardArea />
    </div>
  );
};

export default Home;
