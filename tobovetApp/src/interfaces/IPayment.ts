import { IArticle } from './IArticle';
import { IClient, IPet } from './IClient';
import { ICompany } from './ICompany';

export interface IPayment {
	id: number;
	client: IClient;
	pet: IPet;
	company?: ICompany;
	date: Date;
	pending: number;
	virtual: number;
	type: IPaymentType;
	total: number;
	number?: number;
}
export interface IPaymentArticles extends IPayment {
	articles: IPaymentArticle[];
}

export interface IPaymentArticle extends IArticle {
	articleId: number;
	quantity: number;
	discount: number;
	tax: number;
}

export type IPaymentType = 'Efectivo' | 'Tarjeta' | 'Bizum' | 'Transferencia';
