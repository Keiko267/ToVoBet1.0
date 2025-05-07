import { PropsWithChildren } from 'react';
import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material';
import './FormModal.scss';

interface FormModalProps extends PropsWithChildren {
	title: string;
	info?: (string | null)[];
	visible: boolean;
	submitLabel: string;
	valid?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	customStyles?: React.CSSProperties;
}

export const FormModal = ({
	title,
	info,
	visible,
	submitLabel,
	onClose,
	onSubmit,
	children,
	valid = true,
}: FormModalProps) => {
	return (
		<Modal open={visible} onClose={onClose}>
			<Box
				className='form-container'
				sx={{
					bgcolor: 'background.paper',
					p: 4,
				}}
			>
				<Typography variant='h4' className='form-title'>
					{`${submitLabel} ${title}`}
				</Typography>
				{info && <Typography variant='h6'>{info.toString().replaceAll(',', ' - ')}</Typography>}
				<>{children}</>
				<ButtonGroup className='form-buttons-container'>
					<Button
						disabled={!valid}
						variant='contained'
						onClick={onSubmit}
						sx={{ marginRight: '10px' }}
					>
						{submitLabel}
					</Button>
					<Button variant='text' onClick={onClose} sx={{ outline: 'none' }}>
						Cancelar
					</Button>
				</ButtonGroup>
			</Box>
		</Modal>
	);
};
