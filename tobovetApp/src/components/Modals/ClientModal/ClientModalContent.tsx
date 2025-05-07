import { Typography } from '@mui/material';
import { FormContent } from '../FormModal/FormContent';
import { TabGroup } from 'components/TabGroup/TabGroup';
import { IClient, IContact } from 'interfaces';
import { useEffect, useState } from 'react';
import { fetchApi } from 'controllers/Controller';
import { Card, CardBody } from 'reactstrap';

interface ClientModalContentProps {
	formData: IClient;
	selectedContact: number;
	addContact: () => void;
	setSelectedContact: (n: number) => void;
	setIsValidContact: (newVal: boolean) => void;
	setIsValidClient: (newVal: boolean) => void;
	handleClientFormChange: (key: string, newVal: never) => void;
	handleContactFormChange: (key: string, newVal: never) => void;
}
export const ClientModalContent = ({
	formData,
	selectedContact,
	addContact,
	setSelectedContact,
	setIsValidContact,
	setIsValidClient,
	handleClientFormChange,
	handleContactFormChange,
}: ClientModalContentProps) => {
	const clientKeys: (keyof IClient)[] = [
		'client',
		'document',
		'address',
		'city',
		'postcode',
		'province',
	];
	const contactKeys: (keyof IContact)[] = ['contact', 'phone', 'email'];

	const [areInvalidClient, setAreInvalidClient] = useState<{ [key: string]: boolean }>({
		client: false,
		document: false,
		address: false,
		city: false,
		postcode: false,
		province: false,
	});
	const [areInvalidContact, setAreInvalidContact] = useState<{ [key: string]: boolean }>({
		contact: false,
		phone: false,
		email: false,
	});
	const [documents, setDocuments] = useState([]);

	const onClientChange = async (key: string, newVal: never) => {
		const tempInvalid: { [key: string]: boolean } = {};
		if (newVal === null || newVal === '') tempInvalid[key] = true;
		else {
			if (key === 'document') tempInvalid[key] = documents.includes(newVal);
			else tempInvalid[key] = false;
		}
		setIsValidClient(Object.values(tempInvalid).every(val => !val));
		handleClientFormChange(key, newVal);

		setAreInvalidClient({ ...areInvalidClient, ...tempInvalid });
		return tempInvalid[key];
	};

	const onContactsChange = (key: string, newVal: never) => {
		const tempInvalid: { [key: string]: boolean } = {};
		if (newVal === null || newVal === '') tempInvalid[key] = true;
		else {
			tempInvalid[key] = false;
		}
		setIsValidContact(Object.values(tempInvalid).every(val => !val));
		handleContactFormChange(key, newVal);
		setAreInvalidContact({ ...areInvalidContact, ...tempInvalid });
		return tempInvalid[key];
	};

	useEffect(() => {
		const tempInvalid = { ...areInvalidClient };
		Promise.all(
			clientKeys.map(async key => {
				tempInvalid[key] = await onClientChange(key, formData[key] as never);
			}),
		).then(() => setAreInvalidClient(tempInvalid));

		fetchApi('clients/document').then(res => setDocuments(res));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const tempInvalid = { ...areInvalidContact };
		contactKeys.forEach(key => {
			tempInvalid[key] = onContactsChange(key, formData.contacts[selectedContact][key] as never);
		});
		setAreInvalidContact(tempInvalid);
	}, [selectedContact]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='client-modal'>
			<Card>
				<CardBody>
					<Typography variant='h5'>Cliente</Typography>
					<FormContent
						formData={formData}
						formMeta={[
							{
								label: 'Nombre',
								key: 'client',
								isInvalid: areInvalidClient['client'],
							},
							{
								label: 'Documento',
								key: 'document',
								isInvalid: areInvalidClient['document'],
							},
							{
								label: 'Dirección',
								key: 'address',
								isInvalid: areInvalidClient['address'],
							},
							{
								label: 'Ciudad',
								key: 'city',
								isInvalid: areInvalidClient['city'],
							},
							{
								label: 'CP',
								key: 'postcode',
								type: 'number',
								isInvalid: areInvalidClient['postcode'],
							},
							{
								label: 'Provincia',
								key: 'province',
								isInvalid: areInvalidClient['province'],
							},
							{
								label: 'Observaciones',
								key: 'observations',
							},
						]}
						onChange={onClientChange}
					/>
				</CardBody>
			</Card>
			<Card>
				<CardBody>
					<Typography variant='h5'>Contactos</Typography>
					<TabGroup
						selected={selectedContact}
						handleSelect={setSelectedContact}
						titles={formData.contacts.map((_a, idx) => `Contacto ${idx + 1}`)}
						handleAdd={addContact}
					/>
					<FormContent
						formData={formData.contacts[selectedContact]}
						formMeta={[
							{
								label: 'Nombre',
								key: 'contact',
								isInvalid: areInvalidContact['contact'],
							},
							{
								label: 'Telefono',
								key: 'phone',
								isInvalid: areInvalidContact['phone'],
							},
							{
								label: 'Correo',
								key: 'email',
								isInvalid: areInvalidContact['email'],
							},
						]}
						onChange={onContactsChange}
					/>
				</CardBody>
			</Card>
		</div>
	);
};
