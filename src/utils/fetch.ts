import axios from "axios";

export interface SyAttrs {
	code: string;
	msg: string;
	data: {
		id: string;
		title: string;
		type: string;
		updated: string;
		"custom-album-file": string;
	};
}

export async function getBlockAttrs(id: string) {
	const token = window.$syToken;
	const res = await axios.post(
		"/api/attr/getBlockAttrs",
		{
			id,
		},
		{
			headers: {
				Authorization: "Token " + token,
			},
		}
	);

	return res.data as SyAttrs;
}

export interface AlbumConfig {
	title: string;
	date: string[];
	root: string;
	images: Array<{
		file: string;
		caption?: string;
	}>;
}

export function defaultAlbumConfig(): AlbumConfig {
	const res: AlbumConfig = {
		title: "",
		date: [],
		root: "",
		images: [],
	};

	return res;
}

export async function getAlbumConf(url: string) {
	const res = await axios.get(url);

	return res.data as AlbumConfig;
}
