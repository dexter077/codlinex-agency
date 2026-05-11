# CodLinex Digital Automation Agent — Claude Guidelines

## Component Authoring

- **Always write components as arrow functions.**
  ```js
  // Correct
  const MyComponent = () => { ... };

  // Wrong
  function MyComponent() { ... }
  ```
  This applies to all JavaScript/TypeScript components, helpers, and UI functions in this project.
