import React from "react";

export default function ModelPopup({ show, children }) {
  return <>{show && <div id="model-popup">{children}</div>}</>;
}
