import React from "react";

const MobileBar: React.FC<{
  position?: "top" | "bottom";
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ position = "top", color = "#181818", className = "", style }) => (
  <div
    className={"mobileBar " + className}
    style={{
      width: 120,
      height: 5,
      borderRadius: 9,
      background: color,

      opacity: 0.8,
      margin: position === "top" ? "16px auto 12px auto" : "24px auto 9px auto",
      display: "block",
      ...style,
    }}
  />
);

export default MobileBar;
