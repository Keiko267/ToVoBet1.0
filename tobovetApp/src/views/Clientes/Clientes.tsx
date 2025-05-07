import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { AddCard, EditOutlined, FeedOutlined, FolderOpenOutlined } from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import {
	ClientModalContent,
	CreateVisitButton,
	FormModal,
	ISelectOption,
	PetModalContent,
	Table,
} from 'components';
import { fetchApi, postToApi, putToApi } from 'controllers/Controller';
import { IClient, IClientesRow, IContact, IPet, IUser } from 'interfaces';
import './Clientes.scss';

export const Clientes = () => {
	const navigate = useNavigate();
	const cols = [
		{ field: 'clientName', headerName: 'Cliente', width: 272 },
		{ field: 'petName', headerName: 'Mascota', width: 120 },
		{ field: 'id', headerName: 'NHC', width: 70 },
		{ field: 'species', headerName: 'Especie', width: 90 },
		{ field: 'breed', headerName: 'Raza', width: 160 },
		{ field: 'chip', headerName: 'Chip', width: 150 },
		{
			field: 'vet',
			headerName: 'Veterinario',
			width: 110,
			renderCell: ({ row }: GridRenderCellParams) =>
				vetOptions.find(({ value }) => value === row.vet)?.label,
		},
		{
			field: 'acciones',
			headerName: 'Acciones',
			width: 200,
			sortable: false,
			filterable: false,
			renderCell: ({ row }: GridRenderCellParams) => (
				<div className='actions-column'>
					<Tooltip title='Editar'>
						<IconButton onClick={() => handleRowEdit(row)}>
							<EditOutlined color='primary' />
						</IconButton>
					</Tooltip>
					<CreateVisitButton row={row} />
					<Tooltip title='Historial'>
						<IconButton onClick={() => handleHistorial(row)}>
							<FeedOutlined color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Facturar'>
						<IconButton onClick={() => handleFacturar(row)}>
							<AddCard color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Documentos'>
						<IconButton onClick={() => handleDocumentos(row)}>
							<FolderOpenOutlined color='primary' />
						</IconButton>
					</Tooltip>
				</div>
			),
		},
	];
	const initialContact: IContact = {
		id: -1,
		contact: '',
		email: '',
		phone: '',
	};
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
		pets: [initialPet],
		contacts: [initialContact],
	};

	const [searchVal, setSearchVal] = useState('');
	const [formOpen, setFormOpen] = useState(false);
	const [formData, setFormData] = useState(initialClient);
	const [formSubmitLabel, setFormSubmitLabel] = useState<'Añadir' | 'Guardar'>('Añadir');
	const [rows, setRows] = useState<IClientesRow[]>([]);
	const [clients, setClients] = useState<IClient[]>([]);
	const [vetOptions, setVetOptions] = useState<ISelectOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedContact, setSelectedContact] = useState(0);
	const [selectedPet, setSelectedPet] = useState(0);
	const [isValidClient, setIsValidClient] = useState(false);
	const [isValidContact, setIsValidContact] = useState(false);
	const [isValidPet, setIsValidPet] = useState(false);

	const handleRowEdit = (row: IClientesRow) => {
		const currClient = clients.find(({ id }) => id === row.clientId) || initialClient;
		let petPos = currClient.pets.findIndex(({ id }) => id === row.id);
		if (petPos === -1) petPos = 0;
		setSelectedContact(0);
		setSelectedPet(petPos);
		setFormData(currClient);
		setFormSubmitLabel('Guardar');
		setFormOpen(true);
	};

	const addContact = () => {
		const newPos = formData.contacts.length;
		formData.contacts.push(initialContact);
		setSelectedContact(newPos);
	};

	const addPet = () => {
		const newPos = formData.pets.length;
		formData.pets.push(initialPet);
		setSelectedPet(newPos);
	};

	const handleAddClient = () => {
		setFormData(initialClient);
		setFormSubmitLabel('Añadir');
		setFormOpen(true);
	};

	const handleSubmitClient = () => {
		if (isValidClient && isValidContact && isValidPet) {
			switch (formSubmitLabel) {
				case 'Añadir':
					addClient();
					break;
				case 'Guardar':
					updateClient();
					break;
			}
			setFormOpen(false);
		}
	};

	const addClient = async () => {
		setLoading(true);
		const dataClient: boolean = await postToApi('clients', formData);
		if (!dataClient) console.error('Error guardando cliente');
		getClients();
	};

	const updateClient = async () => {
		setLoading(true);
		const dataClient: boolean = await putToApi('clients', formData);
		if (!dataClient) console.error('Error guardando cliente');
		getClients();
	};

	const handleHistorial = (row: IClientesRow) => {
		const currClient = clients.find(({ id }) => id === row.clientId);
		let petPos = currClient?.pets.findIndex(({ id }) => id === row.id);
		if (petPos === -1) petPos = 0;
		navigate('/HistorialCliente', {
			state: { id: row.id, client: currClient, petPos:petPos },
		});
	};
	const handleFacturar = (row: IClientesRow) => {
		navigate('/Factura', {
			state: {
				pet: clients.find(({ id }) => id === row.clientId)?.pets.find(pet => pet.id === row.id),
				client: clients.find(({ id }) => id === row.clientId),
			},
		});
	};
	const handleDocumentos = (row: IClientesRow) => {
		console.log('TODO documentos', row);
	};
	const handleClientFormChange = (key: string, newVal: never) => {
		const tempData = { ...formData };
		tempData[key as keyof IClient] = newVal;
		setFormData(tempData);
	};
	const handleContactFormChange = (key: string, newVal: never) => {
		const tempContact = { ...formData.contacts[selectedContact] };
		tempContact[key as keyof IContact] = newVal;
		const tempContacts = [...formData.contacts];
		tempContacts[selectedContact] = tempContact;
		setFormData({ ...formData, contacts: tempContacts });
	};
	const handlePetFormChange = (key: string, newVal: never) => {
		const tempPet = { ...formData.pets[selectedPet] };

		tempPet[key as keyof IPet] = newVal;
		const tempPets = [...formData.pets];
		tempPets[selectedPet] = tempPet;

		setFormData({ ...formData, pets: tempPets });
	};

	const getClients = async () => {
		const dataClientes: IClient[] = await fetchApi('clients/pets/contacts');
		if (dataClientes) {
			setClients(
				dataClientes.map(cliente => ({
					...cliente,
					pets: cliente.pets.map(pet => ({ ...pet, birthdate: new Date(pet.birthdate || '') })),
				})),
			);
			const tempRows: IClientesRow[] = [];
			dataClientes.forEach((client: IClient) =>
				client.pets.forEach(({ id, pet, species, breed, chip, vet }) => {
					tempRows.push({
						clientId: client.id,
						clientName: client.client,
						id: id,
						petName: pet,
						species: species,
						breed: breed,
						chip: chip,
						vet: vet,
					});
				}),
			);
			setRows(tempRows);
		}

		const dataUsers: IUser[] = await fetchApi('users');
		if (dataUsers) setVetOptions(dataUsers.map(({ id, name }) => ({ value: id, label: name })));

		setLoading(false);
	};
	//TODO: Implement so that the data is shown when the client is clicked (already changed the API to return the data)

	useEffect(() => {
		getClients();

		const interval = setInterval(() => getClients(), 5000);
		return () => clearInterval(interval);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container className='content clients'>
			<Card>
				<CardBody>
					<Button variant='contained' onClick={handleAddClient}>
						Añadir cliente
					</Button>
					<div className='filters'>
						<TextField
							autoFocus
							placeholder='Buscar por Cliente, Mascota, NHC o Chip'
							variant='outlined'
							value={searchVal}
							onChange={({ target: { value } }) => setSearchVal(value)}
							fullWidth
						/>
					</div>
					<Table
						rows={rows
							.sort((a, b) => (b.id || 0) - (a.id || 0))
							.filter(({ clientName, petName, id, chip }) =>
								searchVal.length
									? clientName?.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase()) ||
										petName?.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase()) ||
										id?.toString().includes(searchVal) ||
										chip?.toString().includes(searchVal)
									: true,
							)}
						cols={cols}
						loading={loading}
					/>
				</CardBody>
			</Card>
			<FormModal
				title='Cliente'
				visible={formOpen}
				submitLabel={formSubmitLabel}
				onClose={() => setFormOpen(false)}
				onSubmit={handleSubmitClient}
			>
				<Row>
					<Col xl={6} md={12}>
						<ClientModalContent
							formData={formData}
							selectedContact={selectedContact}
							setSelectedContact={setSelectedContact}
							addContact={addContact}
							setIsValidClient={setIsValidClient}
							setIsValidContact={setIsValidContact}
							handleClientFormChange={handleClientFormChange}
							handleContactFormChange={handleContactFormChange}
						/>
					</Col>
					<Col xl={6} md={12}>
						<PetModalContent
							formData={formData}
							selectedPet={selectedPet}
							vetOptions={vetOptions}
							addPet={addPet}
							setSelectedPet={setSelectedPet}
							setIsValidPet={setIsValidPet}
							handlePetFormChange={handlePetFormChange}
						/>
					</Col>
				</Row>
			</FormModal>
		</Container>
	);
};
