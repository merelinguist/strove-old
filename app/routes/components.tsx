// import { MailIcon } from "@heroicons/react/solid";
// import { ReactNode } from "react";

// import { Button } from "~/components/Button";

// function Container({ children }: { children: ReactNode }) {
// 	return <div className="prose mx-auto">{children}</div>;
// }

// export default function ComponentsRoute() {
// 	return (
// 		<div className="p-8 max-w-5xl mx-auto">
// 			<Container>
// 				<h1>Components</h1>
// 				<p>
// 					Sint quis laborum non deserunt cupidatat pariatur tempor cupidatat do
// 					aliquip sit officia. Nisi ipsum aliquip aliquip commodo Lorem deserunt
// 					qui ipsum proident qui in. Exercitation id eu aliquip in excepteur
// 					aliqua.
// 				</p>
// 			</Container>

// 			<div className="mt-8 space-y-8">
// 				{(Object.keys(Button.Variant) as (keyof typeof Button.Variant)[]).map(
// 					(variant) => (
// 						<div className="px-4 py-8 border rounded-lg">
// 							<div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
// 								{(Object.keys(Button.Size) as (keyof typeof Button.Size)[]).map((size) => (
// 									<Button size={size} variant={variant}>
// 										<Button.Icon icon={MailIcon} />
// 										Button text
// 									</Button>
// 								))}
// 							</div>
// 						</div>
// 					),
// 				)}
// 			</div>
// 		</div>
// 	);
// }
