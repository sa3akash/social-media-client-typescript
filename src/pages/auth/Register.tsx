import CommonCard from "@/components/common/CommonCard";
import CommonInput from "@/components/common/CommonInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CommonCard
        title="Create Your Account"
        title2="Register Using Social Network"
        type="REGISTER"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CommonInput
              label="First Name"
              placeholder="Shakil Ahmed"
              type="text"
            />
            <CommonInput
              label="Last Name"
              placeholder="Shakil Ahmed"
              type="text"
            />
          </div>
          <CommonInput
            label="Email"
            placeholder="sa2avroo@gmail.com"
            type="email"
          />
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <CommonInput
              label="Email"
              placeholder="sa2avroo@gmail.com"
              type="email"
            />
            <CommonInput
              label="Email"
              placeholder="sa2avroo@gmail.com"
              type="email"
            />
            <CommonInput
              label="Email"
              placeholder="sa2avroo@gmail.com"
              type="email"
            />
          </div>
          <CommonInput
            label="Password"
            placeholder="Password 6 characters"
            type="password"
          />
          <Button>Login</Button>
        </div>
      </CommonCard>
    </div>
  );
};

export default Register;
