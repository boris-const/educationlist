import React from "react";
import { ITodo } from "../interfaces/todolist";

type TodoProps = {
  todo: ITodo;
  idx: number;
};

export const Todo: React.FC<TodoProps> = ({ todo, idx }) => {
  return (
    <li key={idx}>        
      <input type="checkbox" />{" "}  {/* Повесить обработчик checkbox */}
      <span >{`Activity name: ${todo.title}, Activity description: ${todo.description}`}</span> {/* Стили зачёркивания для true */}
      <button className="rm">&#10006;</button> {/* Повесить обработчик delete */}
    </li>
  );
};
