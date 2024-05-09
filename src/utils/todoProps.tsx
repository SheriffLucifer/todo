import { ToDo } from './todo.model';

export interface TodoProps {
    todos: ToDo[];
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
}
