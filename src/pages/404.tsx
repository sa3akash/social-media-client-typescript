import NotFountIcon from "@/assets/images/404.svg";
import { PageURL } from "@/services/utils/pageUrl";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center p-4 text-center">
        <img src={NotFountIcon} alt="" className="w-[250px] md:w-full" />
        <p className="roboto text-[17px] tracking-[0.6px] leading-5 my-2">
          OOPPS! THE PAGE YOU WERE LOOKING FOR, COULDN'T BE FOUND.
        </p>
        <Link
          to={PageURL.Feed}
          className="bg-[#0F70EB] w-max py-2 px-4 mt-6 rounded-md text-white font-semibold"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
