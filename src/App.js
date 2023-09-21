import React, { useState } from 'react';

const App = () => {
  const [columns, setColumns] = useState([
    {
      title: 'To Do',
      tasks: [],
    },
    {
      title: 'In Progress',
      tasks: [],
    },
    {
      title: 'Done',
      tasks: [],
    },
  ]);

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    deadline: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const addTask = (columnIndex) => {
    if (newTask.name) {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        newColumns[columnIndex].tasks.push(newTask);
        return newColumns;
      });
      setNewTask({
        name: '',
        description: '',
        deadline: '',
      });
    }
  };

  const editTask = (columnIndex, taskIndex, updatedTask) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex].tasks[taskIndex] = updatedTask;
      return newColumns;
    });
  };

  const deleteTask = (columnIndex, taskIndex) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex].tasks.splice(taskIndex, 1);
      return newColumns;
    });
  };

  const moveTask = (fromColumnIndex, toColumnIndex, taskIndex) => {
    const taskToMove = columns[fromColumnIndex].tasks[taskIndex];
    deleteTask(fromColumnIndex, taskIndex);
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[toColumnIndex].tasks.push(taskToMove);
      return newColumns;
    });
  };

  return (
    <div>
      <h1>Task Board</h1>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          <h2>{column.title}</h2>
          <ul>
            {column.tasks.map((task, taskIndex) => (
              <li key={taskIndex}>
                <div>
                  <strong>{task.name}</strong>
                  <p>{task.description}</p>
                  <p>Deadline: {task.deadline}</p>
                </div>
                <div>
                  <button onClick={() => editTask(columnIndex, taskIndex, task)}>Edit</button>
                  <button onClick={() => deleteTask(columnIndex, taskIndex)}>Delete</button>
                  {columnIndex !== columns.length - 1 && (
                    <button onClick={() => moveTask(columnIndex, columnIndex + 1, taskIndex)}>Move Right</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Task Name"
              value={newTask.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Task Description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="deadline"
              placeholder="Deadline"
              value={newTask.deadline}
              onChange={handleInputChange}
            />
            <button onClick={() => addTask(columnIndex)}>Add Task</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

