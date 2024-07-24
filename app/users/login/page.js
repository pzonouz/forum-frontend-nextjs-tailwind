import Login from "@/app/components/Login";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};
export default LoginPage;
