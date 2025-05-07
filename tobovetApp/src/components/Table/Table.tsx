import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface TableProps {
	rows: GridRowsProp;
	cols: GridColDef[];
	loading: boolean;
}

export const Table = ({ rows, cols, loading }: TableProps) => {
	return (
		<DataGrid
			rows={rows}
			columns={cols}
			loading={loading}
			initialState={{
				pagination: { paginationModel: { pageSize: 8 } },
			}}
			columnBuffer={100}
			pageSizeOptions={[5, 8, 10, 25, 50]}
		/>
	);
};
