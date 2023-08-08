export interface IFolder {
  folderId: number | undefined;
  folderName: string;
  authorId: string;
  createdAt: Date;
}

export interface INote {
  noteId: number;
  folderId: string;
  noteContent: string;
  createdAt: Date;
}