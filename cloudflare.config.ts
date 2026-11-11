import { bindings, defineConfig } from "cf/config";

export default defineConfig({
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
