const million = require('million/compiler');
module.exports = {
	webpack: {
		plugins: { add: [million.webpack({ auto: true })] },
		stats: {warnings:false},
		ignoreWarnings: [/./]
	}
};