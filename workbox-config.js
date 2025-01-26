module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,ttf,ico,html,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};