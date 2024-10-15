import React, { useState } from "react";
import { motion } from "framer-motion";

const TiltCard = ({ children }: { children: any }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: any) => {
    const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
    const { offsetX, offsetY } = e.nativeEvent;

    const rotateY = ((offsetX / width) * 2 - 1) * 18;
    const rotateX = ((offsetY / height) * 2 - 1) * -18;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      className="category_item"
      style={{
        perspective: "1000px",
        boxShadow: `0 10px 15px rgba(0, 0, 0, 0.3)`, // Изначальная тень
        transformStyle: "preserve-3d",
        transform: `translateZ(0)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transition: {
          type: "spring",
          duration: 0.4,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
