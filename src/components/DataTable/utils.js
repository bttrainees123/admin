import { defaultThemes } from "react-data-table-component";


export const caseInsensitiveSort = (rowA, rowB) => {
	const a = rowA.title.toLowerCase();
	const b = rowB.title.toLowerCase();

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};


export const customStyles = {
	header: {
		style: {
			minHeight: '56px',
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: defaultThemes.default.divider.default,
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
};


