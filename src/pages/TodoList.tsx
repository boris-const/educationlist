import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { SearchTodoForm } from "../components/SearchTodoFrom";
import { Todo } from "../components/Todo";

import { ITodo } from "../interfaces/todolist";
import { ModalAdd } from "../components/ModalAdd";
import { ModalChange } from "../components/ModalChange";

export const TodoList: React.FC = () => {
  useEffect(() => {
    getTodoList();
  }, []);

  const [todoArr, setTodoArr] = useState<ITodo[]>([]); // todoList

  const [modalAddActive, setModalAddActive] = useState<boolean>(false); // id 1
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDesc, setNewTodoDesc] = useState<string>("");

  const [modalChangeActive, setModalChangeActive] = useState<boolean>(false);
  const [changeTitle, setChangeTitle] = useState<string>("");
  const [changeDesc, setChangeDesc] = useState<string>("");
  const [changeId, setChangeId] = useState<number>(0);

  const [searchId, setSearchId] = useState<string>("");

  const createTodo = async (title: string, description: string) => {
    const url = "http://localhost:3100/postTodo";
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      getTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const getTodoList = async () => {
    const url = "http://localhost:3100/getTodo";
    try {
      const response = await fetch(url);
      const { data } = await response.json();
      setTodoArr(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodo = async (id: string) => {
    const numId = parseFloat(id);
    // console.log(`Value: ${numId}, type of value: ${typeof numId}`)
    const url = `http://localhost:3100/getTodo/${numId}`;
    try {
      const response = await fetch(url);
      const { data } = await response.json();
      if (null !== data[0]) {
        setTodoArr(data);
      } else console.log(`No todo with id=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleState = async (id: number, isDoneValue: boolean) => {
    const url = `http://localhost:3100/patchTodo/${id}`;
    try {
      await fetch(url, {
        // mode: "cors",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !isDoneValue }),
      });
      getTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const patchTodo = async (id: number, title: string, description: string) => {
    const url = `http://localhost:3100/patchTodo/${id}`;
    try {
      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      getTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    const url = `http://localhost:3100/deleteTodo/${id}`;
    try {
      await fetch(url, {
        method: "DELETE",
      });
      getTodoList();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAllTodo = async () => {
    const url = "http://localhost:3100/deleteTodos";
    try {
      await fetch(url, {
        method: "DELETE",
      });
      getTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="div" sx={{ width: "70vw", margin: "10vh auto 0" }}>
      <Grid
        container
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid xs={8}>
          <SearchTodoForm
            searchId={searchId}
            setSearchId={setSearchId}
            getTodo={getTodo}
          />
        </Grid>

        <Button variant="contained" onClick={() => setModalAddActive(true)}>
          <AddIcon fontSize="large" />
        </Button>

        <Button variant="contained" onClick={() => deleteAllTodo()}>
          DELETE ALL
        </Button>
      </Grid>

      <ModalAdd
        modalAddActive={modalAddActive}
        setModalAddActive={setModalAddActive}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        newTodoDesc={newTodoDesc}
        setNewTodoDesc={setNewTodoDesc}
        createTodo={createTodo}
      />

      <ModalChange
        modalChangeActive={modalChangeActive}
        setModalChangeActive={setModalChangeActive}
        changeTitle={changeTitle}
        setChangeTitle={setChangeTitle}
        changeDesc={changeDesc}
        setChangeDesc={setChangeDesc}
        changeId={changeId}
        setChangeId={setChangeId}
        patchTodo={patchTodo}
      />

      <Stack spacing={1} sx={{ paddingTop: "10px" }}>
        {todoArr.map((el, idx) => (
          <Todo
            key={idx}
            todo={el}
            toggleState={toggleState}
            updateTodo={patchTodo}
            deleteTodo={deleteTodo}
            setModalChangeActive={setModalChangeActive}
            setChangeTitle={setChangeTitle}
            setChangeDesc={setChangeDesc}
            setChangeId={setChangeId}
          />
        ))}
      </Stack>
    </Box>
  );
};
