# renamebin

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A Deno utility to find `.png` files with non-ASCII names, rename them to ASCII-safe equivalents, and patch a binary file to update the filename references.

This tool is designed for situations, such as game modding, where asset filenames with non-ASCII characters need to be changed to work with legacy systems, and where those filenames are hardcoded into a binary file using Shift_JIS encoding.

## Features

- **Targeted Renaming:** Identifies and renames only `.png` files with non-ASCII characters.
- **Binary-Safe:** Generates new ASCII filenames that are padded with `_` to match the original filename's byte length in Shift_JIS encoding. This ensures that replacements in the binary file do not corrupt its structure.
- **In-Place Binary Patching:** Scans a binary file and replaces all occurrences of the old filenames with the new ones.
- **Modular Scripts:** Provides a main all-in-one script as well as individual scripts for a flexible, step-by-step workflow.

## Requirements

- [Deno](https://deno.land/)

## Usage

### Quick Start (All-in-One)

This command performs all steps at once: it generates new names, renames the `.png` files, and patches the binary.

```sh
deno run --allow-read --allow-write --allow-net https://code4fukui.github.io/renamebin/renamebin.js src.bin dst.bin textures
```

**Arguments:**
- `src.bin`: The source binary file to patch.
- `dst.bin`: The path for the output (patched) binary file.
- `textures`: The folder containing the `.png` files to rename.

### Advanced Usage (Step-by-Step)

The tool is composed of modular scripts that can be run individually for more control over the process.

**1. Generate a Filename Map**

Create a CSV file that maps original non-ASCII filenames to new ASCII filenames.

```sh
deno run --allow-read --allow-write --allow-net https://code4fukui.github.io/renamebin/maketxtfnlist.js textures map.csv
```
- `textures`: The folder containing `.png` files.
- `map.csv`: The output CSV file mapping `fn` (original) to `fn2` (new).

**2. Rename Image Files**

Rename the `.png` files on your filesystem according to the generated map.

```sh
deno run --allow-read --allow-write --allow-net https://code4fukui.github.io/renamebin/renametxtfn.js textures map.csv
```
- `textures`: The folder containing `.png` files.
- `map.csv`: The CSV map created in the previous step.

**3. Patch the Binary File**

Update the binary file using the same filename map.

```sh
deno run --allow-read --allow-write --allow-net https://code4fukui.github.io/renamebin/renamebinbymap.js src.bin dst.bin map.csv
```
- `src.bin`: The source binary file.
- `dst.bin`: The path for the output binary file.
- `map.csv`: The CSV map.

## How It Works

The `renamebin.js` script automates the following process:

1.  **Scan:** It searches the specified folder for `.png` files with non-ASCII characters in their names.
2.  **Map:** For each file found, it generates a new, unique ASCII filename (e.g., `0____.png`). The new name is padded with underscores (`_`) to ensure its byte length in **Shift_JIS** encoding is identical to the original filename's byte length. This is essential for safe binary patching.
3.  **Rename:** It renames the actual `.png` files on the filesystem.
4.  **Patch:** It reads the source binary, finds all occurrences of the original Shift_JIS-encoded filenames, and replaces them