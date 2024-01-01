"use client";
import { useEffect } from "react";
import { Typography } from "../Typography";
import Styles from "./pagination.module.scss";
import usePagination from "../../hooks/usePagination";

interface PaginationProps {
	paginationData: {
		hasNextPage?: boolean;
		hasPreviousPage?: boolean;
		pageIndex?: number;
		pageSize?: number;
		totalPages?: number;
	};
	showFirstButton?: boolean;
	showLastButton?: boolean;
	hasPagination?: boolean;
	boundaryCount?: number;
	count?: number;
	siblingCount?: number;
	onPageChange?: (page: number) => void;
}

export const Pagination = ({
	paginationData: {
		hasNextPage,
		hasPreviousPage,
		pageIndex,
		pageSize,
		totalPages,
	},
	hasPagination,
	onPageChange,
	...props
}: PaginationProps) => {
	const { items, page } = usePagination({
		...{
			...props,
			count: totalPages,
			defaultPage: pageIndex,
			hideNextButton: !hasNextPage,
			hidePrevButton: !hasPreviousPage,
		},
		componentName: "Pagination",
	});

	useEffect(() => {
		onPageChange && onPageChange(page);
	}, [page]);

	const renderItem = ({
		type,
		disabled,
		onClick,
		selected,
		page,
	}: {
		type: string;
		disabled: boolean;
		selected: boolean;
		page: number | undefined;
		onClick: (event: any) => void;
	}) => {
		switch (type) {
			case "start-ellipsis":
			case "end-ellipsis": {
				return (
					<Typography
						key={type}
						variant="primary"
						style={{
							color: "#C5C8E2",
							height: 20,
							justifyContent: "center",
						}}
					>
						...
					</Typography>
				);
			}
			case "previous":
			case "last":
			case "next":
			case "first": {
				return (
					<div onClick={!disabled ? onClick : undefined} key={type}>
						<Typography
							variant="primary"
							style={{
								color: "#FE9402",
								marginLeft: 16,
								cursor: "pointer",
								opacity: disabled ? 0.5 : 1,
							}}
						>
							{type}
						</Typography>
					</div>
				);
			}
			default: {
				return (
					<div
						key={page}
						onClick={!disabled ? onClick : undefined}
						className={Styles.number}
						style={{
							borderColor: selected ? "#FE9402" : "#F2F2F7",
						}}
					>
						<Typography
							variant="primary"
							style={{
								color: selected ? "#FE9402" : "#C5C8E2",
								height: 20,
								justifyContent: "center",
							}}
						>
							{page}
						</Typography>
					</div>
				);
			}
		}
	};

	return hasPagination ? (
		<ul className={Styles.wrapper}>
			{items.map((item: any, index: number) => (
				<li key={index} style={{ listStyle: "none" }}>
					{renderItem({
						...item,
					})}
				</li>
			))}
		</ul>
	) : (
		<></>
	);
};
