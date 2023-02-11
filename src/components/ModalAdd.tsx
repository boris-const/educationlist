import React from "react";

import Backdrop from "@mui/material/Backdrop";
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalAddProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  newTodoTitle: string;
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  newTodoDesc: string;
  setNewTodoDesc: React.Dispatch<React.SetStateAction<string>>;
  createTodo(title: string, description: string): Promise<void>;
}

export const ModalAdd: React.FC<ModalAddProps> = ({
  modalActive,
  setModalActive,
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
    setModalActive(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalActive}
        onClose={() => setModalActive(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalActive}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Box component="form" onSubmit={submitAddTodoHandler}>
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
              <Button variant="contained" type="submit">Create</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
