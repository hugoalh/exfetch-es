import process from "node:process";
export const slug: string = ((): string => {
	if (typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") {
		return `CloudflareWorkers/*`;
	}
	//@ts-ignore `Bun` may exists.
	if (typeof Bun !== "undefined") {
		return `Bun/${process.versions.bun}-${process.platform}-${process.arch}`;
	}
	return `NodeJS/${process.versions.node}-${process.platform}-${process.arch}`;
})();
