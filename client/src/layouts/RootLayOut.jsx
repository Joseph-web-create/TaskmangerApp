import React from "react";
import { Outlet } from "react-router";

export default function RootLayOut() {
  return (
    <section className="p-2 max-w-[1250px] mx-auto">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </section>
  );
}
