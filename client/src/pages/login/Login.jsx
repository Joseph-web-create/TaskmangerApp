import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { validatePassword, validateUsername } from "../../utils/formValidate";
import { loginAuth } from "../../api/auth";
import handleError from "../../utils/handleError";
import {useAuth} from "../../store/store";
import { toast } from "sonner";

export default function Login() {
  const [revealPassword, setRevealPassword] = useState(false);
  const { setAccessToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const inputData = async (data) => {
    try {
      const res = await loginAuth(data);
      if (res.status === 200) {
        setAccessToken(res.data.accessToken);
        toast.success(res.data.message);
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="h-[80vh] flex justify-center items-center">
        <div className="w-[400px]">
          <form onSubmit={handleSubmit(inputData)}>
            <div className="mb-2">
              <label className="floating-label">
                <span>UserName</span>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-lg w-full"
                  id="username"
                  {...register("username", {
                    validate: (value) => validateUsername(value),
                  })}
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
                  {...register("password", {
                    validate: (value) => validatePassword(value),
                  })}
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
              disabled={isSubmitting}
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
