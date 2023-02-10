import React from "react";
import { Navbar } from "./components/Navbar";
import { TodoList } from "./pages/TodoList";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        {<TodoList />}
      </div>
    </>
  );
};

export default App;
