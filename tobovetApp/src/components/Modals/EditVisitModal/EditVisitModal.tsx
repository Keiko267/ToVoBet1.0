import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { CreateVisitButton, FormContent, FormModal, IFormMeta, ISelectOption } from 'components';
import { fetchApi } from 'controllers/Controller';
import { IUser, IVaccine, IVisit } from 'interfaces';
import './EditVisitModal.scss';

interface EditVisitModalProps {
	formData: IVisit;
	formOpen: boolean;
	formSubmitLabel: string;
	vaccineOptions: IVaccine[];
	setFormOpen: (newVal: boolean) => void;
	handleSubmitCita: () => void;
	handleFormChange: (key: string, newVal: never) => void;
}

export const EditVisitModal = ({
	formData,
	formOpen,
	formSubmitLabel,
	vaccineOptions,
	setFormOpen,
	handleSubmitCita,
	handleFormChange,
}: EditVisitModalProps) => {
	const [vetOptions, setVetOptions] = useState<ISelectOption[]>([]);

	const vaccinesFormMeta: IFormMeta[] =
		formData.vaccines?.map(
			({ id }, idx): IFormMeta => ({
				label: vaccineOptions.find(vac => vac.id === id)?.name ?? '',
				key: idx,
				type: 'vaccineValidity',
			}),
		) ?? [];

	const getData = async () => {
		const dataUsers: IUser[] = await fetchApi('users');
		if (dataUsers) setVetOptions(dataUsers.map(({ id, name }) => ({ value: id, label: name })));
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<FormModal
			title='Cita'
			info={[formData.client || '', formData.pet || '', `nhc: ${formData.petId?.toString() ?? ''}`]}
			visible={formOpen}
			submitLabel={formSubmitLabel}
			onClose={() => setFormOpen(false)}
			onSubmit={handleSubmitCita}
		>
			<Row>
				<Col xl={6} md={12}>
					<FormContent
						formData={formData}
						formMeta={[
							{
								label: 'Fecha',
								key: 'date',
								type: 'date',
							},
							{
								label: 'Veterinario',
								key: 'vetId',
								type: 'select',
								options: vetOptions,
							},
							{
								label: 'Motivo de consulta',
								key: 'visitReason',
							},
							{
								label: 'Anamnesis',
								key: 'observations',
								type: 'textarea',
							},
							{
								label: 'Peso',
								key: 'weight',
								type: 'weight',
							},
							{
								label: 'Condiciones (1-5)',
								key: 'condition',
								type: 'number',
							},
							{
								label: 'Temperatura',
								key: 'temperature',
								type: 'temp',
							},
							{
								label: 'Sintomas',
								key: 'symptoms',
								type: 'textarea',
							},
						]}
						onChange={handleFormChange}
					/>
				</Col>
				<Col xl={6} md={12}>
					<FormContent
						formData={formData}
						formMeta={[
							{
								label: 'Tests',
								key: 'tests',
							},
							{
								label: 'Diagnóstico',
								key: 'diagnostics',
							},
							{
								label: 'Pruebas Diagnósticas',
								key: 'testDiagnostics',
								type: 'textarea',
							},
							{
								label: 'Tratamiento',
								key: 'treatment',
								type: 'textarea',
							},
							{
								label: 'Vacunas',
								key: 'vaccines',
								type: 'multiselect',
								options: vaccineOptions.map(({ id, name }) => ({
									value: id,
									label: name,
								})),
							},
							...vaccinesFormMeta,
							{
								label: 'Desparasitación',
								key: 'deworm',
							},
							{
								label: 'Recomendaciones',
								key: 'recommendations',
								type: 'textarea',
							},
							{
								label: 'Completado',
								key: 'completed',
								type: 'select',
								options: [
									{ label: 'Sí', value: 1 },
									{ label: 'No', value: 0 },
								],
							},
						]}
						onChange={handleFormChange}
					/>
				</Col>
			</Row>

			<CreateVisitButton
				row={{
					clientId: formData.clientId,
					id: formData.petId,
					clientName: formData.client ?? '',
					petName: formData.pet ?? '',
					species: '',
					breed: '',
					chip: -1,
					vet: formData.vetId,
				}}
				isFromHistorical
			/>
		</FormModal>
	);
};
