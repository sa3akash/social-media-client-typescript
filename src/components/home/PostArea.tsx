import { ScrollArea } from "@/components/ui/scroll-area";
import AddPost from "@/components/post/AddPost";
import AllPost from "@/components/post/AllPost";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect, useRef } from "react";
import { setNavbar } from "@/store/reducers/AuthReducer";

const PostArea = () => {
  const dispatch: AppDispatch = useDispatch();

  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarPosition = navbarRef.current.getBoundingClientRect().top;
        console.log(navbarPosition);
        if (navbarPosition > 80) {
          dispatch(setNavbar(false));
        }
      } else {
        dispatch(setNavbar(true));
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener on component unmount return () => {
    window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  return (
    <section className="w-full h-full md:w-[95%] mx-auto">
      <ScrollArea className="h-full w-full" ref={navbarRef}>
        <AddPost />
        {/* <AddStory /> */}
        <AllPost />
      </ScrollArea>
    </section>
  );
};

export default PostArea;
