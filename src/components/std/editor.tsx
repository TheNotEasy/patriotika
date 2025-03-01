import Editor from "react-simple-wysiwyg";
import React from "react";

export function AdaptiveEditor(props: React.ComponentProps<typeof Editor>) {
  return (
    <div className="stdcontainer">
      <Editor {...props} className="unreset" />
    </div>
  );
}