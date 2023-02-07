import React from "react";
import { ITodo } from "../interfaces/todolist";

export const TodoList: React.FC = () => {
  const todoArr: ITodo[] = [
    {
      title: "Go to gym",
      description: "You need to be realy powerful !",
      isDone: false,
    },
    {
      title: "Go to kitchen",
      description: "You need to be healfy !",
      isDone: false,
    },
    {
      title: "Go to badroom",
      description: "You need to be fine !",
      isDone: false,
    },
  ];

  return (
    <>
      <div className="todo_list">
        <ol>
          {todoArr.map((el, idx) => (
            <li
              key={idx}
            >{`Activity name: ${el.title}, Activity description: ${el.description}, isDone: ${el.isDone}`}</li>
          ))}
        </ol>
      </div>
    </>
  );
};
