import { NetworkContext } from "@/context/networkContext";
import { useContext } from "react";

const useNetwork = () => {
  return useContext(NetworkContext) as boolean;
};

export default useNetwork;
