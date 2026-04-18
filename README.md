# File Context Copy

File Context Copy is a VS Code extension for copying selected text together with its file path, line numbers, and column numbers.

It is useful when you want to paste code or text into:

- AI tools
- issue trackers
- pull request comments
- documentation
- chat messages

Instead of pasting plain text with no context, you can copy output like:

```text
@src/utils/clamp.ts:1:1-3:2
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
```

## Main features

### 1. Enhanced copy

When `fileContextCopy.enableEnhancedCopy` is enabled, normal `Ctrl+C` / `Cmd+C` copies the selected text together with a file reference header.

Example source:

```ts
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
```

Copied result:

```text
@src/utils/clamp.ts:1:1-3:2
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
```

Note:
This feature only takes effect when `fileContextCopy.enableReferenceCopy` is turned off.

### 2. Copy reference only

This command copies only the file reference, without the selected text.

Default shortcut:
- Windows/Linux: `Ctrl+Shift+C`
- macOS: `Cmd+Shift+C`

Example source:

```ts
const answer = 42;
```

Copied result:

```text
@src/constants.ts:1:1-1:18
```

This is useful when you want to reference a location without duplicating the whole content.

### 3. Copy selection with file reference

This command keeps normal `Ctrl+C` unchanged and gives you a dedicated shortcut for copying the selection with context.

Default shortcut:
- Windows/Linux: `Ctrl+Alt+C`
- macOS: `Cmd+Alt+C`

Example source:

```ts
function sum(a: number, b: number) {
  return a + b;
}
```

Copied result:

```text
@src/math/sum.ts:1:1-3:2
function sum(a: number, b: number) {
  return a + b;
}
```

This is useful when you want:

- normal `Ctrl+C` for plain text
- a separate shortcut for structured copy

## Why use this extension

VS Code can copy text.
VS Code can also expose file paths in different ways.
But VS Code does not provide a built-in workflow that combines:

- selected text
- file path
- line range
- column range
- custom copy shortcuts

File Context Copy fills that gap.

## Quick start

1. Install the extension.
2. Open Settings and search for `File Context Copy`.
3. Choose the behavior you want:
   `fileContextCopy.enableEnhancedCopy`
   `fileContextCopy.enableReferenceOnly`
   `fileContextCopy.enableReferenceCopy`
4. Select text in any file.
5. Use the shortcut or command you prefer.

## Settings

### `fileContextCopy.enableEnhancedCopy`

When enabled, `Ctrl+C` / `Cmd+C` copies the selected text with a file reference header.

Example output:

```text
@src/app.ts:8:5-10:20
selected text...
```

This only works when `fileContextCopy.enableReferenceCopy` is turned off.

### `fileContextCopy.enableReferenceOnly`

Enables the command:
`File Context Copy: Copy Reference Only`

Example output:

```text
@src/app.ts:8:5-10:20
```

### `fileContextCopy.enableReferenceCopy`

Enables the command:
`File Context Copy: Copy Selection With Reference`

Example output:

```text
@src/app.ts:8:5-10:20
selected text...
```

When this setting is enabled, it takes priority over Enhanced Copy, so normal `Ctrl+C` keeps copying the original text.

### `fileContextCopy.pathStyle`

Controls whether the copied path is:

- `workspaceRelative`
- `absolute`

Example with `workspaceRelative`:

```text
@src/components/Button.tsx:12:1-18:2
```

Example with `absolute`:

```text
@/Users/you/project/src/components/Button.tsx:12:1-18:2
```

## Commands

The extension contributes these commands:

- `File Context Copy: Enhanced Ctrl+C`
- `File Context Copy: Copy Reference Only`
- `File Context Copy: Copy Selection With Reference`
- `File Context Copy: Configure Copy Reference Only Shortcut`
- `File Context Copy: Configure Copy Selection With Reference Shortcut`

## Shortcut setup

Default shortcuts:

- Enhanced Copy: `Ctrl+C` / `Cmd+C`
- Copy Reference Only: `Ctrl+Shift+C` / `Cmd+Shift+C`
- Copy Selection With Reference: `Ctrl+Alt+C` / `Cmd+Alt+C`

You can override the shortcuts in VS Code Keyboard Shortcuts:

1. Open Keyboard Shortcuts.
2. Search for `File Context Copy`.
3. Edit the commands you want.

You can also run these commands from the Command Palette to jump directly to the shortcut entries:

- `File Context Copy: Configure Copy Reference Only Shortcut`
- `File Context Copy: Configure Copy Selection With Reference Shortcut`

## Example workflows

### Share a code snippet in chat

Copy:

```text
@src/api/client.ts:24:1-30:2
async function request(path: string) {
  return fetch(path);
}
```

This gives the reader both the content and the exact location.

### Reference a file location in a bug report

Copy:

```text
@src/components/LoginForm.tsx:52:7-52:28
```

This is compact and easy to paste into an issue or pull request comment.

## Run locally

This project is a VS Code extension, so the normal local workflow is to compile it and launch an Extension Development Host window.

### 1. Install dependencies

```bash
npm install
```

### 2. Compile the extension

```bash
npm run compile
```

If you want TypeScript to rebuild automatically while editing:

```bash
npm run watch
```

### 3. Start the extension in VS Code

1. Open this project folder in VS Code.
2. Press `F5`.
3. VS Code will open a new `Extension Development Host` window.

### 4. Try the extension

In the Extension Development Host window:

1. Open any file inside a workspace.
2. Select some text in the editor.
3. Use one of these commands from the Command Palette:
   - `File Context Copy: Enhanced Ctrl+C`
   - `File Context Copy: Copy Reference Only`
   - `File Context Copy: Copy Selection With Reference`
4. Or enable the related settings and test the keyboard shortcuts directly.

### 5. Package a VSIX

If you want to build an installable extension package:

```bash
npm run package:vsix
```
