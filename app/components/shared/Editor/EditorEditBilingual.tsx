"use client";

import React, { useEffect, useRef, useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import styles from "./Editor.module.css";

interface EditorEditProps {
  value: OutputData;
  onChange: (data: OutputData) => void;
}

const useEditorJS = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  value: OutputData,
  onChange: (data: OutputData) => void
) => {
  const editorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!containerRef.current || !mounted) return;

      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Marker = (await import("@editorjs/marker")).default;

      if (!mounted) return;

      editorRef.current = new EditorJS({
        holder: containerRef.current,
        data: value,
        onChange: async () => {
          const data = await editorRef.current.save();
          onChange(data);
        },
        tools: {
          marker: Marker,
        },
        onReady: () => {
          if (mounted) setIsLoading(false);
        },
      });
    };

    init();

    return () => {
      mounted = false;
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return { isLoading, editorRef };
};

const EditorEditBilingual: React.FC<EditorEditProps> = ({
  value,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useEditorJS(containerRef, value, onChange);

  return (
    <div
      className={styles.text_editor}
      style={{ border: "1px solid #ccc", padding: "10px", minHeight: "200px" }}
    >
      {isLoading && <div>Загрузка редактора...</div>}
      <div ref={containerRef} />
    </div>
  );
};

export default EditorEditBilingual;
