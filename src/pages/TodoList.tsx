import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material";

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
      // console.log(data)
      setTodoArr(data);
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

  const changeSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setSearchId(value);
  };

  const submitSearchHendler = async (event: React.FormEvent) => {
    event.preventDefault();
    await getTodo(searchId);
    setSearchId("");
  };

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

  const changeSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    // await createTodo(changeTitle, changeDesc);
    await patchTodo(changeId, changeTitle, changeDesc);
    setNewTodoTitle("");
    setNewTodoDesc("");
    setChangeId(0);
    setModalActiveTwo(false);
  };

  return (
    <>      
      <div className="todo_list">
        <div className="menu" style={{ display: "flex" }}>
          <form action="GET" onSubmit={submitSearchHendler}>
            <input
              type="number"
              value={searchId || ""}
              onChange={changeSearchHandler}
            />
            <input type="submit" />
          </form>
          <button
            style={{ marginLeft: "20px" }}
            onClick={() => setModalActive(true)}
          >
            ADD
          </button>
          <button
            onClick={() => deleteAllTodo()}
            style={{ marginLeft: "40px" }}
          >
            DELETE ALL
          </button>
        </div>

        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          <form action="#" onSubmit={submitAddTodoHandler}>
            <input
              name="title"
              type="text"
              value={newTodoTitle || ""}
              style={{ display: "block", marginTop: "5px" }}
              onChange={changeAddTodoHandler}
            />
            <input
              name="description"
              type="text"
              value={newTodoDesc || ""}
              style={{ display: "block", marginTop: "5px" }}
              onChange={changeAddTodoHandler}
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
              updateTodo={patchTodo}
              deleteTodo={deleteTodo}
              setModalActiveTwo={setModalActiveTwo}
              setChangeTitle={setChangeTitle}
              setChangeDesc={setChangeDesc}
              setChangeId={setChangeId}
            />
          ))}
        </ol>
      </div>
    </>
  );
};
