import { Typography } from "../Typography";

export const NoData = () => {
	return (
		<div className="w-full h-full justify-center items-center flex flex-col gap-po_gap3">
			<Typography type="h5" className="text-center">
				No Data to Show
			</Typography>
		</div>
	);
};
