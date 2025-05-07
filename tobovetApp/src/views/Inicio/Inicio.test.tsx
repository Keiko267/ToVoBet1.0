import { render, screen } from '@testing-library/react';
import {Inicio} from './Inicio';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

test('renders Inicio component', () => {
    render(
        <BrowserRouter>
        <Inicio />
        </BrowserRouter>
    );
    expect(screen.getByText('Hora')).toBeInTheDocument();
    expect(screen.getByText('Cliente')).toBeInTheDocument();
    expect(screen.getByText('Mascota')).toBeInTheDocument();
});