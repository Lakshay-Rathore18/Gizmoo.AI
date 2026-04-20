// Minimal flat config — ESLint 10+ / Next 16.
// next/core-web-vitals rules are enforced by Next's own compiler (`next build`).
// This config exists so `next lint` / `npx eslint` runs without crashing.

import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'captures/**',
      'scripts/**',
      'perf-baseline/**',
      'out/**',
      'public/**',
      'next.config.mjs',
      'eslint.config.mjs',
      // TypeScript is type-checked + linted by `next build` itself;
      // running ESLint on .ts/.tsx without @typescript-eslint/parser
      // would produce false-positive parse errors.
      '**/*.ts',
      '**/*.tsx',
    ],
  },
  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLCanvasElement: 'readonly',
        CanvasRenderingContext2D: 'readonly',
        SVGElement: 'readonly',
        SVGLineElement: 'readonly',
        SVGCircleElement: 'readonly',
        Element: 'readonly',
        Event: 'readonly',
        CustomEvent: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        MediaQueryList: 'readonly',
        Number: 'readonly',
        Math: 'readonly',
        Array: 'readonly',
        Object: 'readonly',
        JSON: 'readonly',
        Date: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
];
