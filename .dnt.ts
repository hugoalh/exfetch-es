import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	copyAssets: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: configJSR.getExports(),
	generateDeclarationMap: true,
	mappings: {
		"./_slug_deno.ts": "./_slug_node.ts",
		"https://raw.githubusercontent.com/hugoalh/http-header-link-es/v1.0.3/mod.ts": {
			name: "@hugoalh/http-header-link",
			version: "^1.0.3"
		},
		"https://raw.githubusercontent.com/hugoalh/http-header-retry-after-es/v1.1.0/mod.ts": {
			name: "@hugoalh/http-header-retry-after",
			version: "^1.1.0"
		}
	},
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
		description: "A module to extend `fetch`.",
		keywords: [
			"exfetch",
			"fetch"
		],
		homepage: "https://github.com/hugoalh/exfetch-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/exfetch-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/exfetch-es.git"
		},
		scripts: {
		},
		engines: {
			node: ">=18.12.0"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "npm",
	outputDirectoryPreEmpty: true
});
