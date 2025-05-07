import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import {
	AccountBalanceOutlined,
	AddCard,
	CreditCardOutlined,
	DeleteOutlined,
	EditOutlined,
	FeedOutlined,
	PaymentsOutlined,
	PhoneAndroidOutlined,
	TaskAlt,
} from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { Button, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import { CreateVisitButton, DeleteModal, EditVisitModal, HomeDashboard, Table } from 'components';
import { deleteToApi, fetchApi, putToApi } from 'controllers/Controller';
import { IClient, IVaccine, IVisit, IVisitVaccine, IPayment } from 'interfaces';
import './Inicio.scss';

export const Inicio = () => {
	const navigate = useNavigate();

	const colsToday = [
		{
			field: 'date',
			headerName: 'Hora',
			width: 100,
			renderCell: ({ row }: GridRenderCellParams) => row.date.toLocaleString('es').split(', ')[1],
		},
		{ field: 'client', headerName: 'Cliente', width: 272 },
		{ field: 'pet', headerName: 'Mascota', width: 130 },
		{ field: 'visitReason', headerName: 'Motivo de Consulta', width: 230 },
		{ field: 'vet', headerName: 'Veterinario', width: 150 },
		{ field: 'observations', headerName: 'Obeservaciones', width: 180 },
		{
			field: 'acciones',
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
	const colsFuture = [
		{
			field: 'date',
			headerName: 'Fecha',
			width: 160,
			renderCell: ({ row }: GridRenderCellParams) => row.date.toLocaleString('es').replace(',', ''),
		},
		{ field: 'client', headerName: 'Cliente', width: 272 },
		{ field: 'pet', headerName: 'Mascota', width: 130 },
		{ field: 'visitReason', headerName: 'Motivo de Consulta', width: 230 },
		{ field: 'vet', headerName: 'Veterinario', width: 150 },
		{
			field: 'acciones',
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

	const colPayments = [
		{ field: 'id', headerName: 'Nº', width: 120 },
		{
			field: 'date',
			headerName: 'Fecha',
			width: 160,
			renderCell: ({ row }: GridRenderCellParams) => row.date.toLocaleString('es').replace(',', ''),
		},
		{
			field: 'client',
			headerName: 'Cliente',
			width: 272,
			renderCell: ({ row }: GridRenderCellParams) => row.client.client,
		},
		{
			field: 'pet',
			headerName: 'Mascota',
			width: 200,
			renderCell: ({ row }: GridRenderCellParams) => row.pet.pet,
		},
		{
			field: 'total',
			headerName: 'Total',
			width: 110,
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
			field: 'type',
			headerName: 'Método de pago',
			width: 130,
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
						<IconButton onClick={() => handleDeletePayment(row)}>
							<DeleteOutlined color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Continuar Factura'>
						<IconButton
							onClick={() =>
								navigate('/Factura', {
									state: {
										id: row.id,
										pet: row.pet,
										client: row.client,
									},
								})
							}
						>
							<AddCard color='primary' />
						</IconButton>
					</Tooltip>
				</div>
			),
		},
	];

	const colVaccinations = [
		{
			field: 'date',
			headerName: 'Próxima Expireción',
			width: 160,
			renderCell: ({ row }: GridRenderCellParams) =>
				row.nextExpirationDate.toLocaleString('es').replace(',', ''),
		},
		{ field: 'clientName', headerName: 'Cliente', width: 272 },
		{ field: 'petName', headerName: 'Mascota', width: 130 },
		{ field: 'article', headerName: 'Vacuna', width: 230 },
		{
			field: 'vaccinationDate',
			headerName: 'Día de Vacunación',
			width: 150,
			renderCell: ({ row }: GridRenderCellParams) =>
				row.vaccinationDate.toLocaleString('es').replace(',', ''),
		},
		{
			field: 'acciones',
			headerName: 'Acciones',
			width: 180,
			sortable: false,
			filterable: false,
			renderCell: ({ row }: GridRenderCellParams) => (
				<CreateVisitButton
					row={row}
					isFromVaccination={true}
					vaccineOptions={vaccineOptions}
					vaccines={handleGetVaccines(row.petId)}
					getVisits={async () => {
						getVaccineVisits();
						getCitas();
					}}
				/>
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

	const [formOpen, setFormOpen] = useState(false);
	const [formData, setFormData] = useState<IVisit>({
		...initialCita,
		client: '',
		pet: '',
	});
	const [formSubmitLabel, setFormSubmitLabel] = useState<'Guardar' | 'Borrar'>('Guardar');
	const [deleteConfirmationOpen, setDeleteConfirmation] = useState(false);
	const [rowsToday, setRowsToday] = useState<IVisit[]>([]);
	const [rowsFuture, setRowsFuture] = useState<IVisit[]>([]);
	const [rowsPayments, setRowsPayments] = useState([]);
	const [rowsVaccination, setrowsVaccination] = useState<IVisitVaccine[]>([]);
	const [vaccineOptions, setVaccineOptions] = useState<IVaccine[]>([]);
	const [clients, setClients] = useState<IClient[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedPayment, setSelectedPayment] = useState(0);
	const [deleteConfirmationOpenPayments, setDeleteConfirmationPayments] = useState(false);

	const [isTodayTableVisible, setTodayTableVisibility] = useState(true);
	const [isFutureTableVisible, setFutureTableVisibility] = useState(true);
	const [showMoreFuture, setShowMoreFuture] = useState(false);
	const [isPaymentsTableVisible, setPaymentsTableVisibility] = useState(true);
	const [isVaccinationsTableVisible, setVaccinationsTableVisibility] = useState(true);

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
		setDeleteConfirmation(true);
	};

	const handleCompleteCita = async (row: IVisit) => {
		setLoading(true);
		const dataCita: boolean = await putToApi('visits/complete', { id: row.id });
		if (!dataCita) console.error('Error completando cita');
		getCitas();
		getVaccineVisits();
	};
	const handleSubmitCita = () => {
		switch (formSubmitLabel) {
			case 'Guardar':
				updateCita();
				setFormOpen(false);
				break;
			case 'Borrar':
				deleteCita();
				setDeleteConfirmation(false);
				break;
		}
		getVaccineVisits();
	};

	const handleDeletePayment = (row: IPayment) => {
		setSelectedPayment(row.id);
		setDeleteConfirmationPayments(true);
	};

	const handleSubmitDelete = async () => {
		setLoading(true);
		const dataPayment: boolean = await deleteToApi('payments', { id: selectedPayment });
		if (!dataPayment) console.error('Error al borrar la factura');
		getPayments();
		setDeleteConfirmationPayments(false);
	};

	const handleGetVaccines = (petId: number) => {
		const vaccines = rowsVaccination.filter(row => row.petId === petId);
		return vaccines;
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

	const getCitas = async () => {
		const dataToday: IVisit[] = await fetchApi('visits/today');
		if (dataToday) setRowsToday(dataToday.map(row => ({ ...row, date: new Date(row.date) })));

		const dataFuture: IVisit[] = await fetchApi('visits/future');
		if (dataFuture) setRowsFuture(dataFuture.map(row => ({ ...row, date: new Date(row.date) })));

		setLoading(false);
	};

	const getVaccines = async () => {
		const dataVaccines: IVaccine[] = await fetchApi('articles/vaccines');
		if (dataVaccines) setVaccineOptions(dataVaccines);
	};

	const getVaccineVisits = async () => {
		const dataVaccinations: IVisitVaccine[] = await fetchApi('vaccinations');
		if (dataVaccinations)
			setrowsVaccination(
				dataVaccinations.map(row => ({
					...row,
					vaccinationDate: new Date(row.vaccinationDate),
					nextExpirationDate: new Date(row.nextExpirationDate),
				})),
			);
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

	const getPayments = async () => {
		const dataPayments = await fetchApi('payments/pending');
		if (dataPayments)
			setRowsPayments(
				dataPayments.map((row: IPayment) => ({
					...row,
					date: new Date(row.date),
				})),
			);
		setLoading(false);
	};

	const toggleTableVisibility = (table: string) => {
		switch (table) {
			case 'today':
				setTodayTableVisibility(!isTodayTableVisible);
				break;
			case 'future':
				setFutureTableVisibility(!isFutureTableVisible);
				break;
			case 'payments':
				setPaymentsTableVisibility(!isPaymentsTableVisible);
				break;
			case 'vaccinations':
				setVaccinationsTableVisibility(!isVaccinationsTableVisible);
				break;
		}
	};

	useEffect(() => {
		getCitas();
		getVaccines();
		getVaccineVisits();
		getClients();
		getPayments();
		const interval = setInterval(() => getCitas(), 5000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (location.hash) {
			const id = location.hash.replace('#', '');
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, []);

	return (
		<Container className='inicio'>
			<HomeDashboard
				visitsToday={rowsToday.length ?? 0}
				visitsFuture={rowsFuture.length ?? 0}
				paymentsPending={rowsPayments.length ?? 0}
				vaccinesPending={rowsVaccination.length ?? 0}
				isTodayTableVisible={isTodayTableVisible}
				isFutureTableVisible={isFutureTableVisible}
				isPaymentsTableVisible={isPaymentsTableVisible}
				isVaccinationsTableVisible={isVaccinationsTableVisible}
				setTodayTableVisibility={() => toggleTableVisibility('today')}
				setFutureTableVisibility={() => toggleTableVisibility('future')}
				setPaymentsTableVisibility={() => toggleTableVisibility('payments')}
				setVaccinationsTableVisibility={() => toggleTableVisibility('vaccinations')}
			/>
			{isTodayTableVisible && rowsToday.length > 0 && (
				<Row>
					<Col>
						<Card id='today'>
							<CardBody>
								<Typography className='table-title p-1' variant='h4'>
									Citas de hoy
								</Typography>
								<Table rows={rowsToday} cols={colsToday} loading={loading} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
			{isFutureTableVisible && rowsFuture.length > 0 && (
				<Row>
					<Col>
						<Card id='future'>
							<CardBody>
								<Row className='header'>
									<Col>
										<Typography className='table-title p-1' variant='h4'>
											Citas Futuras
										</Typography>
									</Col>
									<Col>
										<Button
											variant='contained'
											onClick={() => setShowMoreFuture(prev => !prev)}
										>{`Mostrar ${showMoreFuture ? 'Menos' : 'Más'}`}</Button>
									</Col>
								</Row>
								<Table
									rows={
										showMoreFuture
											? rowsFuture
											: rowsFuture.filter(({ date }) => {
													const dateLimit = new Date();
													dateLimit.setMonth(dateLimit.getMonth() + 3);
													return date <= dateLimit;
												})
									}
									cols={colsFuture}
									loading={loading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
			{isPaymentsTableVisible && rowsPayments.length > 0 && (
				<Row>
					<Col>
						<Card id='payments'>
							<CardBody>
								<Typography className='table-title p-1' variant='h4'>
									Facturas Pendientes
								</Typography>
								<Table rows={rowsPayments} cols={colPayments} loading={loading} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
			{isVaccinationsTableVisible && rowsVaccination.length > 0 && (
				<Row>
					<Col>
						<Card id='vaccinations'>
							<CardBody>
								<Typography className='table-title p-1' variant='h4'>
									Próximas Vacunaciones
								</Typography>
								<Table rows={rowsVaccination} cols={colVaccinations} loading={loading} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}

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
				title='Cita'
				visible={deleteConfirmationOpen}
				submitLabel={formSubmitLabel}
				info='esta cita'
				onSubmit={handleSubmitCita}
				onClose={() => setDeleteConfirmation(false)}
			/>
			<DeleteModal
				title='Factura'
				visible={deleteConfirmationOpenPayments}
				submitLabel={'Borrar'}
				info='esta factura'
				onSubmit={handleSubmitDelete}
				onClose={() => setDeleteConfirmationPayments(false)}
			/>
		</Container>
	);
};
