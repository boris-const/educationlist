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

interface ModalChangeProps {
  modalChangeActive: boolean;
  setModalChangeActive: React.Dispatch<React.SetStateAction<boolean>>;
  changeTitle: string;
  setChangeTitle: React.Dispatch<React.SetStateAction<string>>;
  changeDesc: string;
  setChangeDesc: React.Dispatch<React.SetStateAction<string>>;
  changeId: number,
  setChangeId: React.Dispatch<React.SetStateAction<number>>
  patchTodo(id: number, title: string, description: string): Promise<void>;
}

export const ModalChange: React.FC<ModalChangeProps> = ({
  modalChangeActive,
  setModalChangeActive,
  changeTitle,
  setChangeTitle,
  changeDesc,
  setChangeDesc,
  changeId,
  setChangeId,
  patchTodo,
}) => {
    const changeTodoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if (name === "title") {
          setChangeTitle(value);
        }
        if (name === "description") {
          setChangeDesc(value);
        }
      };
    
      const changeTodoSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        // await createTodo(changeTitle, changeDesc);
        await patchTodo(changeId, changeTitle, changeDesc);
        // setNewTodoTitle("");
        // setNewTodoDesc("");
        setChangeId(0);
        setModalChangeActive(false);
      };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalChangeActive}
        onClose={() => setModalChangeActive(false)}
        closeAfterTransition
      >
        <Fade in={modalChangeActive}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              align="center"
              sx={{ marginBottom: "25px" }}
            >
              Update todo element
            </Typography>
            <Box
              component="form"
              onSubmit={changeTodoSubmitHandler}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <TextField
                name="title"
                type="text"
                id="outlined-controlled"
                label="Title"
                value={changeTitle || ""}
                onChange={changeTodoHandler}
              />
              <TextField
                name="description"
                type="text"
                id="outlined-controlled"
                label="Description"
                value={changeDesc || ""}
                onChange={changeTodoHandler}
              />
              <Button variant="contained" type="submit">
                Update
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
