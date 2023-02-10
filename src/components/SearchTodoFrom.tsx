import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface SearchTodoFormProps {
  searchId: string;
  setSearchId: React.Dispatch<React.SetStateAction<string>>;
  getTodo(id: string): Promise<void>;
}

export const SearchTodoForm: React.FC<SearchTodoFormProps> = ({
  searchId,
  setSearchId,
  getTodo,
}) => {
  const changeSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setSearchId(value);
  };

  const submitSearchHendler = async (event: React.FormEvent) => {
    event.preventDefault();
    await getTodo(searchId);
    setSearchId("");
  };

  return (
    <Box component="form" onSubmit={submitSearchHendler}>
      <TextField        
        id="outlined-controlled"
        label="Find by id"
        type="number"        
        value={searchId || ""}
        onChange={changeSearchHandler}
      />
    </Box>
  );
};
