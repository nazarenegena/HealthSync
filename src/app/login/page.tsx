import LoginForm from "@/components/authSection/LoginForm";
import Image from "next/image";

import LoginImage from "@/assets/login.svg";

export default function SignupPage() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary/30 flex justify-center">
        <Image src={LoginImage} alt="login-image" width={400} height={400} />
      </div>
      <LoginForm />
    </div>
  );
}
