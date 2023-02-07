import React, { useState } from "react";
import { Todo } from "../components/Todo";
import { ITodo } from "../interfaces/todolist";

export const TodoList: React.FC = () => {

  const [todoArr, setTodoArr] = useState<ITodo[]>([
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
  ])

  return (
    <>
      <div className="todo_list">
        <ol>
          {todoArr.map((el, idx) => (
            <Todo todo={el} idx={idx} />
          ))}
        </ol>
      </div>
    </>
  );
};
