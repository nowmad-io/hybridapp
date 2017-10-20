import variable from './../variables/platform';

export default (variables = variable) => {
	const thumbnailTheme = {
		'.square': {
			borderRadius: 0,
			'.xsmall': {
				width: 18,
				height: 18,
				borderRadius: 0,
			},
			'.small': {
				width: 24,
				height: 24,
				borderRadius: 0,
			},
			'.large': {
				width: 80,
				height: 80,
				borderRadius: 0,
			},
		},
		'.xsmall': {
			width: 18,
			height: 18,
			borderRadius: 18,
			'.square': {
				borderRadius: 0,
			},
		},
		'.small': {
			width: 24,
			height: 24,
			borderRadius: 18,
			'.square': {
				borderRadius: 0,
			},
		},
		'.large': {
			width: 80,
			height: 80,
			borderRadius: 40,
			'.square': {
				borderRadius: 0,
			},
		},
		width: 40,
		height: 40,
		borderRadius: 28,
	};

	return thumbnailTheme;
};
