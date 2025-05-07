import { Route, Routes } from 'react-router-dom';
import { Navbar } from 'components';
import { Articulos, Clientes, Factura, Historical, ClientHistorical, Inicio } from 'views';
//import { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';

export const Layout = () => {
	const pages: { [key: string]: JSX.Element } = {
		Inicio: <Inicio />,
		Clientes: <Clientes />,
		Historial: <Historical />,
		Articulos: <Articulos />,
	};
	//const navigate = useNavigate();
/* 	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) navigate('/login');
	}, [navigate]); */

	return (
		<div className='layout'>
			<Navbar pages={Object.keys(pages)} />
			<Routes>
				{Object.keys(pages).map(key => (
					<Route key={key} path={`/${key}`} element={pages[key]} />
				))}
				<Route path={'/HistorialCliente'} element={<ClientHistorical />} />
				<Route path={'/Factura'} element={<Factura />} />
				<Route path={'/'} element={<Inicio />} />
			</Routes>
		</div>
	);
};
