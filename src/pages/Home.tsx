import PostArea from "@/components/home/PostArea";
import CardArea from "@/components/home/CardArea";

const Home = () => {
  return (
    <div className="max-w-[1000px] h-full w-[100%] flex gap-8">
      <PostArea />
      <CardArea />
    </div>
  );
};

export default Home;
