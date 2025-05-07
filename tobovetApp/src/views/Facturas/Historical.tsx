import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import {
	DeleteOutlined,
	VisibilityOutlined,
	PhoneAndroidOutlined,
	AccountBalanceOutlined,
	CreditCardOutlined,
	PaymentsOutlined,
	FeedOutlined,
	EditOutlined,
	TaskAlt,
} from '@mui/icons-material';
import { IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { Table, DeleteModal, EditVisitModal } from 'components';
import { deleteToApi, fetchApi, putToApi } from 'controllers/Controller';
import { IClient, ICompany, IPaymentType, IVaccine, IVisit } from 'interfaces';
import './Historical.scss';

export interface IFactura {
	id: number;
	clientId?: number;
	client: string;
	petId: number;
	pet?: string;
	companyId: number;
	company: string;
	date: Date;
	pending: number;
	type: IPaymentType;
	total: number;
	number?: number;
}
export const Historical = () => {
	const navigate = useNavigate();
	const colsPayments = [
		{ field: 'id', headerName: '#', width: 50 },
		{ field: 'number', headerName: 'Código', width: 70 },
		{
			field: 'client',
			headerName: 'Cliente',
			width: 272,
			renderCell: ({ row }: GridRenderCellParams) => row.client ?? row.company,
		},
		{
			field: 'pet',
			headerName: 'Mascota',
			width: 120,
		},
		{
			field: 'total',
			headerName: 'Total',
			width: 90,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<>
						{row.total}
						<InputAdornment position='end'>€</InputAdornment>
					</>
				);
			},
		},
		{
			field: 'date',
			headerName: 'Fecha',
			width: 160,
			renderCell: ({ row }: GridRenderCellParams) => row.date.toLocaleString('es').replace(',', ''),
		},
		{
			field: 'type',
			headerName: 'Método de pago',
			width: 130,
			//If the payment is made with a card, show the icon of a card, if its by a transfer, show the icon of a bank account, if its by cash, show the icon of a wallet and if its by phone, show the icon of a phone
			//When the mouse is over the icon, show the name of the payment method
			renderCell: ({ row }: GridRenderCellParams) => {
				switch (row.type) {
					case 'Tarjeta':
						return (
							<Tooltip title='Tarjeta'>
								<CreditCardOutlined color='primary' />
							</Tooltip>
						);
					case 'Transferencia':
						return (
							<Tooltip title='Transferencia'>
								<AccountBalanceOutlined color='primary' />
							</Tooltip>
						);
					case 'Efectivo':
						return (
							<Tooltip title='Efectivo'>
								<PaymentsOutlined color='primary' />
							</Tooltip>
						);
					case 'Bizum':
						return (
							<Tooltip title='Bizum'>
								<PhoneAndroidOutlined color='primary' />
							</Tooltip>
						);
				}
			},
		},
		{
			field: 'acciones',
			headerName: 'Acciones',
			width: 150,
			sortable: false,
			filterable: false,
			renderCell: ({ row }: GridRenderCellParams) => (
				<div className='actions-column'>
					<Tooltip title='Borrar'>
						<IconButton onClick={() => handleDeleteFactura(row)}>
							<DeleteOutlined color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Ver resumen'>
						<IconButton
							onClick={() =>
								navigate('/Factura', {
									state: {
										id: row.id,
										pet: clients
											.find(({ id }) => id === row.clientId)
											?.pets.find(({ id }) => id === row.petId),
										client: clients.find(({ id }) => id === row.clientId),
										company: companies.find(({ id }) => id === row.companyId),
										date: row.date,
										viewOnly: true,
									},
								})
							}
						>
							<VisibilityOutlined color='primary' />
						</IconButton>
					</Tooltip>
				</div>
			),
		},
	];

	const colsHistorical = [
		{ field: 'petId', headerName: 'NHC', width: 90 },
		{ field: 'client', headerName: 'Cliente', width: 272 },
		{ field: 'pet', headerName: 'Mascota', width: 120 },
		{
			field: 'date',
			headerName: 'Fecha',
			width: 160,
			renderCell: ({ row }: GridRenderCellParams) => row.date.toLocaleString('es').replace(',', ''),
		},
		{ field: 'species', headerName: 'Especie', width: 120 },
		{ field: 'visitReason', headerName: 'Motivo de Consulta', width: 230 },
		{ field: 'chip', headerName: 'Chip', width: 150 },
		{
			field: 'completed',
			headerName: 'Acciones',
			width: 180,
			filterable: false,
			renderCell: ({ row }: GridRenderCellParams) => (
				<div className='actions-column'>
					<Tooltip title='Historial'>
						<IconButton onClick={() => handleHistorial(row)}>
							<FeedOutlined color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Editar'>
						<IconButton onClick={() => handleEditCita(row)}>
							<EditOutlined color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Borrar'>
						<IconButton onClick={() => handleDeleteCita(row)}>
							<DeleteOutlined color='primary' />
						</IconButton>
					</Tooltip>
					{row.completed === 0 && (
						<Tooltip title='Completar'>
							<IconButton onClick={() => handleCompleteCita(row)}>
								<TaskAlt color='primary' />
							</IconButton>
						</Tooltip>
					)}
				</div>
			),
		},
	];

	const initialCita: IVisit = {
		id: -1,
		clientId: -1,
		client: '',
		petId: -1,
		pet: '',
		vetId: 0,
		vet: '',
		date: new Date(),
		breed: '',
		species: '',
		chip: 0,
		visitReason: '',
		observations: '',
		weight: 0,
		condition: 0,
		temperature: 0,
		symptoms: '',
		tests: '',
		diagnostics: '',
		treatment: '',
		vaccines: [],
		deworm: '',
		recommendations: '',
		completed: 0,
	};

	const [rowsPayments, setRowsPayments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedPayment, setSelectedPayment] = useState(0);
	const [deleteConfirmationOpenPayments, setDeleteConfirmationPayments] = useState(false);
	const [clients, setClients] = useState<IClient[]>([]);
	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [formOpen, setFormOpen] = useState(false);
	const [rowsHistorical, setRowsHistorical] = useState<IVisit[]>([]);
	const [formSubmitLabel, setFormSubmitLabel] = useState<'Guardar' | 'Borrar'>('Guardar');
	const [formData, setFormData] = useState<IVisit>({
		...initialCita,
		client: '',
		pet: '',
	});
	const [deleteConfirmationOpenHistorical, setDeleteConfirmationHistorical] = useState(false);
	const [vaccineOptions, setVaccineOptions] = useState<IVaccine[]>([]);

	const handleDeleteFactura = (row: IFactura) => {
		setSelectedPayment(row.id);
		setDeleteConfirmationPayments(true);
	};

	const handleSubmitDelete = async () => {
		setLoading(true);
		const dataFactura: boolean = await deleteToApi('payments', { id: selectedPayment });
		if (!dataFactura) console.error('Error al borrar la factura');
		getPayments();
		setDeleteConfirmationPayments(false);
	};

	const handleHistorial = (row: IVisit) => {
		const currClient = clients.find(({ id }) => id === row.clientId);
		let petPos = currClient?.pets.findIndex(({ id }) => id === row.id);
		if (petPos === -1) petPos = 0;
		navigate('/HistorialCliente', {
			state: { id: row.id, client: currClient, petPos:petPos },
		});
	};

	const handleEditCita = (row: IVisit) => {
		setFormData(row);
		setFormSubmitLabel('Guardar');
		setFormOpen(true);
	};

	const handleDeleteCita = (row: IVisit) => {
		setFormData(row);
		setFormSubmitLabel('Borrar');
		setDeleteConfirmationHistorical(true);
	};

	const handleCompleteCita = async (row: IVisit) => {
		setLoading(true);
		const dataCita: boolean = await putToApi('visits/complete', { id: row.id });
		if (!dataCita) console.error('Error al completar la cita');
		getCitas();
	};

	const handleSubmitCita = () => {
		switch (formSubmitLabel) {
			case 'Guardar':
				updateCita();
				setFormOpen(false);
				break;
			case 'Borrar':
				deleteCita();
				setDeleteConfirmationHistorical(false);
				break;
		}
	};

	const updateCita = async () => {
		setLoading(true);
		const dataCita: boolean = await putToApi('visits', formData);
		if (!dataCita) console.error('Error guardando cita');
		getCitas();
	};

	const deleteCita = async () => {
		setLoading(true);
		const dataCita: boolean = await deleteToApi('visits', { id: formData.id });
		if (!dataCita) console.error('Error borrando cita');
		getCitas();
	};

	const handleFormChange = (key: string, newVal: never) => {
		const tempData = { ...formData };
		if (!['vaccinesPeriod', 'vaccines'].includes(key)) tempData[key as keyof IVisit] = newVal;
		else if (tempData.vaccines) {
			if (key === 'vaccinesPeriod') tempData.vaccines[newVal[0]].validity = newVal[1];
			else if (key === 'vaccines') {
				tempData.vaccines = (newVal as number[]).map(newId =>
					vaccineOptions.find(({ id }) => id === newId),
				) as IVaccine[];
				const newVac = vaccineOptions.find(({ id }) => id === newVal);
				if (newVac) tempData.vaccines = [...tempData.vaccines, newVac];
			}
		}
		setFormData(tempData);
	};

	const getPayments = async () => {
		const dataPayments = await fetchApi('payments/completed');
		if (dataPayments)
			setRowsPayments(
				dataPayments.map((row: IFactura) => ({
					...row,
					pending: row.pending === 0 ? 'No' : 'Si',
					date: new Date(row.date),
				})),
			);

		setLoading(false);
	};

	const getCitas = async () => {
		const dataHistorical: IVisit[] = await fetchApi('visits/historical');
		if (dataHistorical)
			setRowsHistorical(dataHistorical.map(row => ({ ...row, date: new Date(row.date) })));
		setLoading(false);
	};

	const getClients = async () => {
		const dataClientes: IClient[] = await fetchApi('clients/pets/contacts');
		if (dataClientes)
			setClients(
				dataClientes.map(cliente => ({
					...cliente,
					pets: cliente.pets.map(pet => ({ ...pet, birthdate: new Date(pet.birthdate || '') })),
				})),
			);
	};
	const getCompanies = async () => {
		const dataCompanies: ICompany[] = await fetchApi('companies');
		if (dataCompanies) setCompanies(dataCompanies);
	};

	const getVaccines = async () => {
		const dataVaccines: IVaccine[] = await fetchApi('articles/vaccines');
		if (dataVaccines) setVaccineOptions(dataVaccines);
	};

	useEffect(() => {
		getPayments();
		getCitas();
		getClients();
		getCompanies();
		getVaccines();
		const interval = setInterval(() => getCitas(), 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Container className='content historical'>
			<Row>
				<Col>
					<Card>
						<CardBody>
							<Typography variant='h4'>Facturas</Typography>
							<Table rows={rowsPayments} cols={colsPayments} loading={loading} />
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Card>
						<CardBody>
							<Typography variant='h4'>Historial de visitas</Typography>
							<Table rows={rowsHistorical} cols={colsHistorical} loading={loading} />
						</CardBody>
					</Card>
				</Col>
			</Row>
			<EditVisitModal
				formData={formData}
				formOpen={formOpen}
				formSubmitLabel={formSubmitLabel}
				vaccineOptions={vaccineOptions}
				setFormOpen={setFormOpen}
				handleSubmitCita={handleSubmitCita}
				handleFormChange={handleFormChange}
			/>
			<DeleteModal
				title='Factura'
				visible={deleteConfirmationOpenPayments}
				submitLabel={'Borrar'}
				info='esta factura'
				onSubmit={handleSubmitDelete}
				onClose={() => setDeleteConfirmationPayments(false)}
			/>
			<DeleteModal
				title='Cita'
				visible={deleteConfirmationOpenHistorical}
				submitLabel={formSubmitLabel}
				info='esta cita'
				onSubmit={handleSubmitCita}
				onClose={() => setDeleteConfirmationHistorical(false)}
			/>
		</Container>
	);
};
