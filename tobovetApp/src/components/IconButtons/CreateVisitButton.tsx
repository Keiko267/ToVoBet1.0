import { useEffect, useState } from 'react';
import { InsertInvitation } from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';
import { FormModal, FormContent, ISelectOption, IFormMeta } from 'components';
import { fetchApi, postToApi } from 'controllers/Controller';
import { IVisit, IClientesRow, IVisitVaccine, IVaccine } from 'interfaces';
import { IUser } from 'interfaces/IUser';

interface CreateVisitProps {
	row: IVisitVaccine | IClientesRow;
	isFromHistorical?: boolean;
	isFromVaccination?: boolean;
	vaccineOptions?: IVaccine[];
	getVisits?: () => Promise<void>;
	vaccines?: IVisitVaccine[];
}
export const CreateVisitButton = ({
	row,
	isFromHistorical = false,
	isFromVaccination = false,
	vaccineOptions = [],
	vaccines,
	getVisits,
}: CreateVisitProps) => {
	const initialFormData = {
		clientId: row.clientId ?? -1,
		// @ts-expect-error stupid typescript can't tell petId is a property of row
		petId: row.petId ?? row.id ?? -1,
		date: new Date(),
		vetId: 1,
		visitReason: '',
		completed: 0,
		vaccines: [],
	};

	const [vetOptions, setVetOptions] = useState<ISelectOption[]>([]);
	const defaultMeta: IFormMeta[] = [
		{
			label: 'Fecha',
			key: 'date',
			type: 'date',
		},
		{
			label: 'Motivo de consulta',
			key: 'visitReason',
		},
		{
			label: 'Veterinario',
			key: 'vetId',
			type: 'select',
			options: vetOptions,
		},
	];

	const [modalVisible, setModalVisible] = useState(false);
	const [formData, setFormData] = useState<IVisit>(initialFormData);

	const vaccinationFormMeta: IFormMeta[] = [
		{
			label: 'Vacunas',
			key: 'vaccines',
			type: 'multiselect',
			options: vaccines
				? vaccines.map(({ articleId, article }) => ({
						value: articleId,
						label: article,
					}))
				: [],
			isInvalid: vaccines ? formData.vaccines && formData.vaccines?.length <= 0 : false,
		},
	];

	const handleVisitFormChange = (key: string, newVal: never) => {
		const tempData = { ...formData };
		if (key === 'vaccines' && vaccines) {
			tempData.vaccines = (newVal as number[]).map(newId => ({
				...vaccines.find(({ articleId }) => articleId === newId),
			})) as IVaccine[];
			const newVac = vaccineOptions.find(({ id }) => id === newVal);
			if (newVac) tempData.vaccines = [...tempData.vaccines, newVac];
		} else tempData[key as keyof IVisit] = newVal;

		setFormData(tempData);
	};

	const handleCreateVisit = async () => {
		await postToApi('visits', formData);
		setModalVisible(false);
		isFromHistorical && getVisits && (await getVisits());
		setFormData(initialFormData);
	};

	const handleCreateVisitVaccination = async () => {
		await postToApi('vaccinations/secondVisit', { visit: formData });
		setModalVisible(false);
		getVisits && (await getVisits());
		setFormData(initialFormData);
	};

	const getVets = async () => {
		const dataUsers: IUser[] = await fetchApi('users');
		if (dataUsers) setVetOptions(dataUsers.map(({ id, name }) => ({ value: id, label: name })));
	};

	useEffect(() => {
		getVets();
	}, []);

	return (
		<>
			{isFromHistorical ? (
				<Button
					className='new-visit-button'
					variant='contained'
					onClick={() => setModalVisible(true)}
				>
					Nueva Consulta
				</Button>
			) : (
				<Tooltip className='new-visit-button' title='Crear Cita'>
					<IconButton onClick={() => setModalVisible(true)}>
						<InsertInvitation color='primary' />
					</IconButton>
				</Tooltip>
			)}
			<FormModal
				title='Cita'
				// @ts-expect-error stupid typescript can't tell clientName and petName are properties of row
				info={[row.clientName, row.petName, row.id?.toString() ?? '']}
				onSubmit={isFromVaccination ? handleCreateVisitVaccination : handleCreateVisit}
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				submitLabel='Crear'
				valid={vaccines ? formData.vaccines && formData.vaccines?.length > 0 : true}
			>
				<FormContent
					formData={formData}
					formMeta={isFromVaccination ? [...defaultMeta, ...vaccinationFormMeta] : defaultMeta}
					onChange={handleVisitFormChange}
				/>
			</FormModal>
		</>
	);
};
