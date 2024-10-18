import React, { useState } from 'react';
import { TodoProps } from '../utils/todoProps';
import { ToDo } from '../utils/todo.model';
import { Button, ButtonGroup, Input } from '@mui/material';

const Todo: React.FC<TodoProps & { setTodos: React.Dispatch<React.SetStateAction<ToDo[]>> }> = ({
    todos,
    setTodos,
    onDelete,
    onToggleComplete,
}) => {
    const [editedTodo, setEditedTodo] = useState<{ id: string; title: string; originalCompleted: boolean } | null>(
        null
    );
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const handleEdit = (id: string, title: string, completed: boolean) => {
        setEditedTodo({ id, title, originalCompleted: completed });
    };

    const handleSave = (id: string, oldTitle: string, completed: boolean) => {
        if (editedTodo) {
            const newTitle = editedTodo.title.trim();
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        title: newTitle,
                        completed: oldTitle === newTitle ? completed : false,
                    };
                }
                return todo;
            });
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
            <ButtonGroup
                variant='contained'
                aria-label='Basic button group'
                color='warning'
                style={{ marginBottom: 25 }}
            >
                <Button
                    size='small'
                    onClick={() => handleFilterChange('all')}
                    style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
                >
                    Show All Tasks
                </Button>
                <Button
                    size='small'
                    onClick={() => handleFilterChange('active')}
                    style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
                >
                    Show Active Tasks
                </Button>
                <Button
                    size='small'
                    onClick={() => handleFilterChange('completed')}
                    style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
                >
                    Show Completed Tasks
                </Button>
            </ButtonGroup>
            {filteredTodos.map((todo: ToDo) => (
                <div style={{ display: 'flex', justifyContent: 'center' }} key={todo.id}>
                    {editedTodo && editedTodo.id === todo.id ? (
                        <div>
                            <Input type='text' value={editedTodo.title} onChange={handleChange} />
                            <div>
                                <Button
                                    style={{ marginRight: 10 }}
                                    color='info'
                                    onClick={() => handleSave(todo.id, todo.title, todo.completed)}
                                >
                                    Save
                                </Button>
                                <Button color='error' onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <input
                                type='checkbox'
                                checked={todo.completed}
                                onChange={() => onToggleComplete(todo.id)}
                                style={{ marginRight: 10, verticalAlign: 'middle' }}
                            />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.title}
                            </span>
                            <div style={{ margin: 10 }}>
                                <Button
                                    variant='contained'
                                    color='info'
                                    style={{ marginRight: 10 }}
                                    onClick={() => handleEdit(todo.id, todo.title, todo.completed)}
                                >
                                    Edit
                                </Button>
                                <Button variant='contained' color='error' onClick={() => onDelete(todo.id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Todo;
