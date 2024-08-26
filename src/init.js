import unhandled from "cli-handle-unhandled";
import welcome from "cli-welcome";
import { getPackageJson } from "get-package-json-file";

export default async ({ clear = true }) => {
	unhandled();
	const pkgJson = await getPackageJson("./../package.json");

	welcome({
		title: pkgJson.name,
		tagLine: "by Dimas Leopoldo Mérida Flores - gh: leomerida15",
		description: pkgJson.description,
		version: pkgJson.version,
		bgColor: "#A699EA",
		color: "#000000",
		bold: true,
		clear,
	});
};
