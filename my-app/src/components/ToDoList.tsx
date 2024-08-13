import React, { useState } from 'react';

type Todo = {
    id: number;
    registeredTime: string;
    text: string;
    completed: boolean;
};

type TodoInputProps = {
    addTodo: (text: string) => void;
};

type TodoItemProps = {
    todo: Todo;
    toggleComplete: (id: number) => void;
    deleteTodo: (id: number) => void;
    bgColor: string;
};

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new todo"
                className="p-2 border rounded mr-2"
            />
            <button type="submit" className="bg-blue-500 font-bold text-white rounded p-2">
                Add
            </button>
        </form>
    );
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo, bgColor }) => {
    return (
        <li key={todo.id} className={`p-2 mb-2 rounded flex justify-between items-center ${bgColor}`}>
            <div>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="mr-2"
                />
                <span className="font-bold">{todo.text}</span>
                <span className="font-bold text-sm text-gray-500 ml-2">
                    登録日: {todo.registeredTime}
                </span>
            </div>
            <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-rose-600 text-white rounded p-1 text-sm"
            >
                delete
            </button>
        </li>
    );

};

function ToDoList() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (text: string) => {
        if (text) {
            const newTodo: Todo = {
                id: Date.now(),
                registeredTime: new Date().toLocaleString('ja-JP', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                text: text,
                completed: false,
            };
            setTodos([...todos, newTodo]);
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="mx-auto mt-10 rounded-lg">
            <TodoInput addTodo={addTodo} />
            <h1 className="text-3xl font-bold">Todo List</h1>
            <ul>
                {todos.filter(todo => !todo.completed).map(todo=> (
                    <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    bgColor='bg-gray-200'
                     />
                ))}
            </ul>
           <h1 className="text-3xl font-bold">Completed</h1>
           <ul>
            {todos.filter(todo => todo.completed).map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    bgColor='bg-green-200'
                />
            ))}
           </ul>
        </div>
    );
}

export default ToDoList;
