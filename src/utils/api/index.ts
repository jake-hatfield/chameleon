// packages
import axios from 'axios';

export const intercept = (newUrl: string) => {
	try {
		axios.interceptors.request.use((config) => {
			console.info(config);

			config.url = newUrl;

			return config;
		});
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
