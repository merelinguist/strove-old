import { Children, ReactNode } from "react";

import { Avatar, avatarSizeMaps, statusStatusMaps } from "~/components/Avatar";
import { Input } from "~/components/Input";
import { keys } from "~/utils/keys";
import { toKebabCase } from "~/utils/string/toKebabCase";

function Group({ header, children }: { header: string; children: ReactNode }) {
	return (
		<div className="space-y-6">
			<div className="pb-5 border-b">
				<a href={`#${toKebabCase(header)}`}>
					<h3 className="text-lg leading-6 font-medium">{header}</h3>
				</a>
			</div>
			{children}
		</div>
	);
}

function Panel({ header, children }: { header: string; children: ReactNode }) {
	const getWrapper = () => {
		if (Children.count(children) === 1) {
			return <div className="max-w-lg mx-auto">{children}</div>;
		}

		return (
			<div className="flex max-w-lg mx-auto items-end justify-around">
				{children}
			</div>
		);
	};

	return (
		<div className="bg-white border rounded-lg divide-y divide-gray-200">
			<div className="px-4 py-5 sm:px-6">{header}</div>
			<div className="px-4 py-5 sm:p-6">{getWrapper()}</div>
		</div>
	);
}

export default function ComponentsRoute() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
			<Group header="Avatars">
				<Panel header="Circular avatars">
					{keys(avatarSizeMaps)
						.slice(0, -1)
						.map((size) => (
							<Avatar
								key={size}
								size={size}
								src="https://github.com/merelinguist.png"
							/>
						))}
				</Panel>
				<Panel header="Circular avatars with top notification">
					{keys(avatarSizeMaps).map((size, index) => (
						<Avatar
							key={size}
							size={size}
							src="https://github.com/merelinguist.png"
						>
							<Avatar.Status
								status={
									["offline", "busy", "online", "offline", "busy", "online"][
										index
									] as keyof typeof statusStatusMaps
								}
							/>
						</Avatar>
					))}
				</Panel>
				<Panel header="Circular avatars with placeholder icon">
					{keys(avatarSizeMaps)
						.slice(0, -1)
						.map((size) => (
							<Avatar key={size} size={size} />
						))}
				</Panel>
			</Group>

			<Group header="Inputs">
				<Panel header="Input with label">
					<Input>
						<Input.Label>Email</Input.Label>
						<Input.Field placeholder="you@example.com" type="email" />
					</Input>
				</Panel>

				<Panel header="Input with label">
					<Input>
						<Input.Label>Email</Input.Label>
						<Input.Field placeholder="you@example.com" type="email" />
						<Input.Description>We’ll only use this for spam</Input.Description>
					</Input>
				</Panel>

				<Panel header="Input with validation error">
					<Input>
						<Input.Label>Email</Input.Label>
						<Input.Field placeholder="you@example.com" type="email" />
						<Input.Description>We’ll only use this for spam</Input.Description>
						<Input.Error>
							{["Your password must be less than 4 characters."]}
						</Input.Error>
					</Input>
				</Panel>
			</Group>
		</div>
	);
}
