/**
 * Global Prettier configuration for the monorepo.
 * Works with ESM ("type": "module") and CommonJS because it uses the .cjs extension.
 *
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    // --- Layout & Spaces ---
    tabWidth: 4, 
    useTabs: false,
    printWidth: 110, 
    singleQuote: true,
    semi: false,
    trailingComma: 'all', 
    bracketSpacing: true,
    bracketSameLine: false,

    // --- JSX ---
    jsxSingleQuote: false, 
    jsxBracketSameLine: false,
    arrowParens: 'always',

    // --- Formatting consistency ---
    proseWrap: 'preserve',
    endOfLine: 'lf',
    singleAttributePerLine: false,

    // --- Experimental / Quality of life ---
    htmlWhitespaceSensitivity: 'css',
    embeddedLanguageFormatting: 'auto',

    // --- Overrides for specific file types ---
    overrides: [
        {
            files: '*.md',
            options: {
                proseWrap: 'always',
            },
        },
        {
            files: ['*.yml', '*.yaml'],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.json',
            options: {
                trailingComma: 'none',
                tabWidth: 2,
            },
        },
    ],
}

module.exports = config
