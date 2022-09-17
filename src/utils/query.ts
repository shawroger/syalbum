import { useRoute } from "vue-router";

export function useSyParams() {
	const route = useRoute();

	const id = String(route.query.baseid) ?? "";

	return {
		id,
	};
}
