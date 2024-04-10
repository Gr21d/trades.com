import React, { useState } from "react";
import information from "../../../public/information.png";
import Image from "next/image";
import ParentComponent from "@/pages/tutorials/portfoliopageinfobutton";

const ClickableInfo = () => {
  const [isHovering, setIsHovering] = useState(false);
  const handleClick = () => {
    setIsHovering(!isHovering);
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{ border: "none", background: "transparent", padding: 0 }}
      >
        <Image src={information} width={20} height={20} alt={"info"} />
      </button>

      {isHovering && (
        <div
          style={{
            position: "absolute",
            top: "120px",
            left: "200px",
          }}
        >
          <ParentComponent />
        </div>
      )}
    </>
  );
};

export default ClickableInfo;
