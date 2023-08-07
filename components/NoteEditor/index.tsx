import React, { useState } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

function NoteEditor() {
  const note = {
    noteId: "",
    noteContent: "this is note content",
  };

  const [editorState, setEditorState] = useState<EditorState | undefined>(EditorState.createEmpty());
  const [rawHTML, setRawHTML] = useState(note.noteContent);
  const handleEditorChange = (e: any) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };
  React.useEffect(() => {
    setRawHTML(note.noteContent);
  }, [note.noteContent]);
  React.useEffect(() => {
    const blocksFromHtml = convertFromHTML(note.noteContent);
    const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);
    setEditorState(EditorState.createWithContent(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.noteId]);
  return (
    <Stack>
      <Editor editorState={editorState} onEditorStateChange={handleEditorChange} placeholder="Writing some note" />
    </Stack>
  );
}

export default NoteEditor;
