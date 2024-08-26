import { CommonFuncs } from "./funcs/index.js";

export const commands = (input) => {
	if (input.includes("funcs")) return CommonFuncs();
};
