const path = require("node:path");
const { getDefaultConfig } = require("@expo/metro-config");
const { mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "..");
const libSrcRoot = path.join(monorepoRoot, "src");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
	watchFolders: [monorepoRoot],
	resolver: {
		nodeModulesPaths: [
			path.resolve(projectRoot, "node_modules"),
			path.resolve(monorepoRoot, "node_modules"),
		],
		unstable_enablePackageExports: true,
		// Resolve workspace lib to source so Fast Refresh works when editing src/
		resolveRequest: (context, moduleName, platform) => {
			if (moduleName === "react-native-alert-queue") {
				return {
					filePath: path.join(libSrcRoot, "index.tsx"),
					type: "sourceFile",
				};
			}

			return context.resolveRequest(context, moduleName, platform);
		},
	},
};

module.exports = mergeConfig(defaultConfig, config);
