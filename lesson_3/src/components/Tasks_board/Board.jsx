import React, { useEffect, useState } from 'react';
import "./Board.css"
import service from "./../../services/todosAxios";

export default function Tasks_board() {
  const [tasks, setTask] = useState([]);
  const getTask = async () => {
    try {
      const response = await service.get();
      setTask(response);
    } catch (err) {
      console.log(err);
    }
  };
    
  useEffect(() => {
    getTask();
  }, []);
    
  const handleItemDelete = async (e, id) => {
    try {
      await service.delete(id);
      setTask((prevState) => prevState.filter((item) => item.id !== id));
      // getTodos();
    } catch (err) {
      console.log(err);
    }
  };
    
  const handleItemStatus = async (item) => {
    try {
      const response = await service.put(item.id, {status: item.status + 1});
      setTask((prevState) =>
        prevState.map((element) => {
          if (element.id === response.id) element = response;
          return element;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemStatusBack = async (item) => {
    try {
      const response = await service.put(item.id, {status: item.status - 1});
      setTask((prevState) =>
        prevState.map((element) => {
          if (element.id === response.id) element = response;
          return element;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  let pending_tasks = [];
  let progress_tasks = [];
  let finished_tasks = [];

  tasks.map((item) => {
    switch(item.status) {
      case 0: pending_tasks.push(item); break;
      case 1: progress_tasks.push(item); break;
      case 2: finished_tasks.push(item); break;
    }
  });

  return (
    
    <div class="board">
      <div class="column">
        <h3>To Do: {pending_tasks.length}</h3>
        <ul>
          {pending_tasks.map((item) => (
            <li key={item.id}>{item.title}{" "}
              <button onClick={() => handleItemStatus(item)}>In progress</button>
            </li>
      
          ))}
        </ul>
    </div>

    <div class="column">
        <h3>In Progress: {progress_tasks.length}</h3>
        <ul>
          {progress_tasks.map((item) => (
            <li key={item.id}>{item.title}{" "}
              <button onClick={() => handleItemStatusBack(item)}>To do </button>
              <button onClick={() => handleItemStatus(item)}>Finish</button>
            </li>
      
          ))}
        </ul>
        
    </div>

    <div class="column">
        <h3>Done: {finished_tasks.length}</h3>
        <ul>
          {finished_tasks.map((item) => (
            <li key={item.id}>{item.title}{" "}
              <button onClick={() => handleItemDelete(item, item.id)}>To archive</button>
            </li>
      
          ))}
        </ul>
        
    </div>
</div>

    );
}