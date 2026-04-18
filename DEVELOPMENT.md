# Development Guide

This document is for repository development and maintenance.

The root `README.md` is intentionally kept user-facing because VS Code Marketplace uses the extension root README as the extension details content.

## Local development

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

## Packaging

Build an installable VSIX package with:

```bash
npm run package:vsix
```

## Secret scanning

This repo includes automated secret scanning with Gitleaks.

- GitHub Actions runs the scan on `push`, `pull_request`, and manual dispatch.
- The workflow uses the repo-level `gitleaks.toml` configuration.

To run the same scan locally after installing `gitleaks`, use:

```bash
gitleaks dir . --config gitleaks.toml --redact
```

If this repository is ever moved from a personal GitHub account to an organization account, the official `gitleaks/gitleaks-action@v2` workflow may also need a `GITLEAKS_LICENSE` repository secret.
