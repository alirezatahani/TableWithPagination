import React from "react";
import styles from "./typography.module.scss";

type TextType = "p" | "span" | "h1" | "h5";

type Props = {
	children: React.ReactNode;
	type?: TextType;
	variant?: "heading" | "subtitle" | "title" | "primary" | "tableCol" | string;
	className?: string;
	style?: any;
};

export const Typography = ({
	children,
	type = "p",
	variant = "title",
	className,
	style,
}: Props) => {
	return React.createElement(
		type,
		{
			style,
			className: [styles[variant], className].join(" "),
		},
		children,
	);
};
