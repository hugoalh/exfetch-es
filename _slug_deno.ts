export const slug: string = ((): string => {
	const info: string[] = [Deno.version.deno, Deno.build.os, Deno.build.arch];
	if (typeof Deno.build.env !== "undefined") {
		info.push(Deno.build.env);
	}
	return `Deno/${info.join("-")}`;
})();
