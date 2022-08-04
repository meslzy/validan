import type {Config} from "@jest/types";

const config: Config.InitialOptions = {
	verbose: true,
	roots: [
		"test",
	],
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
};

export default config;
