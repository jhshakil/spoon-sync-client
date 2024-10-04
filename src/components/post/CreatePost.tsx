"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import { useState } from "react";

const CreatePost = () => {
  const [content, setContent] = useState<string>("");

  const handleChange = (newContent: string) => {
    console.log(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ inline: true }),
      ImageResize.configure({ inline: true }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default CreatePost;
