module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
        es6: true
    },
    extends: ['airbnb', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:import/typescript', 'prettier', 'plugin:prettier/recommended'],
    plugins: ['react', '@babel', '@typescript-eslint', 'react-hooks'],
    globals: {
        NodeJS: true
    },
    settings: {
        react: {
            version: 'detect'
        },
        polyfills: ['Promise', 'URL'],
        'import/resolver': {
            typescript: {}
        }
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json'],
        sourceType: 'module',
        extraFileExtensions: ['.html'],
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'react/jsx-one-expression-per-line': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-indent': 0,
        'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
        'react/jsx-filename-extension': 0,
        "react/jsx-no-useless-fragment": 0,
        'react/state-in-constructor': 0,
        'react/jsx-props-no-spreading': 0,
        'react/destructuring-assignment': 0, // TODO: remove later
        'react/require-default-props': 0,
        'react/sort-comp': 0,
        'react/display-name': 0,
        'react/static-property-placement': 0,
        'react/jsx-no-bind': 0, // Should not check test file
        'react/no-find-dom-node': 0,
        'react/no-unused-prop-types': 0,
        'react/default-props-match-prop-types': 0,
        'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks
        'react/function-component-definition': 0,
        'react/no-unused-class-component-methods': 0,
        'import/no-unresolved': [2, { ignore: ['~*'] }],
        'import/extensions': 0,
        'import/no-cycle': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        // label-has-for has been deprecated
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
        'jsx-a11y/label-has-for': 0,

        'comma-dangle': ['error', 'never'],
        'consistent-return': 0, // TODO: remove later
        'no-param-reassign': 0, // TODO: remove later
        'no-underscore-dangle': 0,
        // for (let i = 0; i < len; i++)
        'no-plusplus': 0,
        "no-console": 0,
        // https://eslint.org/docs/rules/no-continue
        // labeledLoop is conflicted with `eslint . --fix`
        'no-continue': 0,
        // ban this for Number.isNaN needs polyfill
        'no-restricted-globals': 0,
        'max-classes-per-file': 0,

        // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
        'no-use-before-define': 0,
        '@typescript-eslint/no-use-before-define': 2,
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': [2, { ignoreTypeValueShadow: true }],
        // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
        'no-undef': 0,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ],
        "import/no-extraneous-dependencies": 0
    },
    overrides: [
        {
            files: ['vite.config.ts', 'index.html'],
            parserOptions: {
                project: ['./tsconfig.node.json']
            }
        },
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 2,
                '@typescript-eslint/consistent-type-imports': [
                    2,
                    { disallowTypeAnnotations: false }
                ]
            }
        }
    ]
};
