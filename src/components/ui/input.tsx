// import * as React from "react";
// import { FieldError, UseFormRegisterReturn } from "react-hook-form";

// import { cn } from "@/lib/utils";

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   register?: UseFormRegisterReturn;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, register, ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         {...register}
//         className={cn(
//           "flex h-10 w-full border-b border-b-muted/70 bg-transparent transition duration-300 ease px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Input.displayName = "Input";

// export { Input };

import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn; // For React Hook Form integration
  value?: string | number; // To handle default value or value change
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Optional onChange handler
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, register, value, onChange, ...props }, ref) => {
    return (
      <input
        type={type}
        value={value} // Bind the input value to the form state
        onChange={onChange} // Handle input change
        ref={ref}
        {...register} // Register with React Hook Form
        className={`flex h-10 w-full border-b border-b-muted/70 bg-transparent transition duration-300 ease px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
