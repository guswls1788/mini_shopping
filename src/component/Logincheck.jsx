import React from "react";
import useLocalStorage from "../useLocalStorage";

function Switch() {
  const [on, setOn] = useLocalStorage("on", false);

  return <button onClick={() => setOn(!on)}>{on ? "ON" : "OFF"}</button>;
}

export default Switch;
