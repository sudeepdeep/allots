import React from "react";
import { AnimationLoading } from "../components/Loading";
import error from "../assets/404.json";

function Error() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-[50vh]">
      <AnimationLoading animation={error} />
      <p>Page not found.</p>
    </div>
  );
}

export default Error;
