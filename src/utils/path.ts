import { dataType } from "element-plus/es/components/table-v2/src/common";

export function joinRoot(pathList: string[]) {
	let res = "";

	for (let i = 0; i < pathList.length - 1; i++) {
		const item = pathList[i];
		if (item.endsWith("/")) {
			res += item;
		} else {
			res += item + "/";
		}
	}

	return res + pathList.slice(-1)[0];
}

export function joinDate(date: string[]) {
	if (date.length < 2) {
		return date[0] ?? "";
	}

	return date[0] + " ~ " + date[1];
}


