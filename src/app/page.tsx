"use client";

import { useEffect, useState, useMemo } from "react";
import { useFetch } from "components/hooks/useFetch";

import styles from "./page.module.css";
import { Table } from "components/components/Table";
import { Avatar } from "components/components/Avatar";
import useDidMountEffect from "components/hooks/useDidMountEffect";

export default function Home() {
	const [page, setPage] = useState(1);

	const [usersData, fetchUsers] = useFetch();

	useDidMountEffect(() => {
		fetchUsers({
			method: "get",
			url: `users?page=${page}`,
		});
	}, [page]);

	const columns = useMemo(() => {
		return [
			{
				key: "avatar",
				title: "Avatar",
				render: (record: any) => (
					<Avatar width={90} height={90} src={record.avatar} />
				),
			},
			{
				key: "first_name",
				title: "First Name",
			},
			{
				key: "last_name",
				title: "Last Name",
			},
			{
				key: "email",
				title: "Email",
			},
		];
	}, []);

	const paginationProps = useMemo(() => {
		return {
			hasNextPage: usersData?.data?.page < usersData?.data?.total_pages,
			hasPreviousPage: usersData?.data?.page > 1,
			pageIndex: usersData?.data?.page,
			pageSize: usersData?.data?.per_page,
			totalPages: usersData?.data?.total_pages,
		};
	}, [usersData?.data]);

	return (
		<main className={styles.main}>
			<Table
				hasPagination={usersData?.data?.total_pages > 1}
				columns={columns}
				data={usersData?.data?.data ?? []}
				onChange={setPage}
				paginationData={paginationProps}
				hasDivider
				loading={usersData?.loading}
			/>
		</main>
	);
}
