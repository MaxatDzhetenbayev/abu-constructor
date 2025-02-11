"use client";
import JoditEditor from "jodit-react";
import { useMemo } from "react";

import { Label } from "./label";

interface QuillEditorProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

const JoditEditorComponent = ({ value, onChange, label }: QuillEditorProps) => {
  const config = useMemo(
    () => ({
      toolbarSticky: false,
      spellcheck: true,
      language: "ru",
      toolbarAdaptive: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  return (
    <div>
      <Label>{label}</Label>
      <JoditEditor
        value={value}
        config={config}
        tabIndex={1}
        onChange={(content) => onChange(content)}
        className="h-96"
      />
    </div>
  );
};

export default JoditEditorComponent;
