import React from "react";

import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { ITodo } from "../interfaces/todolist";

import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type TodoProps = {
  todo: ITodo;
  toggleState(id: number, isDoneValue: boolean): void;
  updateTodo(id: number, title: string, description: string): void;
  deleteTodo(id: number): void;
  setModalActiveTwo: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeTitle: React.Dispatch<React.SetStateAction<string>>;
  setChangeDesc: React.Dispatch<React.SetStateAction<string>>;
  setChangeId: React.Dispatch<React.SetStateAction<number>>;
};

export const Todo: React.FC<TodoProps> = ({
  todo,
  toggleState,
  deleteTodo,
  setModalActiveTwo,
  setChangeTitle,
  setChangeDesc,
  setChangeId,
}) => {
  return (
    <Item>
      <Checkbox
        checked={todo.isDone}
        onChange={() => toggleState(todo.id, todo.isDone)}
      />      
      <span>{`Activity ID: ${todo.id}, Activity name: ${todo.title}, Activity description: ${todo.description}`}</span>{" "}
      {/* Стили зачёркивания для true */}
      <button
        className="update"
        onClick={() => {
          setChangeTitle(todo.title);
          setChangeDesc(todo.description);
          setChangeId(todo.id);
          setModalActiveTwo(true);
        }}
      >
        &#9998;
      </button>{" "}
      {/* Повесить обработчик delete */}
      <button className="rm" onClick={() => deleteTodo(todo.id)}>
        &#10006;
      </button>{" "}
      {/* Повесить обработчик delete */}
    </Item>
  );
};
