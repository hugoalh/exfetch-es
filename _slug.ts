//deno-lint-ignore-file no-process-globals no-undef -- `process` may exists.
export const slug: string = ((): string => {
	//@ts-ignore `Bun` may exists.
	if (typeof Bun !== "undefined") {
		return `Bun/${process.versions.bun}-${process.platform}-${process.arch}`;
	}
	if (typeof navigator !== "undefined" && navigator?.userAgent === "Cloudflare-Workers") {
		return `CloudflareWorkers/*`;
	}
	if (typeof Deno !== "undefined") {
		const {
			arch,
			env,
			os
		} = Deno.build;
		const info: string[] = [Deno.version.deno, os, arch];
		if (typeof env !== "undefined") {
			info.push(env);
		}
		return `Deno/${info.join("-")}`;
	}
	return `NodeJS/${process.versions.node}-${process.platform}-${process.arch}`;
})();
