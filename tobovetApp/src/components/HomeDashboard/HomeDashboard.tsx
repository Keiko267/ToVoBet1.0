import { Typography, IconButton } from '@mui/material';
import { Today, Event, Receipt, Vaccines, Visibility, VisibilityOff } from '@mui/icons-material';
import './HomeDashboard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'reactstrap';

interface HomeDashboardProps {
  visitsToday: number;
  visitsFuture: number;
  paymentsPending: number;
  vaccinesPending: number;
  isTodayTableVisible: boolean;
  isFutureTableVisible: boolean;
  isPaymentsTableVisible: boolean;
  isVaccinationsTableVisible: boolean;
  setTodayTableVisibility: () => void;
  setFutureTableVisibility: () => void;
  setPaymentsTableVisibility: () => void;
  setVaccinationsTableVisibility: () => void;
}

export const HomeDashboard = ({
  visitsToday,
  visitsFuture,
  paymentsPending,
  vaccinesPending,
  isTodayTableVisible,
  isFutureTableVisible,
  isPaymentsTableVisible,
  isVaccinationsTableVisible,
  setTodayTableVisibility,
  setFutureTableVisibility,
  setPaymentsTableVisibility,
  setVaccinationsTableVisibility,

}: HomeDashboardProps) => {
  const sections = [
    {
      title: 'Citas de hoy',
      value: visitsToday,
      icon: <Today className='icon' />,
      href: '#today',
      isVisible: isTodayTableVisible,
      toggleVisibility: setTodayTableVisibility,
    },
    {
      title: 'Citas futuras',
      value: visitsFuture,
      icon: <Event className='icon' />,
      href: '#future',
      isVisible: isFutureTableVisible,
      toggleVisibility: setFutureTableVisibility,
    },
    {
      title: 'Facturas pendientes',
      value: paymentsPending,
      icon: <Receipt className='icon' />,
      href: '#payments',
      isVisible: isPaymentsTableVisible,
      toggleVisibility: setPaymentsTableVisibility,
    },
    {
      title: 'Vacunas sin cita',
      value: vaccinesPending,
      icon: <Vaccines className='icon' />,
      href: '#vaccinations',
      isVisible: isVaccinationsTableVisible,
      toggleVisibility: setVaccinationsTableVisibility,
    },
  ];
  return (
    <Container className='container home-dashboard mt-4'>
      <Row>
        {sections.map(({ title, value, icon, href, isVisible, toggleVisibility }, idx) => (
          <Col xs='6' sm='6' md='4' lg='3' className="mb-4" key={idx}>
            <a
              href={value > 0 ? href : undefined}
              className={`card p-3 text-center shadow-sm ${
                value > 0 ? 'clickable' : ''
              } ${!isVisible ? 'hidden' : ''}`}
              onClick={(e) => { if (value > 0) e.preventDefault(); }}
            >
              <div className='icon mb-2'>{icon}</div>
              <Typography className='title'>{title}</Typography>
              <Typography className='value'>{value}</Typography>
              {value > 0 && (
                <IconButton
                  className='visibility-icon'
                  onClick={(e) => { e.preventDefault(); toggleVisibility(); }}
                >
                  {isVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              )}
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
