import { invokeDenoNodeJSTransformer } from "DNT";
import { parse as parseJSONC } from "STD_JSONC";
const jsrManifest = parseJSONC(await Deno.readTextFile("./jsr.jsonc"));
await invokeDenoNodeJSTransformer({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: jsrManifest.exports,
	generateDeclarationMap: true,
	mappings: {
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
		//@ts-ignore Lazy type.
		name: jsrManifest.name,
		//@ts-ignore Lazy type.
		version: jsrManifest.version,
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
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-npm",
	outputDirectoryPreEmpty: true
});
