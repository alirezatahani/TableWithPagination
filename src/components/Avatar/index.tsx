import styles from "./avatar.module.scss";
import Image from "next/image";

interface AvatarProps {
	alt?: string;
	width: number;
	height: number;
	format?: "hexagon" | "logoHeader" | string;
	src: string;
	className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
	className,
	src,
	alt = "",
	format = "",
	...props
}) => {
	return (
		<div className={[styles[format], className].join(" ")}>
			<Image src={src} alt={alt ?? src} {...props} />
		</div>
	);
};
