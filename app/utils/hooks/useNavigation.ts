import { useLocation } from "remix";

export const useNavigation = (
	navigation: { name: string; href: string; current: boolean }[],
) => {
	const location = useLocation();

	navigation.forEach((item, index) => {
		// eslint-disable-next-line no-param-reassign
		navigation[index].current = item.href === location.pathname;
	});
};
