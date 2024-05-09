import React from 'react';
import { TaskCounterProps } from '../utils/taskCounterProps';

const TaskCounter: React.FC<TaskCounterProps> = ({ count }) => {
    return (
        <div>
            <p>Total Tasks: {count}</p>
        </div>
    );
};

export default TaskCounter;
