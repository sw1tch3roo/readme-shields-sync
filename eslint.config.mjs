import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = [
    js.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
                node: {
                    extensions: ['.js', '.mjs', '.ts', '.json'],
                },
            },
        },
        rules: {
            'array-callback-return': 'off',
            'consistent-return': 'error',
            curly: 'error',
            'default-case': [
                'error',
                {
                    commentPattern: '^no default$',
                },
            ],
            'dot-notation': [
                'error',
                {
                    allowKeywords: true,
                },
            ],
            eqeqeq: ['error', 'always'],
            'no-eq-null': 'error',
            'no-eval': 'error',
            'no-extra-bind': 'error',
            'no-floating-decimal': 'error',
            'no-return-assign': ['error', 'always'],
            'no-throw-literal': 'error',
            'no-useless-call': 'error',
            yoda: 'error',
            'no-await-in-loop': 'error',
            'no-template-curly-in-string': 'error',
            'arrow-spacing': [
                'error',
                {
                    before: true,
                    after: true,
                },
            ],
            'no-useless-computed-key': 'error',
            'no-useless-constructor': 'error',
            'no-useless-rename': [
                'error',
                {
                    ignoreDestructuring: false,
                    ignoreImport: false,
                    ignoreExport: false,
                },
            ],
            'no-var': 'error',
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: 'directive',
                    next: '*',
                },
                {
                    blankLine: 'never',
                    prev: 'directive',
                    next: 'directive',
                },
                {
                    blankLine: 'always',
                    prev: ['const', 'let', 'var'],
                    next: '*',
                },
                {
                    blankLine: 'any',
                    prev: ['const', 'let', 'var'],
                    next: ['const', 'let', 'var'],
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'return',
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: ['for', 'function', 'if', 'switch', 'try'],
                },
                {
                    blankLine: 'always',
                    prev: ['for', 'function', 'if', 'switch', 'try'],
                    next: '*',
                },
            ],
            'prefer-const': [
                'error',
                {
                    destructuring: 'any',
                    ignoreReadBeforeAssign: true,
                },
            ],
            'prefer-destructuring': [
                'error',
                {
                    VariableDeclarator: {
                        array: false,
                        object: true,
                    },
                    AssignmentExpression: {
                        array: true,
                        object: true,
                    },
                },
                { enforceForRenamedProperties: false },
            ],
            'rest-spread-spacing': ['error', 'never'],
            'symbol-description': 'error',
            'template-curly-spacing': 'error',
            'array-bracket-spacing': ['error', 'never'],
            'block-spacing': ['error', 'always'],
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],
            camelcase: ['error', { properties: 'never' }],
            'func-call-spacing': ['error', 'never'],
            'func-names': ['error', 'as-needed'],
            'linebreak-style': ['error', 'unix'],
            'new-cap': [
                'error',
                {
                    newIsCap: true,
                    newIsCapExceptions: [],
                    capIsNew: false,
                },
            ],
            'new-parens': 'error',
            'no-bitwise': 'off',
            'no-lonely-if': 'off',
            'no-mixed-operators': [
                'error',
                {
                    groups: [
                        ['%', '**'],
                        ['%', '+'],
                        ['%', '-'],
                        ['%', '*'],
                        ['%', '/'],
                        ['**', '+'],
                        ['**', '-'],
                        ['**', '*'],
                        ['**', '/'],
                        ['&', '|', '^', '~', '<<', '>>', '>>>'],
                        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                        ['&&', '||'],
                        ['in', 'instanceof'],
                    ],
                    allowSamePrecedence: false,
                },
            ],
            'no-multi-assign': ['error'],
            'no-nested-ternary': 'error',
            'no-spaced-func': 'error',
            'no-unneeded-ternary': ['error', { defaultAssignment: false }],
            'no-whitespace-before-property': 'error',
            'quote-props': [
                'error',
                'as-needed',
                {
                    keywords: false,
                    unnecessary: true,
                    numbers: false,
                },
            ],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'semi-spacing': ['error', { before: false, after: true }],
            'semi-style': ['error', 'last'],
            'space-before-blocks': 'error',
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    named: 'never',
                    asyncArrow: 'always',
                },
            ],
            'space-in-parens': ['error', 'never'],
            'space-unary-ops': [
                'error',
                {
                    words: true,
                    nonwords: false,
                    overrides: {},
                },
            ],
            'spaced-comment': ['error', 'always'],
            'no-unused-vars': 'off',
            'no-use-before-define': 'off',
            'no-redeclare': 'off',
            'no-undef': 'off',
            'no-empty': 'off',
            'no-console': 'warn',
            'import/no-unresolved': [
                'error',
                {
                    commonjs: true,
                    caseSensitive: true,
                    ignore: ['^node:'],
                },
            ],
            'import/no-useless-path-segments': 'off',
            'import/no-duplicates': 'off',
            'import/no-named-as-default-member': 'off',
            'import/no-named-as-default': 'off',
            'import/no-absolute-path': 'error',
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external', 'internal']],
                    pathGroups: [
                        {
                            pattern: '~/**',
                            group: 'external',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: [],
                },
            ],
        },
    },
    {
        ignores: ['**/generated/**', 'node_modules/**', 'dist/**', 'out/**', 'build/**', 'build.ts', 'config/**'],
    },
];

export default eslintConfig;
