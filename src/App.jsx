import React, { useState, useEffect } from "react";
import "./App.css";
import { BsFillTrashFill } from "react-icons/bs";

const App = () => {
  const [tittle, setTittle] = useState("");
  const [des, setDes] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const handleForm = (event) => {
    event.preventDefault();
    setMainTask([...mainTask, { tittle, des, isComplete: false }]);
    setDes("");
    setTittle("");
  };

  const deleteHandler = (index) => {
    let removeList = [...mainTask];
    removeList.splice(index, 1);
    setMainTask(removeList);
  };

  const completeHandler = (index) => {
    let updatedTasks = [...mainTask];
    updatedTasks[index].isComplete = true;
    setMainTask(updatedTasks);
    alert("Task is complete!");
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setMainTask(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever mainTask changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(mainTask));
  }, [mainTask]);

  let renderTask;
  mainTask.length > 0
    ? (renderTask = mainTask.map((item, index) => {
        return (
          <div
            key={index}
            className={`flex justify-around items-center font-sans border-gray-400 mb-2 ${
              item.isComplete ? "bg-green-300" : ""
            }`}
          >
            <h5 className="text-2xl text-red-500 font-bold mt-2 capitalize">
              {item.tittle}
            </h5>
            <h6 className="text-xl text-red-500 font-bold">{item.des}</h6>
            <BsFillTrashFill
              onClick={() => deleteHandler(index)}
              className="cursor-pointer text-black"
              style={{ fontSize: "25px" }}
            />
            <button
              onClick={() => completeHandler(index)}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Complete
            </button>
          </div>
        );
      }))
    : (renderTask = (
        <h2 className="text-red-500 text-xl">No Task available😕</h2>
      ));

  return (
    <>
      <div className="todo">
        <h1 className="bg-black text-white text-2xl p-5 text-center font-bold ">
          You Have To Do It
        </h1>
        <form onSubmit={handleForm} className="text-center">
          <input
            onChange={(e) => {
              setTittle(e.target.value);
            }}
            value={tittle}
            type="text"
            className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2 "
            placeholder="Enter Task Here"
          />
          <input
            value={des}
            onChange={(e) => {
              setDes(e.target.value);
            }}
            type="text"
            className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2 "
            placeholder="Enter Description Here"
          />
          <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded">
            Add Task
          </button>
        </form>
        <hr className="mb-4 w-3/4 mx-auto" />
        <div className="p-8 bg-gray-200">
          <ul>
            <li>{renderTask}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
