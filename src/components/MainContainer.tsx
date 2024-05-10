import * as React from 'react';
import Container from '@mui/material/Container';
import TodoList from './TodoList';
import { SApp } from '../assets/styles/app.styles';

const MainContainer: React.FC = () => {
    return (
        <div>
            <SApp>
                <Container maxWidth='xl'>
                    <TodoList></TodoList>
                </Container>
            </SApp>
        </div>
    );
};

export default MainContainer;
