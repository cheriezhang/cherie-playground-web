import { getLocalNotes } from "@/lib";

import NoteList from "./note-list";

export default async function NotePage() {
  const notes = await getLocalNotes();

  return <NoteList notes={notes} />;
}
