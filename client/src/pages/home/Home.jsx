import React from "react";
import icon from "../../assets/Group 2.png";
import { useAuth } from "../../store/store";
import OnceLogin from "../../components/OnceLogin";
import NotLogin from "../../components/NotLogin";
import image from "../../assets/Component 1.png";
import { Link } from "react-router";

export default function Home() {
  const { accessToken } = useAuth();
  return (
    <>
      <div className="flex justify-between items-center py-6 flex-col lg:flex-row">
        <img src={icon} />
        {accessToken ? <OnceLogin /> : <NotLogin />}
      </div>
      <div className="flex justify-between items-center h-[90vh] flex-col lg:flex-row">
        <div className="w-[538px]">
          <h1 className="text-[50px]">
            Manage your Tasks on <p className="text-[#974FD0]">TaskDuty</p>
          </h1>
          <p className="py-5 text-[#737171] text-[24px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
            cupiditate a cumque blanditiis enim beatae temporibus repellat
            tempora ut. Nisi laborum veritatis sunt repudiandae veniam sed quam
            vitae quisquam rerum!
          </p>

          <Link
            to={accessToken ? "/task" : "/login"}
            className={`w-[130px] btn bg-[#974FD0] text-white hover:bg-[#a49aac] rounded-sm py-6 text-l ${
              accessToken ? "" : "w-[200px] font-bold"
            }`}
          >
            {accessToken ? "Go to My Task" : "Login to see Tasks"}
          </Link>
        </div>
        <div>
          <img src={image} alt="" />
        </div>
      </div>
    </>
  );
}
