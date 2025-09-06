import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@shared": path.resolve(__dirname, "src/shared"),
			"@features-tasks": path.resolve(__dirname, "src/features/tasks"),
		},
	},
});
