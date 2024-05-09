import React from 'react';
import { TodoFormProps } from '../utils/todoFormProps';

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, inputValue, setInputValue }) => {
    const handleAddTodo = () => {
        addTodo(inputValue);
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Enter todo title'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add</button>
        </div>
    );
};

export default TodoForm;
