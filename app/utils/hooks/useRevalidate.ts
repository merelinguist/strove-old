import { useCallback } from "react";
import { useNavigate } from "remix";

export const useRevalidate = () => {
	const navigate = useNavigate();

	return useCallback(() => {
		navigate(".", { replace: true });
	}, [navigate]);
};
