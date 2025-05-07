import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Container, CardBody, Input } from 'reactstrap';
import {
	Autocomplete,
	ButtonGroup,
	IconButton,
	InputAdornment,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import {
	AddOutlined,
	DeleteOutlined,
	ReceiptLongOutlined,
	RemoveOutlined,
	SaveOutlined,
} from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { deleteToApi, fetchApi, postToApi, putToApi } from 'controllers/Controller';
import { DeleteModal, PDFMaker, PaymentModal, Table } from 'components';
import {
	IArticle,
	IClient,
	ICompany,
	IPaymentArticle,
	IPaymentArticles,
	IPaymentType,
	IPet,
} from 'interfaces';
import './Factura.scss';
import dayjs from 'dayjs';

export const Factura = () => {
	const navigate = useNavigate();
	const {
		state: { id, pet, client, company, date, viewOnly },
	}: {
		state: {
			id: number;
			pet: IPet;
			client: IClient;
			company: ICompany;
			date: Date;
			viewOnly?: boolean;
		};
	} = useLocation();

	const cols = [
		{ field: 'articleId', headerName: 'Id', width: 70 },
		{ field: 'name', headerName: 'Nombre', width: 320 },
		{ field: 'group', headerName: 'Grupo', width: 150 },
		{
			field: 'unitPrice',
			headerName: 'Precio ud.',
			width: 110,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<>
						{Math.round((row.pvp / 1.21) * 100) / 100}
						<InputAdornment position='end'>€</InputAdornment>
					</>
				);
			},
		},
		{
			field: 'quantity',
			headerName: 'Uds.',
			width: 120,
			renderCell: ({ row }: GridRenderCellParams) => {
				/* const article = articles.find(article => article.id === row.articleId); */
				const handleIncreaseQuantity = () => {
					/* 					const article = articles.find(article => article.id === row.articleId);
					if (article && row.quantity + 1 > (article.stock ?? 0)) {
						alert('No hay suficiente stock');
						return;
					} */
					updateField(row.id, 'quantity', row.quantity + 1);
				};
				return (
					<>
						{!viewOnly && (
							<Tooltip title='Restar'>
								<IconButton onClick={() => updateField(row.id, 'quantity', row.quantity - 1)}>
									<RemoveOutlined color='primary' />
								</IconButton>
							</Tooltip>
						)}
						{row.quantity}
						{!viewOnly && (
							<Tooltip title='Sumar'>
								<IconButton
									/* disabled={article && row.quantity +1 > (article.stock ?? 0)} */ onClick={
										handleIncreaseQuantity
									}
								>
									<AddOutlined color='primary' />
								</IconButton>
							</Tooltip>
						)}
					</>
				);
			},
		},
		{
			field: 'tax',
			headerName: 'IVA',
			width: 100,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<TextField
						disabled={viewOnly}
						value={row.tax}
						style={{ width: '100%' }}
						onChange={e => updateField(row.id, 'tax', +e.target.value)}
						InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
					/>
				);
			},
		},
		{
			field: 'discount',
			headerName: 'Dto.',
			width: 100,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<TextField
						disabled={viewOnly}
						value={row.discount}
						style={{ width: '100%' }}
						onChange={e => updateField(row.id, 'discount', +e.target.value)}
						InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
					/>
				);
			},
		},
		{
			field: 'pvp',
			headerName: 'Total',
			width: 110,
			renderCell: ({ row }: GridRenderCellParams) => {
				const { pvp, quantity, tax, discount } = row;
				if (pvp === null || pvp === -1) return 0;
				let total = (Math.round(pvp * (1 - discount / 100) * 100) / 100) * quantity;
				if (tax !== 21)
					total =
						(Math.round(((pvp * (tax + 100)) / 121) * (1 - discount / 100) * 100) / 100) * quantity;
				return (
					<>
						{Math.round(total * 100) / 100}
						<InputAdornment position='end'>€</InputAdornment>
					</>
				);
			},
		},
	];
	const initialPet: IPet = {
		id: -1,
		pet: 'Nueva mascota',
		birthdate: new Date(),
		breed: '',
		chip: 0,
		clinicalObservations: '',
		observations: '',
		sex: 'O',
		species: '',
		status: 1,
		sterilized: 0,
		vet: 1,
	};
	const initialClient: IClient = {
		id: -1,
		client: null,
		document: null,
		address: null,
		city: null,
		postcode: 0,
		province: null,
		observations: null,
		status: 1,
		pets: [],
		contacts: [],
	};
	const initialPayment: IPaymentArticles = {
		id: id ?? -1,
		date: viewOnly ? date ?? new Date() : new Date(),
		pending: 1,
		virtual: 0,
		client: client ?? initialClient,
		pet: pet ?? initialPet,
		company: company,
		type: 'Tarjeta',
		total: 0,
		articles: [],
	};

	const [payment, setPayment] = useState<IPaymentArticles>(initialPayment);
	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [selectedCompany, setSelectedCompany] = useState('');
	const [updateTotalFlag, setUpdateTotalFlag] = useState(false);
	const [articles, setArticles] = useState<IArticle[]>([]);
	const [searchVal, setSearchVal] = useState({ value: -1, label: '' });
	const [chosenDate, setChosenDate] = useState(dayjs(date) ?? dayjs());
	const [loading, setLoading] = useState(true);
	const [lastId, setLastId] = useState(-1);
	const [receiptVisibility, setReceiptVisibility] = useState(false);
	const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);

	const updateField = (id: number, col: 'quantity' | 'tax' | 'discount', newVal: number) => {
		const tempArticles = [...payment.articles];
		const articlePos = tempArticles.findIndex(article => article.id === id);

		if (articlePos >= 0) {
			setUpdateTotalFlag(true);
			switch (col) {
				case 'quantity':
					if (newVal <= 0) {
						setPayment({ ...payment, articles: tempArticles.filter(article => article.id !== id) });
						if (id > 0) deleteToApi('payments/article', { id: id });
						return;
					}
					break;
				case 'tax':
				case 'discount':
					if (newVal > 100) {
						newVal = 100;
					}
			}
			tempArticles[articlePos][col] = newVal;
			setPayment({ ...payment, articles: tempArticles });
		}
	};

	const toggleVirtual = () => {
		setPayment({ ...payment, virtual: payment.virtual === 1 ? 0 : 1 });
	};
	const updatePaymentMethod = (newVal: IPaymentType) => {
		setPayment({ ...payment, type: newVal });
	};

	const handleArticleChosen = () => {
		const article = articles.find(article => article.id === searchVal.value);
		if (article) {
			const newArticle: IPaymentArticle = {
				...article,
				id: lastId,
				articleId: searchVal.value,
				quantity: 1,
				discount: 0,
				tax: 21,
			};
			setLastId(lastId - 1);
			setUpdateTotalFlag(true);
			if (payment.articles.length === 0) {
				setPayment({
					...initialPayment,
					articles: [newArticle],
				});
			} else {
				const pos = payment.articles.findIndex(article => article.articleId === searchVal.value);
				const tempArticles = [...payment.articles];
				if (pos === -1) {
					tempArticles.push(newArticle);
					setPayment({ ...payment, articles: tempArticles });
				} else {
					/* 					if (tempArticles[pos].quantity +1  > (article.stock ?? 0)) {
						alert('No hay suficiente stock');
						return;
					} */
					tempArticles[pos].quantity += 1;
					setPayment({ ...payment, articles: tempArticles });
				}
			}
		}
	};

	const handleSubmit = async (type: 'guardar' | 'cobrar' | 'borrar') => {
		const tempBody = { ...payment };

		switch (type) {
			case 'cobrar':
				tempBody.pending = 0;
				PDFMaker('factura-pdf');
				break;
			case 'guardar':
				tempBody.pending = 1;
				break;
			case 'borrar':
				if (payment.id > 0) await deleteToApi('payments', { id: payment.id });
				return navigate('/Clientes');
		}
		if (viewOnly) tempBody.pending = 0;

		if (tempBody.id < 1) await postToApi('payments', tempBody);
		else await putToApi('payments', tempBody);
		if (type === 'cobrar') return navigate('/Clientes');
		getActivePayment();
	};

	const updateTotal = () => {
		const newTotal =
			Math.round(
				payment.articles
					.map(({ pvp, quantity, tax, discount }) => {
						if (pvp === null || pvp === -1) return 0;
						let total = (Math.round(pvp * (1 - discount / 100) * 100) / 100) * quantity;
						if (tax !== 21)
							total =
								(Math.round(((pvp * (tax + 100)) / 121) * (1 - discount / 100) * 100) / 100) *
								quantity;
						return Math.round(total * 100) / 100;
					})
					.reduce((partialSum, a) => partialSum + a, 0) * 100,
			) / 100;

		setPayment({
			...payment,
			total: newTotal,
		});
	};

	const getActivePayment = async () => {
		setUpdateTotalFlag(true);
		let paymentData: IPaymentArticles;
		if (viewOnly) {
			if (pet) paymentData = await fetchApi('payments/', { id: id });
			else paymentData = await fetchApi('payments/company', { id: id });
		} else if (pet) paymentData = await fetchApi('payments/pet/active', { id: pet.id });
		else paymentData = await fetchApi('payments/company/active', { id: company.id });

		const tempDate = new Date(paymentData.date) ?? new Date();
		if (paymentData.id) {
			setPayment({
				...paymentData,
				date: tempDate,
			});
			setChosenDate(dayjs(tempDate));
		}

		const articlesData: IArticle[] = await fetchApi('articles');
		if (articlesData) setArticles(articlesData);

		setLoading(false);
	};

	const getCompanies = async () => {
		const companiesData = await fetchApi('companies');
		setCompanies(companiesData);
	};

	useEffect(() => {
		getActivePayment();
		getCompanies();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		handleArticleChosen();
		// eslint-disable-line react-hooks/exhaustive-deps
	}, [searchVal]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (updateTotalFlag) updateTotal();
		setUpdateTotalFlag(false);
	}, [payment]); // eslint-disable-line react-hooks/exhaustive-deps

	const articleOptions = articles
		.map(({ name, group, id }) => ({
			value: id,
			label: `${group} | ${name}`,
		}))
		.sort((a, b) => a.label.localeCompare(b.label));

	return (
		<Container className='content factura'>
			<Card>
				<CardBody>
					<div className='header'>
						<Typography variant='h3'>
							{payment.virtual ? 'Presupuesto' : 'Factura'} para {client?.client ?? company.name}
						</Typography>
						<Row className='total-and-actions'>
							<Col xs='12' md='6'>
								<div>
									<Input type='checkbox' checked={payment.virtual === 1} onChange={toggleVirtual} />{' '}
									Presupuesto
								</div>
								{payment.number && (
									<Typography variant='h6'>Nº de Factura: {payment.number}</Typography>
								)}
								<Typography variant='h6'>
									Total: {`${isNaN(payment.total) ? '0 €' : payment.total} €`}
								</Typography>
							</Col>
							<Col
								xs='12'
								md='6'
								style={{ display: 'flex', flexFlow: 'column', alignItems: 'end' }}
							>
								<Input
									className='company-select'
									type='select'
									value={selectedCompany}
									onChange={({ target: { value } }) => {
										setSelectedCompany(value);
										payment.company = companies.find(({ id }) => id === +value);
									}}
								>
									<option hidden value=''>
										Facturar a empresa
									</option>
									<option value='-1'></option>
									{companies.map(({ id, name }) => (
										<option key={id} value={id}>
											{name}
										</option>
									))}
								</Input>
								<DateTimePicker
									value={chosenDate}
									className='form-input'
									onChange={value => {
										if (value) {
											setChosenDate(value);
											setPayment({ ...payment, date: new Date(value.toISOString()) });
										}
									}}
								/>
								<ButtonGroup>
									<Tooltip title='Guardar'>
										<IconButton onClick={() => handleSubmit('guardar')}>
											<SaveOutlined fontSize='large' color='primary' />
										</IconButton>
									</Tooltip>
									<Tooltip title='Cobrar'>
										<IconButton
											onClick={() => {
												setReceiptVisibility(true);
												setPayment({ ...payment });
											}}
										>
											<ReceiptLongOutlined fontSize='large' color='primary' />
										</IconButton>
									</Tooltip>
									<Tooltip title='Borrar'>
										<IconButton onClick={() => setDeleteModalVisibility(true)}>
											<DeleteOutlined fontSize='large' color='primary' />
										</IconButton>
									</Tooltip>
								</ButtonGroup>
							</Col>
						</Row>
					</div>
					<Row style={{ marginBottom: '20px' }}>
						{!viewOnly && (
							<Col xs='12'>
								<Typography variant='h5'>Elige un producto:</Typography>
								<Autocomplete
									value={searchVal}
									renderInput={params => (
										<TextField
											{...params}
											value={searchVal}
											className='form-input'
											onChange={e => setSearchVal({ value: -1, label: e.target.value })}
										/>
									)}
									onChange={e => {
										setSearchVal({
											value:
												articleOptions.find(({ label }) => e.currentTarget.textContent === label)
													?.value || -1,
											label: '',
										});
									}}
									options={articleOptions}
									isOptionEqualToValue={() => true}
								/>
							</Col>
						)}
					</Row>
					{payment.articles && payment.articles.length > 0 && (
						<Row>
							<Col xs='12'>
								<Table cols={cols} rows={payment.articles} loading={loading} />
							</Col>
						</Row>
					)}
				</CardBody>
			</Card>
			<PaymentModal
				payment={payment}
				receiptVisibility={receiptVisibility}
				setReceiptVisibility={setReceiptVisibility}
				updatePaymentMethod={updatePaymentMethod}
				handleSubmit={handleSubmit}
			/>
			<DeleteModal
				title='Factura'
				visible={deleteModalVisibility}
				submitLabel={'Borrar'}
				info='esta factura'
				onSubmit={() => handleSubmit('borrar')}
				onClose={() => setDeleteModalVisibility(false)}
			/>
		</Container>
	);
};
