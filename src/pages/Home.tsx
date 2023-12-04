import Navbar from "@/components/common/Navbar";
import SidebarLeft from "@/components/home/SidebarLeft";
import RightSide from "@/components/home/RightSide";
import PostArea from "@/components/home/PostArea";
import CardArea from "@/components/home/CardArea";

const Home = () => {
  return (
    <div className="h-full">
      <div className="h-[70px] md:h-[80px] cardBG border-b">
        <Navbar />
      </div>
      {/* main  */}
      <div className="flex flex-col md:flex-row md:gap-6 h-full w-full justify-start md:justify-between">
        {/* left sidebar */}
        <div className="h-[70px] w-full md:w-[90px] lg:max-w-[260px] lg:w-full cardBG md:h-[calc(100%-80px)] border-b md:border-none">
          <SidebarLeft />
        </div>
        <div className="max-w-[1000px] h-full w-[100%] flex gap-8">
          <PostArea />
          <CardArea />
        </div>
        {/* right sidebar */}
        <div className="hidden xl:block max-w-[310px] w-full cardBG h-full border-l">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Home;
