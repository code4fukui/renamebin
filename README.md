# renamebin

Rename non-ASCII `.png` filenames in a folder to ASCII names and rewrite the same filenames inside a binary file.

## Requirement

- Deno

## Usage

```sh
deno run --allow-read --allow-write --allow-net renamebin.js src.bin dst.bin textures
```

Arguments:

- `src.bin`: source binary file
- `dst.bin`: output binary file
- `textures`: folder containing `.png` files

## What It Does

Running `renamebin.js` will:

1. find non-ASCII `.png` filenames in `textures`
2. rename those files to ASCII names such as `0____.png`
3. replace the same filenames inside `src.bin`
4. write the result to `dst.bin`

## Notes

- Only `.png` files are processed.
- Only non-ASCII filenames are renamed.
- Filename length is handled in Shift_JIS byte length.
- Replacement names must fit in the original byte space inside the binary.

## License

MIT
