/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

interface Props {
  mutationKey?: string[];
  mutationFn: (data?: any) => Promise<AxiosResponse<any, any>>;
  onSuccess?: (data: AxiosResponse<any, any>) => void;
}

const useMutationCustom = ({ mutationFn, onSuccess,mutationKey }: Props) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationKey: mutationKey,
    mutationFn: mutationFn,
    onSuccess: onSuccess,
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast({
          variant: "destructive",
          title: err.response?.data.message || "Uh oh! Something went wrong.",
        });
      }
    },
  });

  return { ...mutation };
};

export default useMutationCustom;
