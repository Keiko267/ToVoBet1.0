import { FormModal } from 'components/Modals/FormModal/FormModal';

interface DeleteModalProps {
	title: string;
	visible: boolean;
	submitLabel: string;
	info: string;
	onClose: () => void;
	onSubmit: () => void;
}
export const DeleteModal = ({
	title,
	visible,
	submitLabel,
	info,
	onSubmit,
	onClose,
}: DeleteModalProps) => {
	return (
		<FormModal
			title={title}
			visible={visible}
			submitLabel={submitLabel}
			info={[`¿Estás seguro de que quieres borrar ${info}?`]}
			onSubmit={onSubmit}
			onClose={onClose}
		/>
	);
};
