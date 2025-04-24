import React from "react";
import { Outlet } from "react-router";

export default function RootLayOut() {
  return (
    <section className="p-2">
      <div className="">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
