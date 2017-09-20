import json from 'rollup-plugin-json';

export default {
	output: {
		format: 'iife'
	},
	plugins: [
		json()
	]
};