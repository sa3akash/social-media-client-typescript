import { NetworkContext, NetworkDoc } from "@/context/NetworkContext";
import { useContext } from "react";

const useNetwork = () => {
  return useContext(NetworkContext) as NetworkDoc;
};

export default useNetwork;
