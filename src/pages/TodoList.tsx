import { title } from "process";
import React, { useEffect, useState } from "react";
import { Modal } from "../components/Modal/Modal";

import { Todo } from "../components/Todo";

import { ITodo } from "../interfaces/todolist";

export const TodoList: React.FC = () => {
  useEffect(() => {
    getTodoList();
  }, []);

  const [todoArr, setTodoArr] = useState<ITodo[]>([]); // todoList

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDesc, setNewTodoDesc] = useState<string>("");

  const [modalActiveTwo, setModalActiveTwo] = useState<boolean>(false);
  const [changeTitle, setChangeTitle] = useState<string>("");
  const [changeDesc, setChangeDesc] = useState<string>("");

  const createTodo = async (title: string, description: string) => {
    const url = "http://localhost:3100/postTodo";
    try {
      const response = await fetch(url, {
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

  const toggleState = async (id: number, isDoneValue: boolean) => {
    const url = `http://localhost:3100/patchTodo/${id}`;
    try {
      const response: Response = await fetch(url, {
        // mode: "cors",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !isDoneValue }),
      });
      const ans = await response.json();
      getTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = (id: number, title: string, description: string): void => {
    console.log(id, title, description);
  };

  const deleteTodo = async (id: number) => {
    const url = `http://localhost:3100/deleteTodo/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      getTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await createTodo(newTodoTitle, newTodoDesc);
    setNewTodoTitle("");
    setNewTodoDesc("");
    setModalActive(false);
  };

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
  }

  const changeSubmitHandler = async (event:  React.FormEvent) => {
    event.preventDefault();
    await createTodo(changeTitle, changeDesc);
    setNewTodoTitle("");
    setNewTodoDesc("");
    setModalActive(false);
  }

  return (
    <>
      <div className="todo_list">
        <div className="menu" style={{ display: "flex" }}>
          <form action="GET">
            <input type="search" />
            <input type="submit" />
          </form>
          <button
            style={{ marginLeft: "20px" }}
            onClick={() => setModalActive(true)}
          >
            ADD
          </button>
          <button style={{ marginLeft: "40px" }}>DELETE ALL</button>
        </div>
        
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          <form action="#" onSubmit={submitHandler}>
            <input
              name="title"
              type="text"
              value={newTodoTitle || ""}
              style={{ display: "block", marginTop: "5px" }}
              onChange={changeHandler}
            />
            <input
              name="description"
              type="text"
              value={newTodoDesc || ""}
              style={{ display: "block", marginTop: "5px" }}
              onChange={changeHandler}
            />
            <button
              type="submit"
              style={{ display: "block", marginTop: "5px" }}
            >
              Create
            </button>
          </form>
        </Modal>

        <Modal modalActive={modalActiveTwo} setModalActive={setModalActiveTwo}>
          <form action="#" onSubmit={changeSubmitHandler}>
            <input
              name="title"
              type="text"
              value={changeTitle || ""}
              style={{ display: "block", marginTop: "5px" }}
              onChange={changeTodoHandler}
            />
            <input
              name="description"
              type="text"
              value={changeDesc || ""}
              style={{ display: "block", marginTop: "5px" }}
              onChange={changeTodoHandler}
            />
            <button
              type="submit"
              style={{ display: "block", marginTop: "5px" }}
            >
              Create
            </button>
          </form>
        </Modal>
        <ol>
          {todoArr.map((el, idx) => (
            <Todo
              key={idx}
              todo={el}
              toggleState={toggleState}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              setModalActiveTwo={setModalActiveTwo}
              setChangeTitle={setChangeTitle}
              setChangeDesc={setChangeDesc}
            />
          ))}
        </ol>
      </div>
    </>
  );
};
