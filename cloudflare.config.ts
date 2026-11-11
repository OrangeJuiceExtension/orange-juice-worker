import { bindings, defineConfig } from "cf/config";

export default defineConfig({
	accountId: "2cbe7a8f2281a177f284b681e6f27ac7",
	worker: {
		name: "orange-juice-worker",
		compatibilityDate: "2025-09-27",
		entrypoint: "src/index.ts",
		observability: {
			enabled: true,
		},
		env: {
			ASSETS: bindings.assets(),
		},
	},
});
