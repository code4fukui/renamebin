import { findbin } from "https://code4fukui.github.io/binutil/binutil.js";
import { SJIS } from "https://code4fukui.github.io/SJIS/SJIS.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

export const renamebinbymap = async (fn, dstfn, data) => {
  const bin = await Deno.readFile(fn);
  for (const item of data) {
    const s = item.fn;
    const key = SJIS.encode(s);
    const dst = SJIS.encode(item.fn2);
    for (let i = 0; i < bin.length;) {
      const n = findbin(bin, key, i);
      if (n < 0) break;
      bin.set(dst, n);
      console.log(item.fn, "->", item.fn2);
      i = n + 1;
    }
  }
  await Deno.writeFile(dstfn, bin);
};

if (import.meta.main) {
  const args = Deno.args;
  if (args.length < 2) {
    console.log("renamebinbymap [src bin file] [dst bin file] [filename map csv]");
    Deno.exit(1);
  }
  const fn = args[0];
  const dstfn = args[1];
  const csvfn = args[2];
  const data = await CSV.fetchJSON(csvfn);
  await renamebinbymap(fn, dstfn, data);
}
