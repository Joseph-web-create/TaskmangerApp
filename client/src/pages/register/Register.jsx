import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../../utils/formValidate";
import { registerAuth } from "../../api/auth";
import { useAuth } from "../../store/store";
import { toast } from "sonner";
import handleError from "../../utils/handleError";

export default function Login() {
  const [revealPassword, setRevealPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  const inputData = async (data) => {
    try {
      const res = await registerAuth(data);
      if (res.status === 201) {
        toast.success(res.data.message);
        setAccessToken(res.data.accessToken);
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
            <div className="my-4">
              <label className="floating-label">
                <span>Email</span>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-lg w-full"
                  id="email"
                  {...register("email", {
                    validate: (value) => validateEmail(value),
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
              Sign up
            </button>
            <div className="my-3 text-center border py-2">
              <span>Have an account?.. </span>
              <Link to="/login" className="text-[#974FD0] font-bold ">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
