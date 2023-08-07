export interface IFolder {
  folderId: number | undefined;
  folderName: string;
  authorId: string;
}

export interface INote {
  noteId: number;
  folderId: string;
  noteContent: string;
}