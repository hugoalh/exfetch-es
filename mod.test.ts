import { ExFetch } from "./mod.ts";
Deno.test("Single 1", {
	permissions: {
		net: ["jsonplaceholder.typicode.com"]
	}
}, async () => {
	const response = await new ExFetch().single("https://jsonplaceholder.typicode.com/posts");
	console.log(await response.json());
});
Deno.test("URLPaginate 1", {
	permissions: {
		net: ["api.github.com"]
	}
}, async () => {
	const responses = await new ExFetch().urlPaginate("https://api.github.com/repos/microsoft/vscode/labels?per_page=100");
	const result = await Array.fromAsync(responses.map((response) => {
		return response.json();
	}));
	console.log(result);
	console.log(`Result Length: ${result.length}`);
	console.log(`Result Flat Length: ${result.flat().length}`);
});
