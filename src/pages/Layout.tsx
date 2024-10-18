// import Navbar from "@/components/common/Navbar";
import SidebarLeft from "@/components/home/SidebarLeft";
import RightSide from "@/components/home/RightSide";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ModelProviders from "@/components/providers/ModelProviders";
import useEveryRender from "@/hooks/useEveryRender";
import NavbarSkeleton from "@/components/common/skeleton/NavbarSkeleton";

const Navbar = lazy(() => import("@/components/common/Navbar"));

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
    <main className="h-full w-full">
      <aside className="h-[70px] md:h-[80px] cardBG border-b">
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
      </aside>
      {/* main  */}
      <section className="flex flex-col md:flex-row md:gap-6 h-[calc(100%-70px)] md:h-[calc(100%-80px)] w-full justify-start md:justify-between">
        {/* left sidebar */}
        <section className="h-[70px] w-full md:w-[90px] lg:max-w-[260px] lg:w-full cardBG md:h-full border-b md:border-none">
          <SidebarLeft />
        </section>
        {/* main */}
        <Outlet />
        {/* right sidebar */}
        <aside className="hidden xl:block max-w-[310px] w-full cardBG h-full border-l">
          <RightSide />
        </aside>

        <ModelProviders />
      </section>
    </main>
  );
};

export default Layout;
