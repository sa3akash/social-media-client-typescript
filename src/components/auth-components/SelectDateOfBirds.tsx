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
  inputs: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    year: number;
    month: number;
    day: number;
    gender: string;
  };
}

const SelectDateOfBirds: React.FC<Props> = ({ handleInputChange, inputs }) => {
  /// get year month day array acording realtime
  const yearArray = Array.from(
    new Array(108),
    (_value, index) => new Date().getFullYear() - index
  );
  const monthArray = Array.from(new Array(12), (_value, index) => 1 + index);
  const numOfDays = () => {
    return new Date(inputs.year, inputs.month, 0).getDate();
  };
  const daysArray = Array.from(
    new Array(numOfDays()),
    (_value, index) => 1 + index
  );

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="dateOf" className="text-left">
        Date of birth
      </Label>

      <div className="flex items-center gap-2 max-sm:flex-col" id="dateOf">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Days" />
          </SelectTrigger>
          <SelectContent onChange={handleInputChange}>
            {daysArray.map((day, i) => (
              <SelectItem value={`${day}`} key={i}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Months" />
          </SelectTrigger>
          <SelectContent>
            {monthArray.map((month, i) => (
              <SelectItem value={`${month}`} key={i}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Years" />
          </SelectTrigger>
          <SelectContent>
            {yearArray.map((year, i) => (
              <SelectItem value={`${year}`} key={i}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectDateOfBirds;
