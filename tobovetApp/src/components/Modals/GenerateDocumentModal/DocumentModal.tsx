import { useEffect, useState } from 'react';
import { Button, Card, Modal, Typography } from '@mui/material';
import { PDFMaker } from 'components/PDFMaker/PDFMaker';
import { fetchApi } from 'controllers/Controller';
import { IClient, IPet, IUser } from 'interfaces';
import { DocGenType, IDocGen } from './GenerateDocumentModal';
import logo from 'assets/logoNoBgCaqui.png';
import { Col, Row } from 'reactstrap';

interface DocumentModalProps {
	client: IClient;
	pet: IPet;
	data: IDocGen;
	type: DocGenType;
	isVisible: boolean;
	setInvisible: () => void;
}

const DocumentModal = ({
	client,
	pet,
	data,
	type,
	isVisible,
	setInvisible,
}: DocumentModalProps) => {
	const [vet, setVet] = useState<IUser>();

	const options = {
		'': {
			title: '',
			content: <></>,
		},
		declinedTests: {
			title: 'Formulario de declinacion de pruebas diagnósticas',
			content: (
				<>
					<Typography variant='body1'>
						Declino la realización de pruebas diagnósticas o de control que fuesen necesarias o
						propuestas por el equipo veterinario, declaro haber sido informado de la importancia de
						la realización de las mismas y lo hago bajo mi completa responsabilidad.
					</Typography>
					<Typography variant='body1'>Dichas pruebas son:</Typography>
					<ul className='tests-list'>
						{data?.declinedTests?.split('\n').map((row, idx) => (
							<li key={idx}>
								<Typography variant='body1'>{row}</Typography>
							</li>
						))}
					</ul>
				</>
			),
		},
		authorizeEuthanasia: {
			title: 'Formulario de autorización de eutanasia',
			content: (
				<>
					<Typography variant='body1'>
						Y Autoriza a <b>D. {vet?.fullName}</b>, veterinario colegiado en el Ilustre Colegio
						Oficial de Veterinarios, con el número <b>{vet?.id}</b> para que, según lo establecido
						en el artículo 1255 del Código Civil, para que proceda a la EUTANASIA humanitaria del
						animal descrito anteriormente, así como a su necropsia si se considerase necesaria,
						afirmando que dicho animal no ha mordido a nadie durante los últimos 15 días, asumiendo
						el tratamiento veterinario que de acuerdo con su criterio profesional, se estime llevar
						a cabo.
					</Typography>
					<Typography variant='body1'>
						Asimismo, mediante el presente documento, se responsabiliza de todos aquellos gastos y
						honorarios que puedan originar las actuaciones que lleve a cabo dicho profesional.
					</Typography>
				</>
			),
		},
		corpseCustody: {
			title: 'Formulario de custodia de cadaver',
			content: (
				<>
					<Typography variant='body1'>Mediante el siguiente documento EXPONE:</Typography>
					<br />
					<Typography variant='body1'>
						Que tras el fallecimiento de {pet.pet} se le ha informado de la obligación de incinerar
						el cadaver, siendo su decisión tomar la responsabilidad de ello.
					</Typography>
					<br />
					<Typography variant='body1'>
						Así mismo exime a Tobovet de cualquier responsabilidad a consecuencia de su decisión.
					</Typography>
					<br />
				</>
			),
		},
		debtRecognition: {
			title: 'Formulario de reconocimiento de deuda',
			content: (
				<>
					Y manifiesta que se ha generado un servicio profesional prestado a dicha mascota, y que ha
					consistido en:
					<br />
					<br />
					<div style={{ marginLeft: '50px' }}>
						<Row>
							<Col>Articulo</Col>
							<Col>Precio</Col>
						</Row>
						{data.items?.split('\n').map((row, rIdx) => (
							<Row key={rIdx}>
								{row.split(' - ').map((col, cIdx) => (
									<Col key={cIdx}>{col}</Col>
								))}
							</Row>
						))}
					</div>
					<br />
					Y por tanto, se ha generado una deuda a favor del Tobovet S.L. equivalente a:
					<br />
					<br />
					<div style={{ marginLeft: '50px' }}>{data.total} €</div>
					<br />
					Asimismo, el cliente se compromete al pago de esta deuda en{' '}
					{data.nOfPayments === 1 ? (
						`un solo pago en efectivo por la totalidad de la deuda en la fecha: ${data.payments[0].date.toLocaleDateString('es')}`
					) : (
						<>
							varios pagos en efectivo en las diferentes fechas:
							<br />
							<br />
							<div style={{ marginLeft: '50px' }}>
								<Row>
									<Col>Cantidad</Col>
									<Col>Fecha</Col>
								</Row>
								{data.payments.map(({ date, amount }, idx) => (
									<Row key={idx}>
										<Col>{amount} €</Col>
										<Col>{date.toLocaleDateString('es')}</Col>
									</Row>
								))}
							</div>
						</>
					)}
				</>
			),
		},
	};

	const handlePrintDocSubmit = () => {
		PDFMaker('document-to-print-content');
		setInvisible();
	};

	const getVets = async () => {
		const res = await fetchApi('users', { id: pet.vet });
		setVet(res);
	};

	useEffect(() => {
		getVets();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Modal open={isVisible} onClose={() => setInvisible()}>
			<Card className='document-to-print-container'>
				<div id='document-to-print-content'>
					<div className='header'>
						<img className='logo' src={logo} />
						<div className='company-info'>
							<Typography variant='h5'>TOBOVET</Typography>
							<Typography variant='body2'>B16393159</Typography>
							<Typography variant='body2'>637 172 558</Typography>
							<Typography variant='body2'>Calle María Antonia Jesús Tirado 9 C,</Typography>
							<Typography variant='body2'>Jerez,</Typography>
							<Typography variant='body2'>España</Typography>
						</div>
					</div>
					<Typography className='title' variant='h4'>
						{options[type].title}
					</Typography>
					<Typography variant='body1'>
						D/Dª <b>{client.client}</b> con DNI <b>{client.document}</b> afirma que es el
						propietario del animal que se describe a continuación:
					</Typography>
					<div className='pet-description'>
						<Typography variant='body1'>
							Nombre: <b>{pet.pet}</b>
						</Typography>
						<Typography variant='body1'>
							Especie: <b>{pet.species}</b>
						</Typography>
						<Typography variant='body1'>
							Raza: <b>{pet.breed}</b>
						</Typography>
						<Typography variant='body1'>
							Microchip: <b>{pet.chip}</b>
						</Typography>
					</div>
					{options[type].content}
					<Typography className='date' variant='body1'>
						Firmado a {new Date().toLocaleDateString('es')}
					</Typography>
					<div className='signatures'>
						<Typography variant='body1'>Cliente</Typography>
						<Typography variant='body1'>Veterinario</Typography>
					</div>
					<div className='button-group' data-html2canvas-ignore>
						<Button variant='contained' onClick={handlePrintDocSubmit}>
							Imprimir
						</Button>
						<Button variant='outlined' onClick={() => setInvisible()}>
							Cancelar
						</Button>
					</div>
				</div>
			</Card>
		</Modal>
	);
};

export default DocumentModal;
