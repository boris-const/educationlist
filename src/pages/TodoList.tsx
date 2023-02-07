import React, { useState } from "react";

import { Todo } from "../components/Todo";

import { ITodo } from "../interfaces/todolist";

export const TodoList: React.FC = () => {
  const [todoArr, setTodoArr] = useState<ITodo[]>([
    {
      id: 1,
      title: "Go to gym",
      description: "You need to be realy powerful !",
      isDone: false,
    },
    {
      id: 2,
      title: "Go to kitchen",
      description: "You need to be healfy !",
      isDone: false,
    },
    {
      id: 3,
      title: "Go to badroom",
      description: "You need to be fine !",
      isDone: false,
    },
  ]);

  const toggleState = (id: number): void => {
    console.log(id);
  };

  const updateTodo = (id: number, title: string, description: string): void => {
    console.log(id, title, description);
  };

  const deleteTodo = (id: number): void => {
    console.log(id);
  };

  return (
    <>
      <div className="todo_list">
        <ol>
          {todoArr.map((el, idx) => (
            <Todo
              todo={el}
              idx={idx}
              toggleState={toggleState}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ol>
      </div>
    </>
  );
};
