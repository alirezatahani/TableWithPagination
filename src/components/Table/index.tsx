import React, { useMemo } from "react";
import { NoData } from "../NoData";
import { Typography } from "../Typography";
import { Pagination } from "../Pagination";
import styles from "./table.module.scss";

interface Column {
	title: string;
	key: string;
	render?: (record: any) => React.ReactNode;
}
interface TableProps {
	hasPagination?: boolean;
	loading?: boolean;
	paginationData?: {
		hasNextPage?: boolean;
		hasPreviousPage?: boolean;
		pageIndex?: number;
		pageSize?: number;
		totalPages?: number;
	};
	columns: Column[];
	data: any[];

	hasDivider?: boolean;
	onChange?: (page: number) => void;
}

export const Table = ({
	hasPagination = false,
	loading = false,
	paginationData,
	columns = [],
	data = [],
	hasDivider,

	onChange,
}: TableProps) => {
	const headers = useMemo(() => {
		return columns?.map((column, index) => {
			return (
				<th key={index} className={styles.thContainer}>
					<Typography variant="tableCol">{column.title}</Typography>
				</th>
			);
		});
	}, [columns]);

	const items = useMemo(() => {
		return data?.map((_data, index) => {
			const isNotLast = index !== data.length - 1;

			return (
				<>
					<tr
						key={index}
						className={isNotLast && hasDivider ? styles.trDivider : ""}
					>
						{columns?.map((column, index) => {
							return (
								<td className={styles.tdContainer} key={index}>
									{column.render ? (
										column.render(_data)
									) : (
										<Typography variant="subtitle" key={index}>
											{_data[column.key]}
										</Typography>
									)}
								</td>
							);
						})}
					</tr>
				</>
			);
		});
	}, [columns, data]);

	if (loading) return <div>Loading</div>;
	if (!loading && data?.length === 0) return <NoData />;

	return (
		<div style={{ maxWidth: "100%" }}>
			<table style={{ width: "100%" }}>
				<thead style={{ width: "100%" }}>
					<tr>{headers}</tr>
				</thead>
				<tbody style={{ width: "100%" }}>{items}</tbody>
			</table>
			<Pagination
				hasPagination={hasPagination}
				onPageChange={onChange}
				paginationData={
					paginationData ?? {
						hasNextPage: true,
						hasPreviousPage: true,
						pageIndex: 1,
						pageSize: 10,
						totalPages: 10,
					}
				}
			/>
		</div>
	);
};
