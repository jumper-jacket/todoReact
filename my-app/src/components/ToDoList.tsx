import React, { useState } from 'react';

function ToDoList(){
    const [ todos, setTodos ] = useState<Todo[]>([]);
    const [ input, setInput ] = useState('');

    type Todo =  {
        id: number,
        registeredTime: string,
        text: string,
        completed: boolean,
    };

    const addTodo = () => {
        if(input){
            const newTodo: Todo = {
                id: Date.now(),
                registeredTime: (new Date()).toLocaleString('ja-JP', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                text: input,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setInput('');
        }
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    }
   
    return (
    <div className="mx-auto mt-10 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">ToDoList</h1>
            <div className="flex mb-4">
            <input
            className="font-semibold border-gray-400 border-2 rounded"
            type="text"
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            placeholder='Add a new todo'
            />
            <button
            onClick={addTodo}
            className="bg-blue-500 font-bold text-white rounded p-2"
            >Add</button>
        </div>
            <ul>
                {todos.map((todo,index) => (
                    <li
                    key={todo.id}
                    className={`p-2 mb-2 rounded flex justify-between items-center ${todo.completed ? 'bg-green-200' : 'bg-gray-200'}`}
                    >
                        <div>
                            <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={()=> toggleComplete(todo.id)}
                            className='mr-2'
                            />
                            <span className={todo.completed ? 'line-through' : ''}>
                                {todo.text}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                                登録日:{todo.registeredTime}
                            </span>
                        </div>
                        <button
                        onClick={()=> deleteTodo(todo.id)}
                        className='bg-red-500 text-white rounded p-1 text-sm'
                        >削除</button>
                    </li>
                ))}
            </ul>
    </div>
    )
}
export default ToDoList;