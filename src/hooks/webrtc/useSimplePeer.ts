import {
  SimplePeerContext,
  SimplePeerContextProps,
} from "@/context/SimplePeer";
import { useContext } from "react";

const useSimplePeer = () => {
  return useContext(SimplePeerContext) as SimplePeerContextProps;
};

export default useSimplePeer;
