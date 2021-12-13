import { RefObject, useEffect, useState } from "react";

import { classNames } from "~/utils/classNames";

export function TitleBar({
	scrollContainerRef,
}: {
	scrollContainerRef: RefObject<HTMLDivElement>;
}) {
	const [isScrolled, setIsScrolled] = useState(false);

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollTop } = scrollContainerRef.current;

			if (scrollTop === 0) {
				setIsScrolled(false);
			}

			if (scrollTop > 0) {
				setIsScrolled(true);
			}
		}
	};

	useEffect(() => {
		scrollContainerRef?.current?.addEventListener("scroll", handleScroll);
		return () =>
			scrollContainerRef?.current?.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={classNames(
				isScrolled ? "shadow" : "",
				"sticky top-0 z-10 px-3 py-2 transition-shadow ease-in-out duration-150 bg-white bg-opacity-90 filter-blur",
			)}
		>
			<div className="flex items-center justify-between">
				<p className="text-sm font-bold">Writing</p>
				<p>New</p>
			</div>
		</div>
	);
}
