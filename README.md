# JSRunner

A lightweight desktop code editor for running JavaScript/TypeScript code in real-time, built with Electron, Vite, and Monaco Editor.

## Features

- **Real-time code execution** - Automatically runs your code as you type with debounced execution
- **Monaco Editor integration** - Professional code editing experience with TypeScript language support
- **Split panel layout** - Resizable editor and output panels that adapt to screen size (horizontal on desktop, vertical on mobile)
- **Dark/Light themes** - Customizable themes with persistent preferences
- **Tab-based workflow** - Organize your work with multiple tabs
- **Collapsible sidebar** - Quick access to theme settings and preferences
- **Desktop application** - Cross-platform support for Windows, macOS, and Linux

## Tech Stack

- **Electron** - Desktop application framework
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe development
- **Monaco Editor** - VS Code's powerful code editor
- **Split.js** - Resizable split panels
- **Web Components** - Native custom elements for UI components

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

## Installation

```bash
# Clone the repository
git clone https://github.com/CarSeP/JSRunner
cd JSRunner

# Install dependencies
npm install
```

## Usage

### Development

```bash
# Start the development server with hot reload
npm run dev
```

### Build

```bash
# Build for production and create distributable package
npm run build
```

This command runs TypeScript compilation, Vite bundling, and Electron Builder to create installable packages for your platform.

### Preview

```bash
# Preview the production build locally
npm run preview
```

## Project Structure

```
JSRunner/
├── electron/              # Electron main process and preload scripts
│   ├── main.ts           # Main Electron process
│   └── preload.ts        # Preload script for secure IPC
├── src/
│   ├── components/       # Web Components
│   │   ├── app-header.ts       # Application header with tabs
│   │   ├── app-sidebar.ts      # Collapsible sidebar
│   │   ├── code-controller.ts  # Manages editor/output split panel
│   │   ├── code-input.ts       # Monaco Editor wrapper
│   │   ├── code-output.ts      # Code execution output display
│   │   ├── header-tabs.ts      # Tab navigation
│   │   └── sidebar-theme.ts    # Theme selection UI
│   ├── utils/            # Utility modules
│   │   ├── monaco-editor.ts    # Monaco Editor configuration
│   │   ├── run-code.ts         # Code execution engine
│   │   ├── split-panel.ts      # Split panel management
│   │   ├── storage.ts          # Local storage utilities
│   │   └── theme.ts            # Theme management
│   ├── main.ts           # Application entry point
│   ├── style.css         # Global styles
│   └── theme.css         # Theme variables
├── public/               # Static assets
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── electron-builder.json5 # Electron build configuration
```

## Architecture

JSRunner uses a component-based architecture with native Web Components:

- **Code Controller** - Orchestrates the split panel layout and connects the editor to the output
- **Code Input** - Wraps Monaco Editor with TypeScript language support
- **Code Output** - Displays execution results and console output
- **Run Code** - Executes JavaScript using the `Function` constructor with async support, capturing all `console.log` output

## Configuration

### Theme

Themes are managed through CSS custom properties defined in `theme.css`. User preferences are persisted in localStorage.

### Editor

Monaco Editor is configured with:
- TypeScript language mode
- Custom dark theme
- No minimap
- Hidden scrollbars for clean UI
- Automatic layout resizing

## Building for Distribution

The project uses `electron-builder` to create platform-specific packages:

| Platform | Format | Output |
|----------|--------|--------|
| macOS    | DMG    | `release/{version}/*-Mac-*.dmg` |
| Windows  | NSIS   | `release/{version}/*-Windows-*.exe` |
| Linux    | AppImage | `release/{version}/*-Linux-*.AppImage` |
