"use client";
import React, { useState } from "react";

export const DotsCanvas = () => {
  const [dots, setDots] = useState<any[]>([]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const arrayColors = ["#eee", "#545454", "#596d91", "#bb5a68", "#696541"];

  const createDots = () => {
    const dots = [];

    for (let i = 0; i < 50; i++) {
      dots.push({
        x: canvasRef.current ? Math.random() * canvasRef.current.width : 0,
        y: canvasRef.current ? Math.random() * canvasRef.current.height : 0,
        size: Math.random(),
        color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
      });
    }
    setDots(dots);
  };

  React.useEffect(() => {
    createDots();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });
    }
  }, [dots, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bg-transparent top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};
