import React from "react";
import { ITodo } from "../interfaces/todolist";

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
    <li>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => toggleState(todo.id, todo.isDone)}
      />{" "}
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
    </li>
  );
};
