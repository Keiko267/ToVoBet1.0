import axios from 'axios';

export const fetchApi = async (path: string, parameters: object | null = null) => {
	const headers = {
		'Content-Type': 'application/json',
	};
	try {
		const data = await axios({
			method: 'GET',
			headers,
			url: import.meta.env.VITE_BACKEND_URL + path, //95.63.61.71
			params: parameters,
		});

		if (data.status === 200) {
			return data.data;
		} else {
			console.error(`Error fetching ${path}`);
		}
	} catch (error) {
		console.error(error);
	}
};

export const postToApi = async (path: string, body: object | null = null) => {
	const headers = {
		'Content-Type': 'application/json',
	};
	try {
		const data = await axios({
			method: 'POST',
			headers,
			url: import.meta.env.VITE_BACKEND_URL + path,
			data: body,
		});

		if (data.status === 200) {
			return true;
		} else {
			console.error(`Error creating ${path}`);
			return false;
		}
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const putToApi = async (path: string, body: object | null = null) => {
	const headers = {
		'Content-Type': 'application/json',
	};
	try {
		const data = await axios({
			method: 'PUT',
			headers,
			url: import.meta.env.VITE_BACKEND_URL + path,
			data: body,
		});

		if (data.status === 200) {
			return true;
		} else {
			console.error(`Error updating ${path}`);
			return false;
		}
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const deleteToApi = async (path: string, body: object | null = null) => {
	const headers = {
		'Content-Type': 'application/json',
	};
	try {
		const data = await axios({
			method: 'DELETE',
			headers,
			url: import.meta.env.VITE_BACKEND_URL + path,
			data: body,
		});

		if (data.status === 200) {
			return true;
		} else {
			console.error(`Error deleting ${path}`);
			return false;
		}
	} catch (error) {
		console.error(error);
		return false;
	}
};
