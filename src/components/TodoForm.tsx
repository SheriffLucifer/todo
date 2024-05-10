import React from 'react';
import { TodoFormProps } from '../utils/todoFormProps';
import { Button, Input } from '@mui/material';

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, inputValue, setInputValue }) => {
    const handleAddTodo = () => {
        addTodo(inputValue);
    };

    return (
        <div>
            <Input
                type='text'
                placeholder='Enter todo title'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <Button style={{ marginLeft: 10 }} variant='outlined' color='secondary' onClick={handleAddTodo}>
                Add
            </Button>
        </div>
    );
};

export default TodoForm;
