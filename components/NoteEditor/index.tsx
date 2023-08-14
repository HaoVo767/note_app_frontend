import React, { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import dynamic from "next/dynamic";
import { Stack, debounce } from "@mui/material";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { INote } from "../interface";
import { baseURL } from "@/constants/baseURL";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/state";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

function NoteEditor() {
  const [note, setNote] = useState<INote>();
  const router = useRouter();
  const { onChangeState } = useAppContext();
  const [editorState, setEditorState] = useState<EditorState | undefined>(EditorState.createEmpty());
  const [rawHTML, setRawHTML] = useState(note?.noteContent);
  const handleEditorChange = (e: any) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };
  const { folderId, noteId } = router.query;

  useEffect(() => {
    const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
    fetch(`${baseURL}/getNote/${folderId}/${noteId}`, {
      headers: { Authorization: accessToken || "", Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setNote(data.result[0]);
      })
      .catch((err) => console.log(err));
  }, [noteId, folderId]);

  React.useEffect(() => {
    setRawHTML(note?.noteContent);
  }, [note]);

  const debounceMemo = React.useMemo(() => {
    return debounce((rawHTML, note) => {
      if (rawHTML === note?.noteContent) {
        return;
      } else {
        const data = { noteContent: rawHTML, noteId: note.noteId };
        const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
        fetch(`${baseURL}/updateNoteContent`, {
          method: "POST",
          headers: { Authorization: accessToken, Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => {
            res.json();
            if (res.status !== 200) {
              alert("Phiên đăng nhập hết hạn");
            }
          })
          .then(() => {
            onChangeState({ addItem: true });
          })
          .catch((err) => console.log(err));
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    debounceMemo(rawHTML, note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML]);

  React.useEffect(() => {
    const blocksFromHtml = convertFromHTML(note?.noteContent ? note?.noteContent : "");
    const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);
    setEditorState(EditorState.createWithContent(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note?.noteId]);
  return (
    <Stack>
      {!!noteId && (
        <Editor editorState={editorState} onEditorStateChange={handleEditorChange} placeholder="Writing some note" />
      )}
    </Stack>
  );
}

export default NoteEditor;
