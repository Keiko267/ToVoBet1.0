// @ts-nocheck
import {
	Autocomplete,
	FormHelperText,
	FormLabel,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { IArticle, IClient, IContact, IPet, IVisit } from 'interfaces';

interface FormContentProps {
	formMeta: IFormMeta[];
	formData: IVisit | IClient | IContact | IPet | IArticle | IDockGen;
	onChange: (key: string, newVal: never) => void;
}

export interface IFormMeta {
	label: string;
	type?:
		| 'date'
		| 'text'
		| 'textarea'
		| 'number'
		| 'currency'
		| 'weight'
		| 'temp'
		| 'checkbox'
		| 'select'
		| 'multiselect'
		| 'autocomplete'
		| 'nhc'
		| 'vaccineValidity'
		| 'debtPayment';
	key:
		| keyof IVisit
		| keyof IClient
		| keyof IContact
		| keyof IPet
		| keyof IArticle
		| keyof IDockGen
		| number;
	options?: ISelectOption[];
	isInvalid?: boolean;
	hidden?: boolean;
}

export interface ISelectOption {
	value: string | number;
	label: string;
}

export const FormContent = ({ formMeta, formData, onChange }: FormContentProps) => {
	return (
		<div className='form-content'>
			{formMeta.map(({ label, type, key, options, isInvalid, hidden }, idx) => {
				if (hidden) return null;
				let input = <></>;
				switch (type) {
					case 'date':
						input = (
							<DateTimePicker
								value={dayjs(formData[key] as Date)}
								className='form-input'
								onChange={value => onChange(key, value as never)}
							/>
						);
						break;
					case 'currency':
					case 'weight':
					case 'temp':
					case 'number':
						input = (
							<TextField
								error={isInvalid}
								helperText={isInvalid ? 'Por favor rellena este campo.' : ''}
								value={formData[key]}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											{type === 'currency'
												? '€'
												: type === 'weight'
													? 'kg'
													: type === 'temp'
														? 'ºC'
														: ''}
										</InputAdornment>
									),
								}}
								className='form-input number'
								onChange={e => !isNaN(e.target.value) && onChange(key, e.target.value as never)}
							/>
						);
						break;
					case 'debtPayment':
						input = (
							<>
								<TextField
									error={isInvalid}
									helperText={isInvalid ? 'Por favor rellena este campo.' : ''}
									value={formData.payments[key].amount}
									InputProps={{
										endAdornment: <InputAdornment position='end'>€</InputAdornment>,
									}}
									className='form-input number debt-payment'
									onChange={e =>
										!isNaN(e.target.value) &&
										onChange('paymentAmount', [key, e.target.value] as never)
									}
								/>
								<DateTimePicker
									value={dayjs(formData.payments[key].date as Date)}
									className='form-input'
									onChange={value => onChange('paymentDate', [key, value])}
								/>
							</>
						);
						break;
					case 'vaccineValidity':
						input = (
							<TextField
								error={isInvalid}
								helperText={isInvalid ? 'Por favor rellena este campo.' : ''}
								value={formData.vaccines[key].validity}
								className='form-input number'
								onChange={e =>
									!isNaN(e.target.value) &&
									onChange('vaccinesPeriod', [key, e.target.value] as never)
								}
							/>
						);
						break;
					case 'select':
						input = (
							<Select
								value={formData[key]}
								className='form-input'
								onChange={e => onChange(key, e.target.value as never)}
							>
								{options?.map(({ value, label }) => <MenuItem value={value}>{label}</MenuItem>)}
							</Select>
						);
						break;
					//The case multiselect has the same behavior as select, except the user can select multiple options from the list at once
					case 'multiselect':
						input = (
							<div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-end' }}>
								<Select
									error={isInvalid}
									value={
										key === 'vaccines'
											? formData[key].map(({ id, articleId }) => articleId ?? id)
											: formData[key]
									}
									className='form-input'
									multiple
									onChange={e => onChange(key, e.target.value as never)}
								>
									{options?.map(({ value, label }) => <MenuItem value={value}>{label}</MenuItem>)}
								</Select>
								<FormHelperText hidden={!isInvalid} error={isInvalid}>
									Debes seleccionar al menos una opción.
								</FormHelperText>
							</div>
						);
						break;
					case 'autocomplete':
						input = (
							<Autocomplete
								value={formData[key]}
								renderInput={params => (
									<TextField
										error={isInvalid}
										helperText={isInvalid ? 'Por favor rellena este campo.' : ''}
										{...params}
										value={formData[key]}
										className='form-input'
										onChange={e => onChange(key, e.target.value as never)}
									/>
								)}
								onChange={e => {
									onChange(key, e.target.textContent as never);
								}}
								options={options || []}
							/>
						);
						break;
					default:
						input = (
							<TextField
								error={isInvalid}
								helperText={
									isInvalid
										? formData[key]?.length > 0
											? 'Documento ya existe.'
											: 'Por favor rellena este campo.'
										: ''
								}
								value={formData[key] ?? ''}
								className='form-input'
								multiline
								maxRows={10}
								disabled={type === 'nhc'}
								onChange={e => onChange(key, e.target.value as never)}
							/>
						);
						break;
				}
				return (
					<div key={idx} className='form-input-container'>
						<FormLabel className='form-input-label'>
							{(type === 'vaccineValidity' ? 'Días hasta siguiente ' : '') + label}
						</FormLabel>
						{input}
					</div>
				);
			})}
		</div>
	);
};
