import type { ReactNode } from "react";

interface AuthPropsSchema {
  children: ReactNode;
  title: string;
}

const AuthLayouts = (props: AuthPropsSchema) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen mx-4">
      <div className="bg-white w-full max-w-md px-6 py-8">
        <h1 className="font-semibold text-2xl text-center">{props.title}</h1>
        <p className="text-gray-500 text-sm text-center mb-4">
          Yuk, lanjutin belajarmu di videobelajar.
        </p>
        {props.children}
      </div>
    </div>
  );
};
export default AuthLayouts;
