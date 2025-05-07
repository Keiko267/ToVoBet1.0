import {
	Navbar as BootstrapNavbar,
	Nav,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	NavItem,
	NavLink,
} from 'reactstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/logoNoBgWhite.png';
import { Typography } from '@mui/material';
import './Navbar.scss';

interface NavbarProps {
	pages: string[];
}

export const Navbar = ({ pages }: NavbarProps) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	//const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

	/* const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	}; */

	/* useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]); */

	return (
		<BootstrapNavbar
			expand='md'
			onBlur={() => {
				setIsOpen(false);
			}}
		>
			<NavbarBrand href='/inicio'>
				<img className='logo' src={logo} alt='logo' />
			</NavbarBrand>
			<NavbarToggler onClick={() => setIsOpen(!isOpen)} />
			<Collapse isOpen={isOpen} navbar>
				<Nav navbar>
					{pages.map(page => (
						<NavItem key={page} className=''>
							<NavLink onClick={() => navigate(`/${page}`)}>
								<Typography variant='body1'>{page}</Typography>
							</NavLink>
						</NavItem>
					))}
				</Nav>
			</Collapse>
			{/* <div className='theme-toggle'>
				<span>{theme === 'light' ? '🌞' : '🌜'}</span>
				<label className='switch'>
					<input type='checkbox' onChange={toggleTheme} checked={theme === 'dark'} />
					<span className='slider'></span>
				</label>
			</div> */}
		</BootstrapNavbar>
	);
};
