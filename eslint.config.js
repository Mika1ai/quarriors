import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  ...pluginVue.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    rules: {
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/no-multiple-template-root": "error",
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off",
      "vue/require-prop-types": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleAttributePerLine: true,
        },
      ],
    },
  },
];
