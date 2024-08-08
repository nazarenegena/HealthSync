import SignupForm from "@/components/authSection/SignUpForm";
import Image from "next/image";

import SignUpImage from "@/assets/sign-up-form.svg";

export default function SignupPage() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary/30 flex justify-center">
        <Image src={SignUpImage} alt="signup-image" width={600} height={500} />
      </div>
      <SignupForm />
    </div>
  );
}
