import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import { Box, Button, ButtonGroup, Modal, Tooltip, Typography } from '@mui/material';
import {
	AddCard,
	BusinessOutlined,
	CakeOutlined,
	EditOutlined,
	EmailOutlined,
	FeedOutlined,
	FemaleOutlined,
	FolderOpenOutlined,
	LocalPhoneOutlined,
	MaleOutlined,
	MedicalInformationOutlined,
	NumbersOutlined,
	PetsOutlined,
	SimCardOutlined,
	VaccinesOutlined,
} from '@mui/icons-material';
import logo from 'assets/logoNoBgCaqui.png';
import {
	ClientModalContent,
	CreateVisitButton,
	DocGenType,
	FormModal,
	GenerateDocumentModal,
	PDFMaker,
	PetModalContent,
} from 'components';
import { fetchApi, putToApi } from 'controllers/Controller';
import { IClient, IContact, IPet, IUser, IVaccine, IVisit, IVisitVaccine } from 'interfaces';
import { VisitCard } from './VisitCard';
import './ClientHistorical.scss';

export const ClientHistorical = () => {
	const { state }: { state: { id: number; client: IClient; petPos: number } } = useLocation();
	const navigate = useNavigate();
	const { id } = state;

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
		chip: -1,
		clinicalObservations: '',
		observations: '',
		sex: 'O',
		species: '',
		status: 1,
		sterilized: 0,
		vet: 1,
	};

	const [currClient, setCurrClient] = useState<IClient>(state.client);
	const [vets, setVets] = useState<IUser[]>([]);
	const [visits, setVisits] = useState<IVisit[]>([]);
	const [vaccineOptions, setVaccineOptions] = useState<IVaccine[]>([]);
	const [vaccinePets, setVaccinePets] = useState<IVisitVaccine[]>([]);
	const [clientsFormOpen, setClientsFormOpen] = useState(false);
	const [petsFormOpen, setPetsFormOpen] = useState(false);
	const [docGenType, setDocGenType] = useState<DocGenType>('');
	const [selectedContact, setSelectedContact] = useState(0);
	const [selectedPet, setSelectedPet] = useState(state.petPos);
	const [isValidClient, setIsValidClient] = useState(true);
	const [isValidContact, setIsValidContact] = useState(true);
	const [isValidPet, setIsValidPet] = useState(true);
	const [vaccineForm, setVaccineFormOpen] = useState(false);

	const rowData = {
		clientId: currClient.id,
		clientName: currClient.client,
		id: currClient.pets[state.petPos].id,
		petName: currClient.pets[state.petPos].pet,
		species: currClient.pets[state.petPos].species,
		breed: currClient.pets[state.petPos].breed,
		chip: currClient.pets[state.petPos].chip,
		vet: currClient.pets[state.petPos].vet,
	};

	const calculateAge = () => {
		const birthdate = currClient.pets[state.petPos].birthdate;
		if (birthdate) {
			const diff = Date.now() - birthdate.getTime();

			const days = Math.floor(diff / 1000 / 60 / 60 / 24);
			let months = Math.floor(days / 30);
			const years = Math.floor(days / 365);

			months %= 12;

			const yearsStr = years === 0 ? null : years > 1 ? `${years} años` : '1 año';
			const monthsStr =
				months === 1
					? '1 mes'
					: months === 0 && years === 0
						? `${days} días`
						: months > 0
							? `${months} meses`
							: null;

			return [yearsStr, monthsStr].filter(n => n !== null).join(' y ');
		}
		return null;
	};

	const addContact = () => {
		const newPos = currClient.contacts.length;
		currClient.contacts.push(initialContact);
		setSelectedContact(newPos);
	};

	const addPet = () => {
		const newPos = currClient.pets.length;
		currClient.pets.push(initialPet);
		setSelectedPet(newPos);
	};

	const handleFacturar = () => {
		navigate('/Factura', {
			state: { pet: currClient.pets.find(pet => pet.id === id), client: currClient },
		});
	};

	const handleClientFormChange = (key: string, newVal: never) => {
		currClient[key as keyof IClient] = newVal;
	};

	const handleContactFormChange = (key: string, newVal: never) => {
		const tempContact = { ...currClient.contacts[selectedContact] };
		tempContact[key as keyof IContact] = newVal;
		const tempContacts = [...currClient.contacts];
		tempContacts[selectedContact] = tempContact;
		setCurrClient({ ...currClient, contacts: tempContacts });
	};

	const handlePetFormChange = (key: string, newVal: never) => {
		const tempPet = { ...currClient.pets[selectedPet] };

		tempPet[key as keyof IPet] = newVal;
		const tempPets = [...currClient.pets];
		tempPets[selectedPet] = tempPet;

		setCurrClient({ ...currClient, pets: tempPets });
	};

	const handleSubmitClient = async () => {
		if (isValidClient && isValidContact && isValidPet) {
			const dataClient: boolean = await putToApi('clients', currClient);
			if (!dataClient) console.error('Error guardando cliente');
			getClient();
			setClientsFormOpen(false);
		}
	};
	//Funtion to show a modal with all the vaccines the pet has, we have to:
	//1. Get the vaccines through vaccines/pet and pass the pet id
	//2. Show the modal with the vaccines
	const handleGetVaccines = async () => {
		const vaccinesPetData = await fetchApi('vaccinations/pet', { id: id });
		if (vaccinesPetData) {
			setVaccinePets(vaccinesPetData);
			setVaccineFormOpen(true);
		}
	};

	const getClient = async () => {
		const dataCliente: IClient = await fetchApi('clients/pets/contacts', { id: currClient.id });
		if (dataCliente) {
			setCurrClient({
				...dataCliente,
				pets: dataCliente.pets.map(pet => ({ ...pet, birthdate: new Date(pet.birthdate || '') })),
			});
		}
	};

	const getVisits = async () => {
		const currPet = currClient.pets[state.petPos];
		const dataVisits: IVisit[] = await fetchApi('visits/pet', { id: currPet.id });
		if (dataVisits) {
			setVisits(
				dataVisits
					.map(row => ({
						...row,
						pet: currClient.pets[state.petPos].pet ?? '',
						petId: id,
						clientId: currClient.id ?? -1,
						client: currClient.client ?? '',
						date: new Date(row.date),
					}))
					.sort((a, b) => b.date.valueOf() - a.date.valueOf()),
			);
		}

		const dataUsers: IUser[] = await fetchApi('users');
		if (dataUsers) setVets(dataUsers);
	};

	const getVaccines = async () => {
		const dataVaccines: IVaccine[] = await fetchApi('articles/vaccines');
		if (dataVaccines) setVaccineOptions(dataVaccines);
	};

	const handleVisitChange = async () => {
		await getVisits();
	};

	useEffect(() => {
		getVisits();
		getVaccines();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container className='content client-historical'>
			<Card id='historial-pdf' className='historical-card'>
				<CardBody>
					<Row className='header'>
						<Col xl={4} xxl={3}>
							<img className='logo' src={logo} />
						</Col>
						<Col xl={8} xxl={9}>
							<Row>
								<Typography variant='h2'>
									Historial de {currClient.pets[state.petPos].pet}
								</Typography>
							</Row>
							<Row>
								<Typography variant='h5'>Cliente: {currClient.client}</Typography>
							</Row>
							<Row>
								<Col xs={6} lg={12}>
									<Row className='pet-info'>
										<Col lg={2} xl={2} xxl={1} className='header-info'>
											<Tooltip title='NHC'>
												<NumbersOutlined color='primary' fontSize='large' />
											</Tooltip>
											{currClient.pets[state.petPos].id}
										</Col>
										<Col lg={5} xl={4} xxl={3} className='header-info'>
											<Tooltip title='Chip'>
												<SimCardOutlined color='primary' fontSize='large' />
											</Tooltip>
											{currClient.pets[state.petPos].chip}
										</Col>
										<Col lg={5} xl={4} xxl={3} className='header-info'>
											<Tooltip title='Especie'>
												<PetsOutlined color='primary' fontSize='large' />
											</Tooltip>
											{currClient.pets[state.petPos].species} -{' '}
											{currClient.pets[state.petPos].breed}
										</Col>
										<Col lg={5} xl={4} xxl={3} className='header-info'>
											<Tooltip title='Edad'>
												<CakeOutlined color='primary' fontSize='large' />
											</Tooltip>
											{calculateAge() ?? 'Desconocida'}
										</Col>
										<Col lg={5} xl={3} xxl={2} className='header-info'>
											{currClient.pets[state.petPos].sex === 'F' ? (
												<>
													<Tooltip title='Sexo'>
														<FemaleOutlined color='primary' fontSize='large' />
													</Tooltip>
													{'Hembra'}
												</>
											) : currClient.pets[state.petPos].sex === 'M' ? (
												<>
													<Tooltip title='Sexo'>
														<MaleOutlined color='primary' fontSize='large' />
													</Tooltip>
													{'Macho'}
												</>
											) : (
												''
											)}
										</Col>
									</Row>
								</Col>
								<Col xs={6} lg={12}>
									<Row className='company-info'>
										<Col xs={12} lg={2} xl={4} xxl={2}>
											<MedicalInformationOutlined color='primary' />
											<Typography variant='body1'>
												{vets.find(user => user.id === currClient.pets[state.petPos].vet)
													?.fullName ?? ''}
											</Typography>
										</Col>
										<Col xs={12} lg={2} xl={4} xxl={2}>
											<LocalPhoneOutlined color='primary' />
											<div className='group'>
												<Typography variant='body1'>633 443 858</Typography>
												<Typography variant='body1'>622 001 250</Typography>
											</div>
										</Col>
										<Col xs={12} lg={3} xl={4} xxl={3}>
											<EmailOutlined color='primary' />
											<Typography variant='body1'>tobovet@gmail.com</Typography>
										</Col>
										<Col xs={12} lg={2} xl={4} xxl={2}>
											<BusinessOutlined color='primary' />
											<Typography variant='body1'>C. Guatemala, 16, Jerez, España</Typography>
										</Col>
										<Col xs={12} lg={2} xl={4} xxl={2}>
											<NumbersOutlined color='primary' />
											<div>
												<Typography variant='body1'>TOBOVET S.L.P</Typography>
												<Typography variant='body1'>CIF B16393159</Typography>
											</div>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row className='button-group' data-html2canvas-ignore>
								<Col>
									<Button
										startIcon={<EditOutlined color='primary' />}
										onClick={() => setClientsFormOpen(true)}
										variant='outlined'
									>
										Cliente
									</Button>
								</Col>
								<Col>
									<Button
										startIcon={<EditOutlined color='primary' />}
										onClick={() => setPetsFormOpen(true)}
										variant='outlined'
									>
										Mascota
									</Button>
								</Col>
								<Col>
									<Button startIcon={<FolderOpenOutlined color='primary' />} variant='outlined'>
										Documentos
									</Button>
								</Col>
								<Col>
									<Button
										startIcon={<AddCard color='primary' />}
										onClick={() => handleFacturar()}
										variant='outlined'
									>
										Facturar
									</Button>
								</Col>
								<Col>
									<Button startIcon={<FeedOutlined color='primary' />} variant='outlined'>
										Historial de consumo
									</Button>
								</Col>
								<Col>
									<Button
										startIcon={<VaccinesOutlined color='primary' />}
										onClick={() => handleGetVaccines()}
										variant='outlined'
									>
										Vacunas
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
					<div className='historical-card info-card'>
						<ButtonGroup data-html2canvas-ignore className='main-buttons'>
							<CreateVisitButton row={rowData} isFromHistorical={true} getVisits={getVisits} />
							<Button variant='contained' onClick={() => PDFMaker('historial-pdf')}>
								Hacer Informe
							</Button>
							<Input
								type='select'
								value=''
								onChange={({ target: { value } }) => setDocGenType(value as DocGenType)}
							>
								<option hidden value=''>
									GENERAR DOCUMENTO
								</option>
								<option value='declinedTests'>Informe de declinación de pruebas</option>
								<option value='authorizeEuthanasia'>Informe de autorización de eutanasia</option>
								<option value='corpseCustody'>Informe de custodia de cadaver</option>
								<option value='debtRecognition'>Informe de reconocimiento de deuda</option>
							</Input>
						</ButtonGroup>
						<Row className='visits-list'>
							<Col lg={{ size: 10, offset: 1 }}>
								{visits.map((visit, idx) => (
									<div key={idx}>
										<VisitCard
											visit={visit}
											vets={vets}
											vaccineOptions={vaccineOptions}
											getVisits={getVisits}
											handleVisitChange={handleVisitChange}
										/>
										{idx < visits.length - 1 && <div className='bottom-line'></div>}
									</div>
								))}
							</Col>
						</Row>
					</div>
				</CardBody>
			</Card>
			<FormModal
				title='Cliente'
				visible={clientsFormOpen}
				submitLabel={'Guardar'}
				onClose={() => setClientsFormOpen(false)}
				onSubmit={handleSubmitClient}
			>
				<ClientModalContent
					formData={currClient}
					selectedContact={selectedContact}
					setSelectedContact={setSelectedContact}
					addContact={addContact}
					setIsValidClient={setIsValidClient}
					setIsValidContact={setIsValidContact}
					handleClientFormChange={handleClientFormChange}
					handleContactFormChange={handleContactFormChange}
				/>
			</FormModal>
			<FormModal
				title='Mascota'
				visible={petsFormOpen}
				submitLabel={'Guardar'}
				onClose={() => setPetsFormOpen(false)}
				onSubmit={handleSubmitClient}
			>
				<PetModalContent
					formData={currClient}
					selectedPet={selectedPet}
					vetOptions={vets.map(({ id, name }) => ({ value: id, label: name }))}
					addPet={addPet}
					setSelectedPet={setSelectedPet}
					setIsValidPet={setIsValidPet}
					handlePetFormChange={handlePetFormChange}
				/>
			</FormModal>
			<GenerateDocumentModal
				client={currClient}
				pet={currClient.pets[state.petPos]}
				docGenType={docGenType}
				setDocGenType={setDocGenType}
			/>
			{/* The vaccines come to vaccinePets with this format:
			    return data.map((row) => ({
				id: row.vaccination_id,
				articleId: row.article_id,
				article: row.article_name,
				petId: row.pet_id,
				petName: row.pet_name,
				clientId: row.client_id,
				clientName: row.client_name,
				applliedVisitId: row.vaccination_visit_applied,
				validity: row.article_validity_period,
				vaccinationDate: row.vaccination_date,
				nextExpirationDate: row.next_expiration_date
				Now create a modal that shows the vaccines of the pet, for each vaccine, show the article name and the vaccination date in a cute way
			})); 
	
			*/}
			<Modal open={vaccineForm} onClose={() => setVaccineFormOpen(false)}>
				<Box
					className='form-container'
					sx={{
						bgcolor: 'background.paper',
						p: 4,
					}}
				>
					<Typography variant='h4'>Vacunas de {currClient.pets[state.petPos].pet}</Typography>
					{vaccinePets.map((vaccine, idx) => (
						<Box key={idx} className='vaccine'>
							<Typography variant='h6'>{vaccine.article}</Typography>
							<Typography variant='body1'>
								Fecha de vacunación: {new Date(vaccine.vaccinationDate).toLocaleDateString('es')}
							</Typography>
						</Box>
					))}
				</Box>
			</Modal>
		</Container>
	);
};
