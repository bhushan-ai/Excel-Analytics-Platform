import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth/authSlice";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function Signup() {
  const [formData, setFormData] = useState(initialState);
  // console.log("formdata", formData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    // console.log("formdata", formData);

    dispatch(registerUser(formData))
     .unwrap()
      .then((response) => {
        // console.log("data", response.payload.data);
        if (response?.payload?.data?.success) {
          toast.success(response?.payload?.data?.msg);
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        console.log("erroe", err);
        toast.success(response?.payload?.data?.msg);
      });
  }

  return (
    <div className="flex items-center justify-center mt-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="text-center ">
            <CardTitle className="font-bold text-2xl">
              Create an Account
            </CardTitle>
          </div>{" "}
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-lg font-semibold">
                  Username
                </Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="john doe"
                  onChange={(event) => {
                    setFormData({ ...formData, username: event.target.value });
                  }}
                  required
                />
              </div>
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
                  onChange={(event) => {
                    setFormData({ ...formData, password: event.target.value });
                  }}
                  type="password"
                  required
                />
              </div>
            </div>
            <a
              href="#"
              className="ml-auto inline-block text-sm  hover:underline"
            >
              Forgot your password?
            </a>
            <Button className="w-full mt-4">Signup</Button>{" "}
          </form>
        </CardContent>
        <CardFooter className="flex-col items-baseline gap-1">
          <h4 className="ml-1 text-lg ">
            Have account?{" "}
            <span className="text-md text-blue-700 underline-offset-3 underline">
              <Link to="/auth/login">Login</Link>
            </span>
          </h4>
        </CardFooter>{" "}
      </Card>
    </div>
  );
}

export default Signup;
