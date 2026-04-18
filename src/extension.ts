import * as path from "path";
import * as vscode from "vscode";

type CopyMode = "referenceWithText" | "referenceOnly";

const CONFIG_NAMESPACE = "fileContextCopy";
const COMMAND_ENHANCED_COPY = "fileContextCopy.enhancedCopy";
const COMMAND_COPY_REFERENCE_ONLY = "fileContextCopy.copyReferenceOnly";
const COMMAND_COPY_WITH_REFERENCE = "fileContextCopy.copySelectionWithReference";
const COMMAND_CONFIGURE_REFERENCE_ONLY_SHORTCUT = "fileContextCopy.configureReferenceOnlyShortcut";
const COMMAND_CONFIGURE_REFERENCE_COPY_SHORTCUT = "fileContextCopy.configureReferenceCopyShortcut";

type ResolvedSelection = {
  text: string;
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
};

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_ENHANCED_COPY, async () => {
      await handleEnhancedCopy();
    }),
    vscode.commands.registerCommand(COMMAND_COPY_REFERENCE_ONLY, async () => {
      await handleConfiguredCopy("enableReferenceOnly", "referenceOnly");
    }),
    vscode.commands.registerCommand(COMMAND_COPY_WITH_REFERENCE, async () => {
      await handleConfiguredCopy("enableReferenceCopy", "referenceWithText");
    }),
    vscode.commands.registerCommand(COMMAND_CONFIGURE_REFERENCE_ONLY_SHORTCUT, async () => {
      await openShortcutEditor(COMMAND_COPY_REFERENCE_ONLY);
    }),
    vscode.commands.registerCommand(COMMAND_CONFIGURE_REFERENCE_COPY_SHORTCUT, async () => {
      await openShortcutEditor(COMMAND_COPY_WITH_REFERENCE);
    })
  );
}

export function deactivate(): void {}

async function handleEnhancedCopy(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || !hasNonEmptySelection(editor)) {
    await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
    return;
  }

  if (!isEnhancedCopyActive()) {
    await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
    return;
  }

  const text = buildClipboardText(editor, "referenceWithText");
  if (!text) {
    await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
    return;
  }

  await vscode.env.clipboard.writeText(text);
  showCopiedMessage("Copied selection with reference.");
}

async function handleConfiguredCopy(settingName: string, mode: CopyMode): Promise<void> {
  const config = getConfig();
  if (!config.get<boolean>(settingName, false)) {
    vscode.window.showInformationMessage(`File Context Copy is disabled for ${settingName}.`);
    return;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor || !hasNonEmptySelection(editor)) {
    vscode.window.showInformationMessage("Select some text before running this copy command.");
    return;
  }

  const text = buildClipboardText(editor, mode);
  if (!text) {
    vscode.window.showInformationMessage("Nothing was copied because the selection is empty.");
    return;
  }

  await vscode.env.clipboard.writeText(text);
  showCopiedMessage(mode === "referenceOnly" ? "Copied reference." : "Copied selection with reference.");
}

function buildClipboardText(editor: vscode.TextEditor, mode: CopyMode): string {
  const document = editor.document;
  const selections = editor.selections
    .map((selection) => resolveSelection(document, selection))
    .filter((selection): selection is ResolvedSelection => selection !== undefined);

  if (!selections.length) {
    return "";
  }

  return selections
    .map((selection) => formatSelectionBlock(document.uri, selection, mode))
    .join("\n\n");
}

function formatSelectionBlock(uri: vscode.Uri, selection: ResolvedSelection, mode: CopyMode): string {
  const reference = `@${resolvePath(uri)}:${formatRange(selection)}`;
  if (mode === "referenceOnly") {
    return reference;
  }

  return `${reference}\n${selection.text}`;
}

function resolveSelection(
  document: vscode.TextDocument,
  selection: vscode.Selection
): ResolvedSelection | undefined {
  if (selection.isEmpty) {
    return undefined;
  }

  const text = document.getText(selection);
  if (!text) {
    return undefined;
  }

  const startLine = selection.start.line + 1;
  const startColumn = selection.start.character + 1;
  const lastCharacterOffset = document.offsetAt(selection.end) - 1;
  const lastIncludedPosition = document.positionAt(lastCharacterOffset);
  const endLine = lastIncludedPosition.line + 1;
  const endColumn = lastIncludedPosition.character + 1;

  return {
    text,
    startLine,
    endLine,
    startColumn,
    endColumn
  };
}

function formatRange(selection: ResolvedSelection): string {
  const start = `${selection.startLine}:${selection.startColumn}`;
  const end = `${selection.endLine}:${selection.endColumn}`;
  return start === end ? start : `${start}-${end}`;
}

function resolvePath(uri: vscode.Uri): string {
  const config = getConfig();
  const pathStyle = config.get<string>("pathStyle", "workspaceRelative");
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

  if (pathStyle === "workspaceRelative" && workspaceFolder) {
    const workspaceRelativePath = path.relative(workspaceFolder.uri.fsPath, uri.fsPath);
    return normalizeSlashes(workspaceRelativePath);
  }

  return normalizeSlashes(uri.fsPath);
}

function normalizeSlashes(filePath: string): string {
  return filePath.replace(/\\/g, "/");
}

function hasNonEmptySelection(editor: vscode.TextEditor): boolean {
  return editor.selections.some((selection) => !selection.isEmpty);
}

function getConfig(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration(CONFIG_NAMESPACE);
}

function isEnhancedCopyActive(): boolean {
  const config = getConfig();
  return (
    config.get<boolean>("enableEnhancedCopy", false) &&
    !config.get<boolean>("enableReferenceCopy", true)
  );
}

function showCopiedMessage(message: string): void {
  void vscode.window.setStatusBarMessage(message, 2500);
}

async function openShortcutEditor(targetCommand: string): Promise<void> {
  await vscode.commands.executeCommand("workbench.action.openGlobalKeybindings", `@command:${targetCommand}`);
  showCopiedMessage("Opened Keyboard Shortcuts for File Context Copy.");
}
