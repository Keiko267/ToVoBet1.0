import { useState } from 'react';
import { IClient, IPet } from 'interfaces';
import { FormContent, FormModal, IFormMeta } from 'components';
import DocumentModal from './DocumentModal';
import './GenerateDocument.scss';

interface GenerateDocumentModalProps {
	client: IClient;
	pet: IPet;
	docGenType: DocGenType;
	setDocGenType: (newVal: DocGenType) => void;
}
export type DocGenType =
	| ''
	| 'declinedTests'
	| 'authorizeEuthanasia'
	| 'corpseCustody'
	| 'debtRecognition';
export interface IDocGen {
	declinedTests?: string;
	items: string;
	total: number;
	nOfPayments: number;
	payments: { date: Date; amount: number }[];
}

export const GenerateDocumentModal = ({
	client,
	pet,
	docGenType,
	setDocGenType,
}: GenerateDocumentModalProps) => {
	const [isDocModalVisible, setIsDocModalVisible] = useState(false);
	const [docGenFormData, setDocGenFormData] = useState<IDocGen>({
		declinedTests: '',
		items: 'Articulo 1 - precio\nArticulo 2 - precio',
		total: 0,
		nOfPayments: 1,
		payments: [{ date: new Date(), amount: 0 }],
	});
	const [variableMeta, setVariableMeta] = useState<IFormMeta[]>([
		{
			label: `1 Pago`,
			key: 0,
			type: 'debtPayment',
		},
	]);

	const options: { [key: string]: { title: string; formMeta: IFormMeta[] } } = {
		'': { title: '', formMeta: [] },
		declinedTests: {
			title: 'Declinación de pruebas',
			formMeta: [
				{
					label: 'Pruebas a declinar',
					key: 'declinedTests',
					type: 'textarea',
				},
			],
		},
		authorizeEuthanasia: { title: 'Autorización de eutanasia', formMeta: [] },
		corpseCustody: { title: 'Custodia de cadaver', formMeta: [] },
		debtRecognition: {
			title: 'Reconocimiento de deuda',
			formMeta: [
				{
					label: 'Articulos',
					key: 'items',
					type: 'textarea',
				},
				{
					label: 'Total',
					key: 'total',
					type: 'currency',
				},
				{
					label: 'Numero de pagos',
					key: 'nOfPayments',
					type: 'number',
				},
			],
		},
	};

	const handleGenDocFormChange = (key: string, newVal: never) => {
		const tempDoc = { ...docGenFormData };

		if (key === 'paymentDate') tempDoc.payments[newVal[0]].date = newVal[1];
		else if (key === 'paymentAmount') tempDoc.payments[newVal[0]].amount = newVal[1];
		else {
			if (key === 'nOfPayments') {
				const tempMeta = [];
				tempDoc.payments = [];
				for (let index = 0; index < newVal; index++) {
					tempMeta.push({
						label: `${index + 1} Pago`,
						key: index,
						type: 'debtPayment',
					});
					tempDoc.payments.push({ date: new Date(), amount: 0 });
				}
				setVariableMeta(tempMeta as IFormMeta[]);
			}
			tempDoc[key as keyof IDocGen] = newVal;
		}
		setDocGenFormData(tempDoc);
	};

	const handleGenDocSubmit = () => {
		setIsDocModalVisible(true);
	};

	if (isDocModalVisible)
		return (
			<DocumentModal
				client={client}
				pet={pet}
				data={docGenFormData}
				type={docGenType}
				isVisible={isDocModalVisible}
				setInvisible={() => {
					setIsDocModalVisible(false);
					setDocGenType('');
				}}
			/>
		);
	else
		return (
			<FormModal
				title={options[docGenType].title}
				visible={docGenType?.length > 0}
				submitLabel={'Generar'}
				onClose={() => setDocGenType('')}
				onSubmit={handleGenDocSubmit}
			>
				<FormContent
					formData={docGenFormData}
					formMeta={[...options[docGenType].formMeta, ...variableMeta]}
					onChange={handleGenDocFormChange}
				/>
			</FormModal>
		);
};
