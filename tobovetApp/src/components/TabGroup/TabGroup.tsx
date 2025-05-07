import { IconButton, Tooltip } from '@mui/material';
import { AddOutlined, PersonAddAlt1Outlined, PetsOutlined } from '@mui/icons-material';
import './TabGroup.scss';

interface TabGroupProps {
	titles: string[];
	selected: number;
	type?: 'mascota' | 'contacto';
	addLimit?: number;
	handleSelect: (newSelected: number) => void;
	handleAdd: () => void;
}

export const TabGroup = ({
	titles,
	selected,
	type = 'contacto',
	addLimit = 3,
	handleSelect,
	handleAdd,
}: TabGroupProps) => {
	return (
		<div className='tab-group'>
			{titles.map((title, idx) => (
				<div
					key={idx}
					className={selected === idx ? 'tab-selected' : ''}
					onClick={() => handleSelect(idx)}
				>
					{title}
				</div>
			))}
			{titles.length < addLimit && (
				<Tooltip title={`Añadir ${type}`}>
					<IconButton size='large' onClick={handleAdd}>
						{type === 'contacto' ? (
							<PersonAddAlt1Outlined color='primary' />
						) : (
							<>
								<PetsOutlined color='primary' />
								<AddOutlined fontSize='small' color='primary' />
							</>
						)}
					</IconButton>
				</Tooltip>
			)}{' '}
		</div>
	);
};
