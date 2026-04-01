# renamebin

フォルダ内の非ASCIIな `.png` ファイル名を ASCII 名に変更し、同じ名前を含むバイナリも書き換えるツールです。

## 必要なもの

- Deno

## 使い方

```sh
deno run --allow-read --allow-write --allow-net renamebin.js src.bin dst.bin textures
```

引数:

- `src.bin`: 元のバイナリファイル
- `dst.bin`: 出力先バイナリファイル
- `textures`: `.png` ファイルが入ったフォルダ

## 動作

`renamebin.js` を実行すると次の順で処理します。

1. `textures` 内の非ASCIIな `.png` ファイル名を探す
2. それらを `0____.png` のような ASCII 名に変更する
3. 同じファイル名を `src.bin` 内で置換する
4. 結果を `dst.bin` に書き出す

## 注意

- 対象は `.png` ファイルのみです。
- 非ASCII文字を含むファイル名だけを変更します。
- ファイル名の長さは Shift_JIS のバイト長で扱います。
- バイナリ内で置換後の名前が元の領域に収まる必要があります。

## License

MIT
