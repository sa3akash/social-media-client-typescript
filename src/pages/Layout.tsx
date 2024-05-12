import Navbar from "@/components/common/Navbar";
import SidebarLeft from "@/components/home/SidebarLeft";
import RightSide from "@/components/home/RightSide";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ModelProviders from "@/components/providers/ModelProviders";
import useEveryRender from "@/hooks/useEveryRender";

const Layout = () => {
  const pathname = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (!pathname) {
      navigate("/feed");
    }
  }, [navigate, pathname]);

  useEveryRender();

  return (
    <div className="h-full w-full">
      <div className="h-[70px] md:h-[80px] cardBG border-b">
        <Navbar />
      </div>
      {/* main  */}
      <div className="flex flex-col md:flex-row md:gap-6 h-[calc(100%-70px)] md:h-[calc(100%-80px)] w-full justify-start md:justify-between">
        {/* left sidebar */}
        <div className="h-[70px] w-full md:w-[90px] lg:max-w-[260px] lg:w-full cardBG md:h-full border-b md:border-none">
          <SidebarLeft />
        </div>
        {/* main */}
        <Outlet />
        {/* right sidebar */}
        <div className="hidden xl:block max-w-[310px] w-full cardBG h-full border-l">
          <RightSide />
        </div>

        <ModelProviders />
      </div>
    </div>
  );
};

export default Layout;
