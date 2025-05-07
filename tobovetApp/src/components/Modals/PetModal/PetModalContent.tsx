import { Typography } from '@mui/material';
import { TabGroup } from 'components/TabGroup/TabGroup';
import { FormContent, ISelectOption } from '../FormModal/FormContent';
import { useEffect, useState } from 'react';
import { fetchApi } from 'controllers/Controller';
import { IClient, IPet } from 'interfaces';
import { Card, CardBody } from 'reactstrap';

interface PetModalContentProps {
	formData: IClient;
	selectedPet: number;
	vetOptions: ISelectOption[];
	addPet: () => void;
	setSelectedPet: (n: number) => void;
	setIsValidPet: (newVal: boolean) => void;
	handlePetFormChange: (key: string, mnewVal: never) => void;
}
export const PetModalContent = ({
	formData,
	selectedPet,
	vetOptions,
	addPet,
	setSelectedPet,
	setIsValidPet,
	handlePetFormChange,
}: PetModalContentProps) => {
	const petKeys: (keyof IPet)[] = [
		'pet',
		'birthdate',
		'chip',
		'species',
		'sex',
		'sterilized',
		'status',
		'vet',
	];

	const [speciesOptions, setSpeciesOptions] = useState<ISelectOption[]>([]);
	const [breedOptions, setBreedOptions] = useState<ISelectOption[]>([]);
	const [areInvalidPet, setAreInvalidPet] = useState<{ [key: string]: boolean }>({
		pet: false,
		birthdate: false,
		chip: false,
		species: false,
		sex: false,
		sterilized: false,
		status: false,
		vet: false,
	});

	const getOptions = async () => {
		const dataSpecies: ISelectOption[] = await fetchApi('pets/species');
		const dataBreeds: ISelectOption[] = await fetchApi('pets/breeds');
		if (dataSpecies) setSpeciesOptions(dataSpecies);
		if (dataBreeds) setBreedOptions(dataBreeds);
	};

	const onPetChange = (key: string, newVal: never) => {
		const tempInvalid: { [key: string]: boolean } = {};
		if (newVal === null || newVal === '') tempInvalid[key] = true;
		else {
			tempInvalid[key] = false;
		}
		setIsValidPet(Object.values(tempInvalid).every(val => !val));
		handlePetFormChange(key, newVal);
		setAreInvalidPet({ ...areInvalidPet, ...tempInvalid });
		return tempInvalid[key];
	};

	useEffect(() => {
		getOptions();
	}, []);

	useEffect(() => {
		const tempInvalid = { ...areInvalidPet };
		petKeys.forEach(key => {
			tempInvalid[key] = onPetChange(key, formData.pets[selectedPet][key] as never);
		});
		setAreInvalidPet(tempInvalid);
	}, [selectedPet]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Card>
			<CardBody>
				<Typography variant='h5'>Mascotas</Typography>
				<TabGroup
					selected={selectedPet}
					addLimit={10}
					type='mascota'
					handleSelect={setSelectedPet}
					titles={formData.pets.map(({ pet }) => pet ?? '')}
					handleAdd={addPet}
				/>
				<FormContent
					formData={formData.pets[selectedPet]}
					formMeta={[
						{
							label: 'Nombre',
							key: 'pet',
							isInvalid: areInvalidPet['pet'],
						},
						{
							label: 'Fecha de Nacimiento',
							key: 'birthdate',
							isInvalid: areInvalidPet['birthdate'],
							type: 'date',
						},
						{
							label: 'Chip',
							key: 'chip',
							isInvalid: areInvalidPet['chip'],
							type: 'number',
						},
						{
							label: 'NHC',
							key: 'id',
							type: 'nhc',
						},
						{
							label: 'Especie',
							key: 'species',
							isInvalid: areInvalidPet['species'],
							type: 'autocomplete',
							options: speciesOptions,
						},
						{
							label: 'Raza',
							key: 'breed',
							isInvalid: areInvalidPet['breed'],
							type: 'autocomplete',
							options: breedOptions,
						},
						{
							label: 'Genero',
							key: 'sex',
							isInvalid: areInvalidPet['sex'],
							type: 'select',
							options: [
								{ label: 'Macho', value: 'M' },
								{ label: 'Hembra', value: 'F' },
								{ label: 'Otro', value: 'O' },
							],
						},
						{
							label: 'Esteril',
							key: 'sterilized',
							isInvalid: areInvalidPet['sterilized'],
							type: 'select',
							options: [
								{ label: 'Sí', value: '1' },
								{ label: 'No', value: '0' },
							],
						},
						{
							label: 'Estatus',
							key: 'status',
							isInvalid: areInvalidPet['status'],
							type: 'select',
							options: [
								{ label: 'Activo', value: '1' },
								{ label: 'Inactivo', value: '0' },
							],
						},
						{
							label: 'Veterinario',
							key: 'vet',
							isInvalid: areInvalidPet['vet'],
							type: 'select',
							options: vetOptions,
						},
						{
							label: 'Observaciones',
							key: 'observations',
						},
						{
							label: 'Observaciones Clinicas',
							key: 'clinicalObservations',
						},
					]}
					onChange={onPetChange}
				/>
			</CardBody>
		</Card>
	);
};
