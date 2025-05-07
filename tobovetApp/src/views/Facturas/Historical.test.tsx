// filepath: /c:/TOBOVETtest/tobovetApp/src/views/Facturas/Historical.test.tsx
import { render, screen } from '@testing-library/react';
import { Historical } from './Historical';
import { BrowserRouter } from 'react-router-dom';

test('renders Historical component', () => {
  render(
    <BrowserRouter>
      <Historical />
    </BrowserRouter>
  );
  expect(screen.getByText('Cliente')).toBeInTheDocument();
  expect(screen.getByText('Mascota')).toBeInTheDocument();
  expect(screen.getByText('Total')).toBeInTheDocument();
});
