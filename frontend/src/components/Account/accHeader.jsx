import { useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser()).then(() => {
      toast.success("Logged Out Successfully");
    });
  }
  const navigate = useNavigate();

  return (
    <header className="sticky flex items-center justify-between bg-background px-3 py-2 w-full border-2 shadow-2xl gap-1 ">
      <h2 className="text-2xl  font-extrabold bg-gradient-to-r from-green-300 to-green-700 text-transparent bg-clip-text cursor-pointer">
        <button onClick={() => navigate("/")}> Exenalytics</button>
      </h2>
      <div className="flex items-center justify-center gap-2  bg-black text-white px-2 py-3 rounded-md cursor-pointer">
        <LogOut />
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
