import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import {
	DeleteOutlined,
	DeviceThermostat,
	EditOutlined,
	EventOutlined,
	FolderOpenOutlined,
	MedicalInformationOutlined,
} from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import weight from 'assets/weight.png';
import condition from 'assets/catEating.png';
import { DeleteModal, EditVisitModal } from 'components';
import { IUser, IVaccine, IVisit } from 'interfaces';
import { deleteToApi, putToApi } from 'controllers/Controller';

interface VisitCardProps {
	visit: IVisit;
	vets: IUser[];
	vaccineOptions: IVaccine[];
	getVisits: () => void;
	handleVisitChange: () => void;
}
export const VisitCard = ({
	visit,
	vets,
	vaccineOptions,
	getVisits,
	handleVisitChange,
}: VisitCardProps) => {
	const [formSubmitLabel, setFormSubmitLabel] = useState<'Guardar' | 'Borrar'>('Guardar');
	const [formData, setFormData] = useState<IVisit>({
		...visit,
	});
	const [formOpen, setFormOpen] = useState(false);
	const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

	const handleSubmitCita = () => {
		switch (formSubmitLabel) {
			case 'Guardar':
				updateCita();
				setFormOpen(false);
				break;
			case 'Borrar':
				deleteCita();
				setDeleteConfirmationOpen(false);
				break;
		}
		handleVisitChange();
	};

	const updateCita = async () => {
		const dataCita: boolean = await putToApi('visits', formData);
		if (!dataCita) console.error('Error guardando cita');
		getVisits();
	};

	const deleteCita = async () => {
		const dataCita: boolean = await deleteToApi('visits', { id: formData.id });
		if (!dataCita) console.error('Error borrando cita');
		getVisits();
	};

	const handleFormChange = (key: string, newVal: never) => {
		const tempData = { ...formData };

		if (!['vaccinesPeriod', 'vaccines'].includes(key)) tempData[key as keyof IVisit] = newVal;
		else if (tempData.vaccines) {
			if (key === 'vaccinesPeriod') tempData.vaccines[newVal[0]].validity = newVal[1];
			if (key === 'vaccines') {
				tempData.vaccines = (newVal as number[]).map(newId =>
					vaccineOptions.find(({ id }) => id === newId),
				) as IVaccine[];
				const newVac = vaccineOptions.find(({ id }) => id === newVal);
				if (newVac) tempData.vaccines = [...tempData.vaccines, newVac];
			}
		}
		setFormData(tempData);
	};

	useEffect(() => {
		setFormData({ ...visit });
	}, [visit]);

	return (
		<>
			<Row className='visit-card'>
				<Row className='header'>
					<Col xs={12} md={9}>
						<Typography variant='h4'>{visit.visitReason}</Typography>
					</Col>
					<Col xs={{ size: 6, offset: 7 }} md={{ size: 3, offset: 0 }} data-html2canvas-ignore>
						<Tooltip title='Documentos'>
							<IconButton>
								<FolderOpenOutlined fontSize='medium' color='primary' />
							</IconButton>
						</Tooltip>
						<Tooltip title='Editar'>
							<IconButton
								onClick={() => {
									setFormSubmitLabel('Guardar');
									setFormOpen(true);
								}}
							>
								<EditOutlined fontSize='medium' color='primary' />
							</IconButton>
						</Tooltip>
						<Tooltip title='Borrar'>
							<IconButton
								onClick={() => {
									setFormSubmitLabel('Borrar');
									setDeleteConfirmationOpen(true);
								}}
							>
								<DeleteOutlined fontSize='medium' color='primary' />
							</IconButton>
						</Tooltip>
					</Col>
				</Row>
				<Row className='info-group'>
					<Col xs={6} lg={4} xl={4} xxl={3} className='info'>
						<EventOutlined color='primary' />
						<Typography variant='body1'>{visit.date.toLocaleString('es')}</Typography>
					</Col>
					<Col xs={6} lg={4} xl={4} xxl={3} className='info'>
						<MedicalInformationOutlined color='primary' />
						<Typography variant='body1'>
							{vets.find(user => user.id === visit.vetId)?.fullName ?? ''}
						</Typography>
					</Col>
					{visit.weight && (
						<Col xs={4} lg={2} xl={2} xxl={2} className='info'>
							<img src={weight} height='20px' />
							<Typography variant='body1'>{Math.round(visit.weight * 100) / 100} kg</Typography>
						</Col>
					)}
					{visit.condition && (
						<Col xs={4} lg={2} xl={1} xxl={2} className='info'>
							<img src={condition} height='28px' />
							<Typography variant='body1'>{visit.condition}</Typography>
						</Col>
					)}
					{visit.temperature && (
						<Col xs={4} lg={3} xl={2} xxl={2} className='info'>
							<DeviceThermostat color='primary' />
							<Typography variant='body1'>
								{Math.round(visit.temperature * 100) / 100} ºC
							</Typography>
						</Col>
					)}
				</Row>
				<div className='visit-info'>
					{visit.observations && (
						<>
							<Typography variant='h5'>Anamnesis:</Typography>
							<Typography variant='body1'>
								{visit.observations.split('\n').map(line => (
									<>
										{line}
										<br />
									</>
								))}
							</Typography>
						</>
					)}
					{visit.symptoms && (
						<>
							<Typography variant='h5'>Sintomatología:</Typography>
							<Typography variant='body1'>
								{visit.symptoms.split('\n').map(line => (
									<>
										{line}
										<br />
									</>
								))}
							</Typography>
						</>
					)}
					{visit.testDiagnostics && (
						<>
							<Typography variant='h5'>Pruebas diagnósticas:</Typography>
							<Typography variant='body1'>{visit.testDiagnostics.split('\n').map(line => (
								<>
									{line}
									<br />
								</>
							))}</Typography>
						</>
					)}
					{visit.diagnostics && (
						<>
							<Typography variant='h5'>Diagnóstico:</Typography>
							<Typography variant='body1'>{visit.diagnostics.split('\n').map(line => (
								<>
									{line}
									<br />
								</>
							))}</Typography>
						</>
					)}
					{visit.tests && (
						<>
							<Typography variant='h5'>Pruebas:</Typography>
							<Typography variant='body1'>{visit.tests.split('\n').map(line => (
								<>
									{line}
									<br />
								</>
							))}</Typography>
						</>
					)}
					{visit.treatment && (
						<>
							<Typography variant='h5'>Tratamiento:</Typography>
							<Typography variant='body1'>{visit.treatment.split('\n').map(line => (
								<>
									{line}
									<br />
								</>
							))}</Typography>
						</>
					)}
					{visit.recommendations && (
						<>
							<Typography variant='h5'>Recomendaciones:</Typography>
							<Typography variant='body1'>
								{visit.recommendations.split('\n').map(line => (
									<>
										{line}
										<br />
									</>
								))}
							</Typography>
						</>
					)}
				</div>
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
				title='Cita'
				visible={deleteConfirmationOpen}
				submitLabel={formSubmitLabel}
				info='esta cita'
				onSubmit={handleSubmitCita}
				onClose={() => setDeleteConfirmationOpen(false)}
			/>
		</>
	);
};
