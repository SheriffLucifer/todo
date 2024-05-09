import React, { useState } from 'react';
import { TodoProps } from '../utils/todoProps';
import { ToDo } from '../utils/todo.model';

const Todo: React.FC<TodoProps & { setTodos: React.Dispatch<React.SetStateAction<ToDo[]>> }> = ({
    todos,
    setTodos,
    onDelete,
    onToggleComplete,
}) => {
    const [editedTodo, setEditedTodo] = useState<{ id: string; title: string } | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const handleEdit = (id: string, title: string) => {
        setEditedTodo({ id, title });
    };

    const handleSave = (id: string, title: string) => {
        if (editedTodo) {
            const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, title: editedTodo.title } : todo));
            setTodos(updatedTodos);
            setEditedTodo(null);
        }
    };

    const handleCancel = () => {
        setEditedTodo(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedTodo) {
            setEditedTodo({ ...editedTodo, title: e.target.value });
        }
    };

    const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
        setFilter(filter);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') {
            return !todo.completed;
        } else if (filter === 'completed') {
            return todo.completed;
        }
        return true;
    });

    return (
        <div>
            <div>
                <button
                    onClick={() => handleFilterChange('all')}
                    style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
                >
                    Show All Tasks
                </button>
                <button
                    onClick={() => handleFilterChange('active')}
                    style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
                >
                    Show Active Tasks
                </button>
                <button
                    onClick={() => handleFilterChange('completed')}
                    style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
                >
                    Show Completed Tasks
                </button>
            </div>
            {filteredTodos.map((todo: ToDo) => (
                <div key={todo.id}>
                    {editedTodo && editedTodo.id === todo.id ? (
                        <div>
                            <input type='text' value={editedTodo.title} onChange={handleChange} />
                            <button onClick={() => handleSave(todo.id, todo.title)}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.title}
                            </span>
                            <input
                                type='checkbox'
                                checked={todo.completed}
                                onChange={() => onToggleComplete(todo.id)}
                            />
                            <button onClick={() => handleEdit(todo.id, todo.title)}>Edit</button>
                            <button onClick={() => onDelete(todo.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Todo;
