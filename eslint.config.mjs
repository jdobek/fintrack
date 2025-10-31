import eslintConfigNext from "eslint-config-next"
import eslintConfigPrettier from "eslint-config-prettier"
import tailwindcssPlugin from "eslint-plugin-tailwindcss"

const tailwindFlatConfigs = (tailwindcssPlugin.configs["flat/recommended"] ?? []).map(
  (config) => {
    if (config.name === "tailwindcss:rules") {
      return {
        ...config,
        rules: {
          ...config.rules,
          "tailwindcss/no-custom-classname": "off",
        },
      }
    }

    if (config.name === "tailwindcss:base") {
      return {
        ...config,
        settings: {
          ...(config.settings ?? {}),
          tailwindcss: {
            ...(config.settings?.tailwindcss ?? {}),
            callees: ["cn"],
            config: "tailwind.config.js",
          },
        },
      }
    }

    return config
  }
)
const config = [
  {
    ignores: ["dist/**", ".cache", "public", "node_modules", "*.esm.js"],
  },
  ...eslintConfigNext,
  ...tailwindFlatConfigs,
  {
    name: "project:overrides",
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "tailwindcss/classnames-order": "off",
      "tailwindcss/enforces-shorthand": "off",
      "tailwindcss/no-unnecessary-arbitrary-value": "off",
    },
  },
  {
    name: "project:prettier",
    rules: eslintConfigPrettier.rules,
  },
]

export default config

