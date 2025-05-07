import { Button, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import { Card, CardBody, Col, Modal, Row, Table } from 'reactstrap';
import { ICompany, IPaymentArticles, IPaymentType } from 'interfaces';
import { texts } from 'utils';
import logo from 'assets/logoNoBgCaqui.png';
import './PaymentModal.scss';

interface PaymentModalProps {
	payment: IPaymentArticles;
	receiptVisibility: boolean;
	setReceiptVisibility: (val: boolean) => void;
	updatePaymentMethod: (val: IPaymentType) => void;
	handleSubmit: (type: 'guardar' | 'cobrar' | 'borrar') => Promise<void>;
}
export const PaymentModal = ({
	payment,
	receiptVisibility,
	setReceiptVisibility,
	updatePaymentMethod,
	handleSubmit,
}: PaymentModalProps) => {
	let clientInfo: string[] = [];
	if (payment.company) {
		const { name, nif, address, city, province, postCode, country } = payment.company as ICompany;
		clientInfo = [name, nif, address, city, province, postCode, country];
	} else {
		const { client, document, address, city, province, postcode } = payment.client;
		clientInfo = [client, document, address, city, province, postcode] as string[];
	}

	return (
		<Modal isOpen={receiptVisibility} toggle={() => setReceiptVisibility(false)} centered>
			<Card className='receipt-modal-content'>
				<CardBody>
					<div id='factura-pdf'>
						<Row className='header'>
							<Col md={3}>
								<img src={logo} height='132px' alt='Logo' />
							</Col>
							<Col md={4} className='left-side'>
								<div className='company-info'>
									<Typography variant='h5'>TOBOVET S.L.P.</Typography>
									<Typography variant='body2'>B16393159</Typography>
									<Typography variant='body2'>633 443 858 / 622 001 250</Typography>
									<Typography variant='body2'>C. Guatemala, 16,</Typography>
									<Typography variant='body2'>Jerez de la Frontera,</Typography>
									<Typography variant='body2'>España</Typography>
								</div>
							</Col>
							<Col md={5} className='client-info'>
								<Typography variant='h6'>{payment.date.toLocaleDateString('es')}</Typography>
								{payment.number && (
									<Typography variant='h6'>Nº de Factura: {payment.number}</Typography>
								)}
								{clientInfo.map((value, idx) => (
									<Typography key={idx} variant='body2'>
										{value}
									</Typography>
								))}
							</Col>
						</Row>
						{payment.pet ? (
							<Row className='pet-info'>
								<Typography variant='body1'>
									Chip de la mascota: <b>{payment.pet.chip}</b>
								</Typography>
								<Typography variant='body1'>
									Nombre de la mascota: <b>{payment.pet.pet}</b>
								</Typography>
							</Row>
						) : (
							<></>
						)}
						<Table className='payment-info'>
							<thead>
								<tr style={{ borderBottom: '1px solid rgba(0,0,0,0.7)' }}>
									<th>Descripción</th>
									<th>Precio ud.</th>
									<th>Cantidad</th>
									<th>IVA</th>
									{payment.articles.some(({ discount }) => discount > 0) && <th>Descuento</th>}
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{payment.articles.map(({ quantity, name, pvp, tax, discount }) => {
									if (pvp)
										return (
											<tr key={name} style={{ borderBottom: '1px dashed rgba(0,0,0,0.4)' }}>
												<td style={{ textAlign: 'left' }}>{name}</td>
												<td style={{ textAlign: 'right', width: '100px' }}>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
														}}
													>
														{Math.round((pvp / 1.21) * 100) / 100}
														<InputAdornment position='end'>€</InputAdornment>
													</div>
												</td>
												<td style={{ textAlign: 'right', width: '85px' }}>{quantity}</td>
												<td style={{ textAlign: 'right', width: '85px' }}>
													<div>{tax} %</div>
													<>
														{Math.round(
															(tax === 21
																? (Math.round(pvp * (1 - discount / 100) * 100) / 100) * quantity
																: Math.round(
																		((pvp * (tax + 100)) / 121) * (1 - discount / 100) * 100,
																	) / 100) *
																quantity *
																(payment.articles[0].tax / (payment.articles[0].tax + 100)) *
																100,
														) / 100}{' '}
														€
													</>
												</td>
												{payment.articles.some(({ discount }) => discount > 0) &&
													(discount > 0 ? (
														<td style={{ textAlign: 'right', width: '85px' }}>
															<div>{discount} %</div>
															<>
																{tax === 21
																	? (Math.round(pvp * (discount / 100) * 100) / 100) * quantity
																	: Math.round(
																			(Math.round(
																				((pvp * (tax + 100)) / 121) * (discount / 100) * 100,
																			) /
																				100) *
																				quantity *
																				100,
																		) / 100}{' '}
																€
															</>
														</td>
													) : (
														<td></td>
													))}
												<td style={{ textAlign: 'right', width: '100px' }}>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
														}}
													>
														{pvp === null || pvp === -1
															? 0
															: tax === 21
																? (Math.round(pvp * (1 - discount / 100) * 100) / 100) * quantity
																: Math.round(
																		(Math.round(
																			((pvp * (tax + 100)) / 121) * (1 - discount / 100) * 100,
																		) /
																			100) *
																			quantity *
																			100,
																	) / 100}
														<InputAdornment position='end'>€</InputAdornment>
													</div>
												</td>
											</tr>
										);
								})}
							</tbody>
							<tfoot>
								<tr>
									<th />
									<th />
									<th>Resumen:</th>
								</tr>
								<tr>
									<td />
									<td />
									<td />
									<td>Subtotal:</td>
									<td>
										{`${
											isNaN(payment.total)
												? '0 €'
												: Math.round(
														payment.articles
															.map(
																({ pvp, tax, quantity, discount }) =>
																	(pvp &&
																		Math.round(
																			(pvp / (1 + tax / 100)) *
																				(1 - discount / 100) *
																				quantity *
																				100,
																		) / 100) ??
																	0,
															)
															.reduce((partialSum, a) => partialSum + a, 0) * 100,
													) / 100
										} €`}
									</td>
								</tr>
								<tr>
									<td />
									<td />
									<td />
									<td>IVA:</td>
									<td>
										{`${
											isNaN(payment.total)
												? '0 €'
												: Math.round(
														(payment.total -
															payment.articles
																.map(
																	({ pvp, tax, quantity, discount }) =>
																		(pvp &&
																			Math.round(
																				(pvp / (1 + tax / 100)) *
																					(1 - discount / 100) *
																					quantity *
																					100,
																			) / 100) ??
																		0,
																)
																.reduce((partialSum, a) => partialSum + a, 0)) *
															100,
													) / 100
										} €`}
									</td>
								</tr>
								<tr>
									<td />
									<td />
									<td />
									<td>Total:</td>
									<td>{`${isNaN(payment.total) ? '0 €' : payment.total} €`}</td>
								</tr>
							</tfoot>
						</Table>
						<Typography className='mucho-texto'>{texts.es.dataTreatment}</Typography>
						<Select
							value={payment.type}
							className='form-input'
							onChange={({ target: { value } }) => updatePaymentMethod(value as IPaymentType)}
							data-html2canvas-ignore
						>
							{['Efectivo', 'Tarjeta', 'Bizum', 'Transferencia'].map(type => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className='button-group' data-html2canvas-ignore>
						<Button variant='contained' onClick={() => handleSubmit('cobrar')}>
							Tramitar cobro
						</Button>
						<Button onClick={() => setReceiptVisibility(false)}>Cancelar</Button>
					</div>
				</CardBody>
			</Card>
		</Modal>
	);
};
