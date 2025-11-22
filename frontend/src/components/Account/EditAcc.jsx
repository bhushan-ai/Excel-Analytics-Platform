import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/auth/authSlice";

const initialData = {
  username: "",
  email: "",
};

function EditAcc({ user, openEditDialog, setOpenEditDialog }) {
  const [formData, setFormData] = useState(initialData);
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    
    // console.log("formdata", formData);
    dispatch(updateUser(formData)).then((data) => {
      console.log("editeddata", data);
      Navigate('/')
      if (data.payload.success) {
        toast.success(data.payload.msg);
      } else {
        toast.error(data.payload.msg);
      }
    });
    
  }
  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Username</Label>
              <Input
                id="username"
                name="username"
                onChange={(event) => {
                  setFormData({ ...formData, username: event.target.value });
                }}
                defaultValue={user.username}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="mail"
                defaultValue={user.email}
                onChange={(event) => {
                  setFormData({ ...formData, email: event.target.value });
                }}
              />
            </div>
          </div>
          <DialogFooter className="mt-3 gap-40">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => setOpenEditDialog(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditAcc;
