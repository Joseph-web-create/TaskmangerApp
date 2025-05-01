import { useState } from "react";

export default function useEdit() {
  const [edit, setEdit] = useState();

  const handleEdit = (item) => {
    setEdit(item);
  };

  return { handleEdit, edit };
}
