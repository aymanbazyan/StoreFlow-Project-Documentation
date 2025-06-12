import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function MyComponent() {
  function a() {
    window.location.href = "/docs";
  }

  return (
    <BrowserOnly>
      {() => {
        // Client-side only code here
        return <div>{a()}</div>;
      }}
    </BrowserOnly>
  );
}
