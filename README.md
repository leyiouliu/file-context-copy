# File Context Copy

Stop pasting anonymous code.

File Context Copy lets you copy selected text together with its file path, line range, and column range, so every snippet already includes the context the reader needs.

It is especially useful when sharing code in:

- AI tools
- bug reports
- pull request comments
- technical documentation
- chat messages

Instead of pasting plain text like this:

```ts
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
```

you can paste this:

```text
@src/utils/clamp.ts:1:1-3:2
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
```

## Why use File Context Copy

When you share code, the missing context is usually the real problem.

People reading a pasted snippet often need to ask:

- Which file is this from?
- Which lines does this refer to?
- Is this the exact code or just an excerpt?

File Context Copy solves that in one step by combining:

- the selected text
- the source file path
- the exact line range
- the exact column range

## What you can do

### 1. Enhanced Copy

Turn normal `Ctrl+C` / `Cmd+C` into contextual copy.

When `fileContextCopy.enableEnhancedCopy` is enabled, copying a selection will include a reference header automatically.

Example output:

```text
@src/app.ts:8:5-10:20
selected text...
```

This mode only takes effect when `fileContextCopy.enableReferenceCopy` is turned off.

### 2. Copy Reference Only

Copy just the location, without copying the selected text itself.

Default shortcut:

- Windows/Linux: `Ctrl+Shift+C`
- macOS: `Cmd+Shift+C`

Example output:

```text
@src/constants.ts:1:1-1:18
```

This is useful when you want to point to a location without duplicating the code.

### 3. Copy Selection With Reference

Keep normal copy behavior unchanged and use a dedicated shortcut for structured copy.

Default shortcut:

- Windows/Linux: `Ctrl+Alt+C`
- macOS: `Cmd+Alt+C`

Example output:

```text
@src/math/sum.ts:1:1-3:2
function sum(a: number, b: number) {
  return a + b;
}
```

This mode is ideal if you want:

- regular `Ctrl+C` for plain text
- a separate shortcut for copy-with-context

## Common use cases

### Share code with AI tools

Give ChatGPT, Claude, Codex, or other AI tools the exact file and line location together with the snippet, so your prompt has better context immediately.

### Write clearer bug reports

Paste a precise file reference into issues so other people can jump to the exact location faster.

### Leave better pull request comments

Share the exact code and location in review discussions without manually typing file paths and ranges.

### Create documentation faster

Include reusable snippets that already show where they came from.

## Quick start

1. Install the extension.
2. Open Settings and search for `File Context Copy`.
3. Choose the behavior you want:
   - `fileContextCopy.enableEnhancedCopy`
   - `fileContextCopy.enableReferenceOnly`
   - `fileContextCopy.enableReferenceCopy`
4. Select text in any editor.
5. Use the shortcut or command that fits your workflow.

## Settings

### `fileContextCopy.enableEnhancedCopy`

When enabled, `Ctrl+C` / `Cmd+C` copies the selected text with a file reference header.

Example:

```text
@src/app.ts:8:5-10:20
selected text...
```

This only works when `fileContextCopy.enableReferenceCopy` is turned off.

### `fileContextCopy.enableReferenceOnly`

Enables the command:
`File Context Copy: Copy Reference Only`

Example:

```text
@src/app.ts:8:5-10:20
```

### `fileContextCopy.enableReferenceCopy`

Enables the command:
`File Context Copy: Copy Selection With Reference`

Example:

```text
@src/app.ts:8:5-10:20
selected text...
```

When this setting is enabled, it takes priority over Enhanced Copy, so normal `Ctrl+C` remains plain copy.

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

## Default shortcuts

- Enhanced Copy: `Ctrl+C` / `Cmd+C`
- Copy Reference Only: `Ctrl+Shift+C` / `Cmd+Shift+C`
- Copy Selection With Reference: `Ctrl+Alt+C` / `Cmd+Alt+C`

You can change these in VS Code Keyboard Shortcuts:

1. Open Keyboard Shortcuts.
2. Search for `File Context Copy`.
3. Edit the shortcuts you want.

You can also run these commands from the Command Palette to jump directly to the relevant shortcut entries:

- `File Context Copy: Configure Copy Reference Only Shortcut`
- `File Context Copy: Configure Copy Selection With Reference Shortcut`
