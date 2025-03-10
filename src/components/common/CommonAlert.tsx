import React from "react";
import { AlertCircle, MailCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  type: "email" | 'error' | 'success';
  message?: string;
}

const CommonAlert: React.FC<Props> = ({ type, message }) => {
  if(!message) return;
  
  return ( 
    <>
      {type === "error" && (
        <Alert variant="destructive" className="bg-rose-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message || 'Something went wrong! Try again letter.'}</AlertDescription>
        </Alert>
      )}
      {type === "email" && (
        <Alert variant="default">
          <MailCheck className="h-4 w-4" />
          <AlertTitle>Email send successfull!</AlertTitle>
          <AlertDescription>{message || 'Please check your inbox to confirm your Account.'}</AlertDescription>
        </Alert>
      )}
      {type === "success" && (
        <Alert variant="default" >
          <MailCheck className="h-4 w-4" />
          <AlertTitle>Email send successfull!</AlertTitle>
          <AlertDescription>{message || 'Please check your inbox to confirm your Account.'}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default CommonAlert;
