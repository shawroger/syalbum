import { useRoute } from "vue-router";

export function getBaseId() {
	try {
		const e = window.frameElement!.parentElement!.parentElement;

		if (e) {
			const id = e.getAttribute("data-node-id");

			return id || "";
		}
		return "";
	} catch (e) {
		return "";
	}
	return "";
}

export function useSyParams() {
	const route = useRoute();

	const id = String(route.query.baseid) ?? "";

	return {
		id,
	};
}
