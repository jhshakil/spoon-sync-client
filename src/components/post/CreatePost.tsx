"use client";

import { useState } from "react";
import PostTextEditor from "./PostTextEditor";

const CreatePost = () => {
  const [content, setContent] = useState<string>("");

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="w-full px-4">
      <PostTextEditor content={content} handleChange={handleChange} />
    </div>
  );
};

export default CreatePost;
