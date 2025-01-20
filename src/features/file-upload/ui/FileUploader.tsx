"use client";
import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

export const FileUploader = () => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = () => {
    if (completedCrop && imageRef.current && canvasRef.current) {
      const image = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = completedCrop.width!;
      canvas.height = completedCrop.height!;

      ctx.drawImage(
        image,
        completedCrop.x! * scaleX,
        completedCrop.y! * scaleY,
        completedCrop.width! * scaleX,
        completedCrop.height! * scaleY,
        0,
        0,
        completedCrop.width!,
        completedCrop.height!
      );
    }
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "cropped-image.webp";
      link.click();
    }, "image/webp");
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {src && (
        <>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
          >
            <img ref={imageRef} src={src} alt="Source" />
          </ReactCrop>
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <button onClick={handleCropComplete}>Обрезать</button>
          <button onClick={downloadImage}>
            Скачать обрезанное изображение
          </button>
        </>
      )}
    </div>
  );
};
