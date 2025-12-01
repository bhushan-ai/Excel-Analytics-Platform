import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/store/auth/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      //  console.log("data", data);
      if (data.payload?.success) {
        toast.success(data.payload.msg);
        navigate("/upload/uploadfile");
      } else {
        toast.error(data.payload.response.msg);
      }
    });
  }

  return (
    <div className="flex items-center justify-center mt-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="text-center ">
            <CardTitle className="font-bold text-2xl">Login</CardTitle>
          </div>{" "}
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-lg font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(event) => {
                    setFormData({ ...formData, email: event.target.value });
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-lg font-semibold">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(event) => {
                    setFormData({ ...formData, password: event.target.value });
                  }}
                  required
                />
              </div>
            </div>
            <a
              href="#"
              className="ml-auto inline-block text-sm mt-2  hover:underline"
            >
              Forgot your password?
            </a>
            <Button className="w-full mt-4">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-baseline gap-1">
          {" "}
          <h4 className="ml-1 text-lg ">
            Dont't have account?{" "}
            <span className="text-md text-blue-700 underline-offset-3 underline">
              <Link to="/auth/signup">signup</Link>
            </span>
          </h4>
        </CardFooter>{" "}
      </Card>
    </div>
  );
}

export default Login;
