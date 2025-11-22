import EditAcc from "@/components/Account/EditAcc";
import { LogOut, UserRoundPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserAccount() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  


  const [openEditDialog, setOpenEditDialog] = useState(false);



  console.log("user", user);

  return (
    <div className="relative bg-gray-100 rounded-lg m-4 p-6 shadow-xl mt-10 flex flex-col md:flex-row items-center gap-6">
      {/* Pen icon in top-right */}
      <div
        onClick={() => setOpenEditDialog(true)}
        className="absolute top-4 right-4 cursor-pointer mr-5 text-gray-600 hover:text-gray-800"
      >
        <UserRoundPen />
      </div>
      <div className="hidden">
        <EditAcc
          user={user}
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
        />
      </div>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt="Profile"
        className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-4 border-white shadow-md"
      />

      <div className="flex-1 text-center md:text-left">
        <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
          My Account
        </h2>
        <p className="text-gray-600 mt-3 font-semibold text-lg md:text-xl">
          username: {user?.username}
        </p>
        <p className="text-gray-600 mt-2 font-semibold text-lg md:text-xl">
          email: {user?.email}
        </p>
      </div>
    </div>
  );
}

export default UserAccount;
