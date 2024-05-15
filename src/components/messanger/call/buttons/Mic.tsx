import { Button } from "@/components/ui/button";
import { MicOff, Mic } from "lucide-react";
import { useState } from "react";

const MicButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Button variant="ghost" onClick={handleClick}>
      {open ? <MicOff /> : <Mic />}
    </Button>
  );
};

export default MicButton;
