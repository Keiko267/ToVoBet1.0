import { IVaccine } from './IArticle';

export interface IVisit {
	id?: number;
	clientId: number;
	client?: string;
	petId: number;
	pet?: string;
	vetId: number;
	vet?: string;
	date: Date;
	species?: string;
	breed?: string;
	chip?: number;
	visitReason: string;
	observations?: string;
	weight?: number;
	condition?: number;
	temperature?: number;
	symptoms?: string;
	tests?: string;
	diagnostics?: string;
	testDiagnostics?: string;
	treatment?: string;
	vaccines?: IVaccine[];
	deworm?: string;
	recommendations?: string;
	completed: number;
}

export interface IVisitVaccine {
	id ?: number;
	articleId: number;
	article: string;
	petId: number;
	pet: string;
	clientId: number;
	client: string;
	appliedVisitId: number;
	validity: number;
	vaccinationDate: Date;
	nextExpirationDate: Date;
}