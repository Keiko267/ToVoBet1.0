import { useEffect, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { FormContent, FormModal, ISelectOption, Table } from 'components';
import { deleteToApi, fetchApi, postToApi, putToApi } from 'controllers/Controller';
import { IArticle } from 'interfaces';
import { texts } from 'utils';

export const Articulos = () => {
	const cols: GridColDef[] = [
		{ field: 'name', headerName: texts.es.name, width: 350 },
		{ field: 'group', headerName: texts.es.group, width: 200 },
		{
			field: 'unit_price',
			headerName: texts.es.price,
			width: 90,
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
			field: 'pvp',
			headerName: texts.es.rp,
			width: 110,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<>
						{row.pvp}
						<InputAdornment position='end'>€</InputAdornment>
					</>
				);
			},
		},
		{ field: 'stock', headerName: texts.es.stock, width: 70 },
		{ field: 'validity', headerName: texts.es.validity, width: 90 },
		{
			field: 'acciones',
			headerName: texts.es.actions,
			width: 100,
			sortable: false,
			filterable: false,
			renderCell: ({ row }: GridRenderCellParams) => (
				<div className='actions-column'>
					<Tooltip title='Editar'>
						<IconButton onClick={() => handleEditArticulo(row)}>
							<EditOutlined color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Borrar'>
						<IconButton onClick={() => handleDeleteArticulo(row)}>
							<DeleteOutlined color='primary' />
						</IconButton>
					</Tooltip>
				</div>
			),
		},
	];
	const initialArticulo = {
		id: null,
		name: null,
		group: null,
		pvp: 0,
		validity: 365,
		stock: null,
	};
	const [searchVal, setSearchVal] = useState('');
	const [formOpen, setFormOpen] = useState(false);
	const [deleteConfirmationOpen, setDeleteConfirmation] = useState(false);
	const [formData, setFormData] = useState<IArticle>(initialArticulo);
	const [formSubmitLabel, setFormSubmitLabel] = useState<'Añadir' | 'Guardar' | 'Borrar'>('Añadir');
	const [rows, setRows] = useState<IArticle[]>([]);
	const [groupOptions, setGroupOptions] = useState<ISelectOption[]>([]);
	const [loading, setLoading] = useState(true);

	const handleAddArticulo = () => {
		setFormData(initialArticulo);
		setFormSubmitLabel('Añadir');
		setFormOpen(true);
	};
	const handleEditArticulo = (row: IArticle) => {
		setFormData(row);
		setFormSubmitLabel('Guardar');
		setFormOpen(true);
	};
	const handleDeleteArticulo = (row: IArticle) => {
		setFormData(row);
		setFormSubmitLabel('Borrar');
		setDeleteConfirmation(true);
	};
	const handleSubmitArticulo = () => {
		switch (formSubmitLabel) {
			case 'Añadir':
				createArticulo();
				break;
			case 'Guardar':
				updateArticulo();
				break;
			case 'Borrar':
				deleteArticulo();
				break;
		}
		setFormOpen(false);
		setDeleteConfirmation(false);
	};

	const createArticulo = async () => {
		setLoading(true);
		const dataArticulos: boolean = await postToApi('articles', formData);
		if (!dataArticulos) console.error('Error creando articulo');
		getArticulos();
	};

	const updateArticulo = async () => {
		setLoading(true);
		const dataArticulos: boolean = await putToApi('articles', formData);
		if (!dataArticulos) console.error('Error actualizando articulo');
		getArticulos();
	};

	const deleteArticulo = async () => {
		setLoading(true);
		const dataArticulos: boolean = await deleteToApi('articles', { id: formData.id });
		if (!dataArticulos) console.error('Error actualizando articulo');
		getArticulos();
		setDeleteConfirmation(false);
	};

	const handleFormChange = (key: string, newVal: never) => {
		const tempData = { ...formData };
		tempData[key as keyof IArticle] = newVal;
		setFormData(tempData);
	};

	const getArticulos = async () => {
		const dataArticulos: IArticle[] = await fetchApi('articles');
		if (dataArticulos) setRows(dataArticulos);

		const dataGroups: string[] = await fetchApi('articles/groups');
		if (dataGroups) setGroupOptions(dataGroups.map(value => ({ value: value, label: value })));

		setLoading(false);
	};

	useEffect(() => {
		getArticulos();

		const interval = setInterval(() => getArticulos(), 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Container className='content'>
			<Card>
				<CardBody>
					<Button variant='contained' onClick={handleAddArticulo}>
						{texts.es.addItem}
					</Button>
					<div className='filters'>
						<TextField
							autoFocus
							placeholder={texts.es.findItem}
							variant='outlined'
							value={searchVal}
							onChange={({ target: { value } }) => setSearchVal(value)}
							fullWidth
						/>
					</div>
					<Table
						rows={rows.filter(({ name, group }) =>
							searchVal.length
								? name?.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase()) ||
									group?.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
								: true,
						)}
						cols={cols}
						loading={loading}
					/>
				</CardBody>
			</Card>
			<FormModal
				title='Articulo'
				visible={formOpen}
				submitLabel={formSubmitLabel}
				onClose={() => setFormOpen(false)}
				onSubmit={handleSubmitArticulo}
			>
				<FormContent
					formData={formData}
					formMeta={[
						{
							label: texts.es.name,
							key: 'name',
						},
						{
							label: texts.es.group,
							key: 'group',
							type: 'autocomplete',
							options: groupOptions,
						},
						{
							label: texts.es.rp,
							key: 'pvp',
							type: 'currency',
						},
						{
							label: texts.es.validity,
							key: 'validity',
							type: 'number',
							//Hidden until group is "Vacuna"
							hidden: formData.group !== 'Vacuna',
						},
						{
							label: texts.es.stock,
							key: 'stock',
							type: 'number',
						},
					]}
					onChange={handleFormChange}
				/>
			</FormModal>
			<FormModal
				title='Articulo'
				visible={deleteConfirmationOpen}
				submitLabel={formSubmitLabel}
				onClose={() => setDeleteConfirmation(false)}
				info={['¿Estás seguro de que quieres borrar este articulo?']}
				onSubmit={handleSubmitArticulo}
			></FormModal>
		</Container>
	);
};
