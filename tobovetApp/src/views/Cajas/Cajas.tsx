import { useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Table } from 'components';

interface ICaja {}
// Inicialmente mostrar los ultimos 31 dias
export const Cajas = () => {
	const rows = [
		{
			id: 1,
			fecha: '2024-03-10T23:00:00.000Z',
			cliente: 'test',
			impuesto: '21%',
			total: '3',
			pendienteDeCobro: 'no',
		},
	];
	const cols = [
		{ field: 'id', headerName: 'Numero', width: 80 },
		{ field: 'fecha', headerName: 'Fecha', width: 250 },
		{ field: 'cliente', headerName: 'Cliente', width: 150 },
		{ field: 'impuesto', headerName: 'Impuesto', width: 90 },
		{ field: 'total', headerName: 'Total', width: 90 },
		{ field: 'pendienteDeCobro', headerName: 'Pendiente de cobro', width: 150 },
		{
			field: 'acciones',
			headerName: 'Acciones',
			width: 250,
			sortable: false,
			filterable: false,
			renderCell: ({ row }: GridRenderCellParams) => (
				<>
					<Button variant='outlined' onClick={() => handleSummaryCaja(row)}>
						Resumen
					</Button>
					<Button variant='outlined' onClick={() => handleCloseCaja(row)}>
						Cerrar
					</Button>
				</>
			),
		},
	];

	const [searchVal, setSearchVal] = useState<Dayjs | null>(null);

	const handleSummaryCaja = (row: ICaja) => {
		console.log('TODO open modal for summary', row);
	};
	const handleCloseCaja = (row: ICaja) => {
		console.log('TODO open modal for closing', row);
	};
	const handleAddCaja = () => {};

	return (
		<Container className='content'>
			<Card>
				<CardBody>
					<Button variant='contained' onClick={handleAddCaja}>
						Abrir caja
					</Button>
					<div className='filters'>
						<DatePicker value={searchVal} onChange={value => setSearchVal(value)} />
					</div>
					<Table rows={rows} cols={cols} loading={false} />
				</CardBody>
			</Card>
		</Container>
	);
};
