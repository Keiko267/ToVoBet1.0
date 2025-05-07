// filepath: /c:/TOBOVETtest/tobovetApp/src/components/HomeDashboard/HomeDashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { HomeDashboard } from './HomeDashboard';

test('renders HomeDashboard component', () => {
  render(
    <HomeDashboard
      visitsToday={5}
      visitsFuture={10}
      paymentsPending={3}
      vaccinesPending={2}
      isTodayTableVisible={true}
      isFutureTableVisible={true}
      isPaymentsTableVisible={true}
      isVaccinationsTableVisible={true}
      setTodayTableVisibility={() => {}}
      setFutureTableVisibility={() => {}}
      setPaymentsTableVisibility={() => {}}
      setVaccinationsTableVisibility={() => {}}
    />
  );
  expect(screen.getByText('Citas de hoy')).toBeInTheDocument();
  expect(screen.getByText('Citas futuras')).toBeInTheDocument();
  expect(screen.getByText('Facturas pendientes')).toBeInTheDocument();
  expect(screen.getByText('Vacunas sin cita')).toBeInTheDocument();
});