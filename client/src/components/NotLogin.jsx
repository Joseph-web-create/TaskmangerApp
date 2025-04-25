import { Link } from "react-router";

export default function NotLogin() {
  return (
    <div className="flex gap-3">
      <Link
        to="/login"
        className="w-[100px] btn bg-[#974FD0] text-white hover:bg-[#594669] rounded-sm"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="w-[100px] btn text-black font-bold rounded-sm"
      >
        Sign Up
      </Link>
    </div>
  );
}
