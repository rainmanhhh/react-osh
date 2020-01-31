module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  plugins: [
    'prettier'
  ],
  extends: [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  ],
  parserOptions: {
    ecmaVersion: 2020,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,  // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // 'no-mixed-operators': 'error',
    // 'no-console': 'off',
    // 'no-undef': 'off',
    // '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // '@typescript-eslint/no-var-requires': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
    // '@typescript-eslint/no-object-literal-type-assertion': 'off',
    // '@typescript-eslint/no-parameter-properties': 'off',
    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};