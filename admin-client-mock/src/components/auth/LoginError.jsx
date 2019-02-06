import React from "react";
import Login from "./Login";
import Errors from "../common/Errors";

function LoginError() {
  return (
    <div>
      <Login />
      <Errors errors={["Invalid username and/or password."]} />
    </div>
  );
}

export default LoginError;
