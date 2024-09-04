module.exports = {
	webpack: {
		configure: (config) => ({
			...config,
			module: {
				...config.module,
				rules: config.module.rules.map((rule) => {
					if (rule.oneOf instanceof Array) {
						// eslint-disable-next-line no-param-reassign
						rule.oneOf[rule.oneOf.length - 1].exclude = [
							/\.(js|mjs|jsx|cjs|ts|tsx)$/,
							/\.html$/,
							/\.json$/,
						];
					}
					return rule;
				}),
			},
		}),
	},
};
