import { Button } from "@/components/ui/button";
import { CameraOff,Camera } from "lucide-react";
import { useState } from "react";

const CameraButton = () => {
    const [open,setOpen] = useState(false)

    const handleClick = () => {
        setOpen(prev=>!prev)
    }
  return (
    <Button variant="ghost" onClick={handleClick}>
      {open ? <CameraOff/> :<Camera />}
    </Button>
  );
};

export default CameraButton;
