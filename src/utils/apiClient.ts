import axios, { Method, AxiosRequestConfig } from "axios";

const makingUrl = (url: string) => {
	return process.env.BSE_URL ?? "https://reqres.in/api/" + url;
};

export interface Options extends AxiosRequestConfig {
	method: Method;
	url: string;
	data?: any;
	[x: string]: any;
}
const apiClient = async (options: Options) => {
	const url = makingUrl(options.url);

	let data = options.data;
	const headers: {
		authorization?: string;
		"Content-Type"?: "application/json" | "multipart/form-data";
	} = {
		"Content-Type": "application/json",
	};

	return axios({
		...options,
		url,
		data,
		method: options.method,
		headers: {
			...headers,
			Accept: "application/json",
		},
	});
};
export default apiClient;
