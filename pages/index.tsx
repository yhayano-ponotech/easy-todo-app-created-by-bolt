import { useState, useEffect } from 'react';
    import { v4 as uuidv4 } from 'uuid';

    interface Todo {
      id: string;
      text: string;
      completed: boolean;
    }

    const Home: React.FC = () => {
      const [todos, setTodos] = useState<Todo[]>([]);
      const [newTodo, setNewTodo] = useState('');

      useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (newTodo.trim() !== '') {
          const todo: Todo = {
            id: uuidv4(),
            text: newTodo,
            completed: false,
          };
          setTodos([...todos, todo]);
          setNewTodo('');
        }
      };

      const toggleComplete = (id: string) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };

      const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      };

      return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Todo List</h1>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new todo"
              style={{ padding: '8px', marginRight: '5px', flex: 1 }}
            />
            <button onClick={addTodo} style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Add</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    flex: 1,
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default Home;
