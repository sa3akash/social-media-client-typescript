import PostArea from "@/components/home/PostArea";
import CardArea from "@/components/home/CardArea";
import useAuth from "@/hooks/useAuth";

const Home = () => {

  const {user} = useAuth();
  console.log(user);

  return (
    <div className="max-w-[1000px] h-full w-[100%] flex gap-8">
      <PostArea />
      <CardArea />
    </div>
  );
};

export default Home;
