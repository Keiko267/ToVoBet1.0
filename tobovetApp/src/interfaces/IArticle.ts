export interface IArticle {
	id: number | null;
	name: string | null;
	group: string | null;
	pvp: number | null;
	validity: number | null;
	stock: number | null;
}

export interface IVaccine {
	id: number;
	name: string;
	pvp: number;
	validity: number;
	stock: number;
}
