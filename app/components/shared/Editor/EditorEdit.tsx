"use client";

import React, { useEffect, useRef, useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import api from "@/app/api";
import styles from "./Editor.module.css";

interface EditorEditProps {
  value: OutputData;
  onChange: (data: OutputData) => void;
  className?: string;
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
      const Header = (await import("@editorjs/header")).default;
      const ImageTool = (await import("@editorjs/image")).default;
      const EditorjsList = (await import("@editorjs/list")).default;
      const Quote = (await import("@editorjs/quote")).default;
      const Marker = (await import("@editorjs/marker")).default;
      const Warning = (await import("@editorjs/warning")).default;
      const Table = (await import("@editorjs/table")).default;

      if (!mounted) return;

      editorRef.current = new EditorJS({
        holder: containerRef.current,
        data: value,
        onChange: async () => {
          const data = await editorRef.current.save();
          onChange(data);
        },
        tools: {
          header: Header,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file: File) {
                  return new Promise((resolve) => {
                    const formData = new FormData();
                    formData.append("image", file);
                    api
                      .post("files/editor/download/image", formData, {
                        headers: {
                          "Content-Type": "mult",
                        },
                      })
                      .then((data) => {
                        resolve({
                          success: 1,
                          file: { url: data.data.file.url },
                        });
                      });
                  });
                },
              },
            },
          },
          List: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
              maxLevel: 1,
            },
          },
          quote: Quote,
          marker: Marker,
          warning: Warning,
          table: Table,
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

const EditorEdit: React.FC<EditorEditProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useEditorJS(containerRef, value, onChange);

  return (
    <div
      className={`${styles.text_editor} ${className}`}
      style={{ border: "1px solid #ccc", padding: "10px", minHeight: "200px" }}
    >
      {isLoading && <div>Загрузка редактора...</div>}
      <div ref={containerRef} />
    </div>
  );
};

export default EditorEdit;
