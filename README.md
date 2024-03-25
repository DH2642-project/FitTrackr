# FitTrackr

> A web application where users can set goals for their fitness and health and track their progress over time. Users should be able to create and log their own workout sessions and meals. User data is visualized through various types of graphs. Examples of data that can be visualized include weight loss over time and running distance for each week of the past month.

# Development

1. Install dependencies:
    ```bash
    npm install
    ```

2. Run development server:
    ```bash
    npm run dev
    ```

3. Open the url [`localhost:5137`](http://localhost:5173/) in your browser.

## Tech stack
- Typescript
- React
- Vite
- [Material UI](https://mui.com/material-ui/all-components/)
  - Components
  - Icons
- [Emotion](https://emotion.sh/docs/introduction#react) - for styling (use )
- [Firebase](https://console.firebase.google.com/u/0/project/dh2642-project-7eb8e)
  - [Authentication](https://firebase.google.com/docs/auth/web/start)
  - [Realtime Database](https://firebase.google.com/docs/database/web/read-and-write)
  - Hosting
- [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/quick-start)
- Redux with [Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)


## Expanding the ESLint configuration (from Vite README)

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
