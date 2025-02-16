import React from "react";
import { Link } from "react-router-dom";
import { PageURL } from "@/services/utils/pageUrl";
import Logo from '@/assets/logoWithText.svg';

interface Props {
  title: string;
  title2: string;
  type: "REGISTER" | "LOGIN" | "FORGOT";
  children: React.ReactNode;
}

const CommonCard: React.FC<Props> = ({ title, title2, type, children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
   
      <div className="w-full sm:w-[80%] md:-[50%] lg:w-[80%] 2xl:w-[70%] h-full sm:h-[700px] flex items-center cardBG sm:rounded-lg">
        <div className="hidden lg:flex flex-1 h-full bg-[#292932] items-center justify-center flex-col gap-2">
          <img
            src={Logo}
            alt="logo"
            width={250}
            className="pointer-events-none select-none"
          />
          <span className="text-[#92929D]">Synchronize Your Social Life</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center flex-col gap-2">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <span className="text-muted-foreground">{title2}</span>
          </div>
          <div className="p-8">
            {children}
            {type === "LOGIN" ? (
              <p className="flex items-center gap-1 mt-4">
                Don&apos;t have an account?
                <Link
                  to={PageURL.Register}
                  className="underline cursor-pointer hover:text-green-400 text-green-500 transition-all"
                >
                  Register
                </Link>
              </p>
            ) : (
              <p className="flex items-center gap-1 mt-4">
                Have an account?
                <Link
                  to={PageURL.Login}
                  className="underline cursor-pointer hover:text-green-400 text-green-500 transition-all"
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default CommonCard;

// w-full sm:w-[80%] md:-[50%] lg:w-[80%] 2xl:w-[70%] h-full sm:h-[700px] flex items-center cardBG sm:rounded-lg