import { Button } from "@/components/ui/button";
import { ScreenShare } from "lucide-react";

const Screen = () => {
  const handleClick = () => {};
  return (
    <Button variant="ghost" onClick={handleClick}>
      <ScreenShare />
    </Button>
  );
};

export default Screen;
