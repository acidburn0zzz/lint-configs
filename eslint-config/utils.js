function getExtends(react) {
        return [
            react ? "airbnb" : "airbnb-base",
            "plugin:@typescript-eslint/recommended",
            "plugin:import/errors",
            "plugin:import/warnings",
            "plugin:import/typescript",
            "prettier",
            "prettier/@typescript-eslint",
            "prettier/babel",
            ...(react ? ["prettier/react"] : []),
            "prettier/standard"
        ];
}

function getReactRules() {
    return {
        "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
        "react/destructuring-assignment": "off",
        "react/jsx-props-no-spreading": "off",
        "react/no-unescaped-entities": "off",
        "react/no-array-index-key": "off",
        "react/button-has-type": "off",
        "react-hooks/rules-of-hooks": "error",
        "react/sort-comp": "off",
        "react/no-danger": "off"
    };
}

module.exports = {
    getA11yOffRules() {
        return Object.keys(require("eslint-plugin-jsx-a11y").rules).reduce((acc, rule) => {
            acc[`jsx-a11y/${rule}`] = "off";
            return acc;
        }, {});
    },
    getConfig(react) {
        return {
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: "."
            },
            extends: getExtends(react),
            plugins: ["import", "@typescript-eslint", ...(react ? ["react-hooks"] : [])],
            rules: {
                // Standard
                radix: "off",
                "no-param-reassign": "off",
                "no-restricted-syntax": "off",
                "default-case": "off",
                "no-console": "off",
                "consistent-return": "off",
                "no-plusplus": "off",
                "class-methods-use-this": "off",
                "no-continue": "off",
                // Rules handled by typescript
                "no-unused-expressions": "off",
                "@typescript-eslint/no-unused-expressions": [
                    "error",
                    { allowShortCircuit: true, allowTernary: true }
                ],
                "no-dupe-class-members": "off",
                "@typescript-eslint/no-dupe-class-members": ["error"],
                camelcase: "off",
                "@typescript-eslint/camelcase": ["off"],
                // TypeScript
                "@typescript-eslint/consistent-type-assertions": [
                    "warn",
                    { assertionStyle: "as", objectLiteralTypeAssertions: "allow" }
                ],
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/type-annotation-spacing": "error",
                "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
                "@typescript-eslint/default-param-last": "error",
                "@typescript-eslint/generic-type-naming": "error",
                "@typescript-eslint/no-misused-promises": "error",
                "@typescript-eslint/no-parameter-properties": "error",
                // "@typescript-eslint/no-unnecessary-condition": "error",
                "@typescript-eslint/prefer-as-const": "error",
                "@typescript-eslint/no-unused-vars": "error",
                "@typescript-eslint/prefer-for-of": "error",
                "@typescript-eslint/prefer-includes": "error",
                "@typescript-eslint/prefer-nullish-coalescing": "error",
                "@typescript-eslint/prefer-optional-chain": "error",
                "@typescript-eslint/restrict-plus-operands": "error",
                "@typescript-eslint/restrict-template-expressions": "off",
                "@typescript-eslint/no-use-before-define": [
                    "error",
                    { functions: false, typedefs: false }
                ],
                // Import
                "import/order": [
                    "error",
                    {
                        groups: [
                            ["external", "internal", "builtin"],
                            ["parent", "sibling", "index"]
                        ],
                        "newlines-between": "always"
                    }
                ],
                "import/prefer-default-export": "off",
                "import/extensions": ["error", { ts: "never", tsx: "never" }],
                ...(react ? getReactRules() : {})
            }
        };
    }
};
