import {
  MessangerContext,
  MessangerContextProps,
} from "@/context/MessangerContext";
import { useContext } from "react";

const useWebrtc = () => {
  return useContext(MessangerContext) as MessangerContextProps;
};

export default useWebrtc;
