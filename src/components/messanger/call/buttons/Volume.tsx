import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

const VolumeButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Button variant="ghost" onClick={handleClick}>
      {open ? <VolumeX /> : <Volume2 />}
    </Button>
  );
};

export default VolumeButton;
