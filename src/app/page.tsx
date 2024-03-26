"use client";

import CurrentComponent from "./components/CurrentComponent";
import FiveDayComponent from "./components/FiveDayComponent";
import NavComponent from "./components/NavComponent";

export default function Home() {
  return (
    <div className="bgGrad vh">
      <NavComponent></NavComponent>
      <CurrentComponent></CurrentComponent>
      <FiveDayComponent></FiveDayComponent>
    </div>
  );
}
