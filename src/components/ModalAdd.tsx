import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #1565c0",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

interface ModalAddProps {
  modalAddActive: boolean;
  setModalAddActive: React.Dispatch<React.SetStateAction<boolean>>;
  newTodoTitle: string;
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  newTodoDesc: string;
  setNewTodoDesc: React.Dispatch<React.SetStateAction<string>>;
  createTodo(title: string, description: string): Promise<void>;
}

export const ModalAdd: React.FC<ModalAddProps> = ({
  modalAddActive,
  setModalAddActive,
  newTodoTitle,
  setNewTodoTitle,
  newTodoDesc,
  setNewTodoDesc,
  createTodo,
}) => {
  const changeAddTodoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === "title") {
      setNewTodoTitle(value);
    }
    if (name === "description") {
      setNewTodoDesc(value);
    }
  };

  const submitAddTodoHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await createTodo(newTodoTitle, newTodoDesc);
    setNewTodoTitle("");
    setNewTodoDesc("");
    setModalAddActive(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalAddActive}
        onClose={() => setModalAddActive(false)}
        closeAfterTransition
      >
        <Fade in={modalAddActive}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              align="center"
              sx={{ marginBottom: "25px" }}
            >
              Create todo element
            </Typography>
            <Box
              component="form"
              onSubmit={submitAddTodoHandler}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <TextField
                name="title"
                type="text"
                id="outlined-controlled"
                label="Title"
                value={newTodoTitle || ""}
                onChange={changeAddTodoHandler}
              />
              <TextField
                name="description"
                type="text"
                id="outlined-controlled"
                label="Description"
                value={newTodoDesc || ""}
                onChange={changeAddTodoHandler}
              />
              <Button variant="contained" type="submit">
                Create
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
