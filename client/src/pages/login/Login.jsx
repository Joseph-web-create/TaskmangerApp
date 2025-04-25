import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function Login() {
    const [revealPassword, setRevealPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  return (
    <>
      <div className="h-[80vh] flex justify-center items-center">
        <div className="w-[400px]">
          <form>
            <div className="mb-2">
              <label className="floating-label">
                <span>UserName</span>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-lg w-full"
                  id="username"
                />
              </label>
            </div>
            <div className="mb-2 relative">
              <label className="floating-label">
                <span>Password</span>
                <input
                  type={revealPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-lg w-full"
                  id="password"
                />
              </label>
              <button
                className="absolute inset-y-0 right-2 cursor-pointer"
                onClick={togglePassword}
                type="button"
              >
                {revealPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              className=" btn bg-[#974FD0] text-white hover:bg-[#594669] rounded-sm w-full"
              type="submit"
            >
              Login
            </button>
            <div className="my-3 text-center border py-2">
              <Link to="/register" className="text-[#974FD0] font-bold ">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
