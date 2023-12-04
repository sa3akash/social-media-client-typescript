import React from "react";
import { AlertCircle, MailCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  type: "email" | 'error' | 'success';
  message?: string;
}

const CommonAlert: React.FC<Props> = ({ type, message }) => {
  return (
    <>
      {type === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Uh no! Something went wrong!</AlertTitle>
          <AlertDescription>{message || 'Try again letter.'}</AlertDescription>
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
        <Alert variant="default">
          <MailCheck className="h-4 w-4" />
          <AlertTitle>Email send successfull!</AlertTitle>
          <AlertDescription>{message || 'Please check your inbox to confirm your Account.'}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default CommonAlert;
