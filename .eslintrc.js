module.exports = {
	"env": {
		"node": true,
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"jest": true
	},
	"extends": "eslint:recommended",
	"overrides": [],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": [
			"error",
			"never"
		],
		"arrow-spacing": [
			"error",
			{"before": true, "after": true}
		],
		"no-console": 0
	}
}
