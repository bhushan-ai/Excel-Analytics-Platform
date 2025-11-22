import { Home } from "lucide-react";
import React, { use } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/auth/authSlice";
import { toast } from "react-toastify";

function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser()).then(() => {
      toast.success("Logged Out Successfully");
    });
  }

  return (
    <header className="sticky flex items-center justify-between bg-background px-3 py-2 w-full border-2 shadow-2xl gap-1 ">
      <h2 className="text-2xl  font-extrabold bg-gradient-to-r from-green-300 to-green-700 text-transparent bg-clip-text">
        Exenalytics
      </h2>
      <div>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="w-9 h-9 rounded-full bg-black text-white font-bold flex items-center justify-center">
                {user.username[0].toUpperCase()}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/acc/setting">Setting</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <button onClick={logout}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
