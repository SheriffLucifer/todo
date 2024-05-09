export interface TodoFormProps {
    addTodo: (title: string) => void;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}
