import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import { Layout } from './components';
import './index.scss';
import { InicioSesion } from '../src/views/InicioSesion/InicioSesion'

const theme = createTheme({
	palette: {
		primary: {
			main: '#4d5e3e',
		},
		secondary: {
			main: '#ffd4d4',
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
			<div className='vet-app'>
				<BrowserRouter>
					<Routes>
						<Route path='/*' element={<Layout />} />
						<Route path='*' element={<Layout />} />
						<Route path='/login' element={<InicioSesion/>}/>
					</Routes>
				</BrowserRouter>
			</div>
		</LocalizationProvider>
	</ThemeProvider>,
);

