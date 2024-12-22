"use client";
import dynamic from "next/dynamic";

import { Label } from "./label";

import "react-quill/dist/quill.snow.css";

// Динамический импорт ReactQuill для предотвращения SSR ошибок
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const quillModules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

interface QuillEditorProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

const QuillEditor = ({ value, onChange, label }: QuillEditorProps) => {
  return (
    <div>
      <Label>{label}</Label>
      <ReactQuill
        value={value}
        className="overflow-y-auto max-h-[200px]"
        onChange={onChange}
        modules={quillModules}
        theme="snow"
      />
    </div>
  );
};

export default QuillEditor;
