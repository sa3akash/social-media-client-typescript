import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

interface Props {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenderComponent: React.FC<Props> = ({ handleInputChange }) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="genderId" className="text-left">
        Gender
      </Label>

      <Select name="gender">
        <SelectTrigger>
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent id="genderId" onChange={handleInputChange}>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GenderComponent;
