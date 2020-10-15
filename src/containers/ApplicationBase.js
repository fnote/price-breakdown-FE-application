import React from "react";
import Login from "./Login/Login";
import PriceValidation from "./PriceValidation/PriceValidation";
import FileUpload from "./FileUpload/FileUpload";
import AppLoader from "../components/AppLoader";

export default function ApplicationBase() {
  return (
    <>
      <PriceValidation />
      {/* <AppLoader /> */}
    </>
  );
}
