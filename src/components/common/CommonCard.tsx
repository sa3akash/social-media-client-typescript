import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageURL } from "@/utils/pageUrl";

interface Props {
  title: string;
  title2: string;
  type: "REGISTER" | "LOGIN" | "FORGOT";
  children: React.ReactNode;
}

const CommonCard: React.FC<Props> = ({ title, title2, type, children }) => {
  return (
    <Card className="max-w-[500px] w-[95%] cardBG">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{title2}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">{children}</CardContent>
      <CardFooter className="justify-center">
        {type === "REGISTER" && (
          <p className="flex items-center gap-1">
            Have an account?
            <Link
              to={PageURL.Login}
              className="underline cursor-pointer hover:text-green-400 text-green-500 transition-all"
            >
              Login
            </Link>
          </p>
        )}
        {type === "LOGIN" && (
          <p className="flex items-center gap-1">
            Don&apos;t have an account?
            <Link
              to={PageURL.Register}
              className="underline cursor-pointer hover:text-green-400 text-green-500 transition-all"
            >
              Register
            </Link>
          </p>
        )}
        {type === "FORGOT" && (
          <p className="flex items-center gap-1">
            Have an account?
            <Link
              to={PageURL.Login}
              className="underline cursor-pointer hover:text-green-400 text-green-500 transition-all"
            >
              Login
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default CommonCard;
