import React from "react";
import icon from "../../assets/Group 2.png";
import useAuth from "../../store/store";
import OnceLogin from "../../components/OnceLogin";
import NotLogin from "../../components/NotLogin";
export default function Home() {
  const { accessToken } = useAuth();
  return (
    <>
      <div className="flex justify-between">
        <img src={icon} />
        {accessToken ? <OnceLogin /> : <NotLogin />}
      </div>
      <div></div>
    </>
  );
}
