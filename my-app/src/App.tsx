import React from 'react';
import './components/ToDoList';
import './App.css';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <div className='flex flex-col justify-center w-full  h-screen'>
      <ToDoList />
    </div>
  );
}

export default App;
