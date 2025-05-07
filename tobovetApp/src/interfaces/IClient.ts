export interface IPet {
	id: number | null;
	pet: string | null;
	status: number | null;
	chip: number | null;
	sex: 'F' | 'M' | 'O' | null;
	birthdate: Date | null;
	species: string | null;
	breed?: string | null;
	sterilized: number | null;
	vet: number | null;
	observations?: string | null;
	clinicalObservations?: string | null;
}

export interface IContact {
	id: number;
	contact: string;
	phone: string | null;
	email: string | null;
}

export interface IClient {
	id: number | null;
	client: string | null;
	document: string | null;
	status: number | null;
	address: string | null;
	city: string | null;
	postcode: number | null;
	province: string | null;
	observations?: string | null;
	pets: IPet[];
	contacts: IContact[];
}

export interface IClientesRow {
	clientId: number | null;
	clientName: string | null;
	id: number | null;
	petName: string | null;
	species: string | null;
	breed?: string | null;
	chip: number | null;
	vet: number | null;
}
