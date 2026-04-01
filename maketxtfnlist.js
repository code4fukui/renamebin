import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { ASCII } from "https://code4fukui.github.io/ASCII/ASCII.js";
import { EXT } from "https://code4fukui.github.io/EXT/EXT.js";
import { SJIS } from "https://code4fukui.github.io/SJIS/SJIS.js";

export const maketxtfnlist = async (path) => {
  const list = await dir2array(path);
  //console.log(list);

  const list2 = list.filter(i => i.endsWith(".png") && !ASCII.check(i));
  //console.log(list2);

  list2.sort((a, b) => SJIS.encode(a).length - SJIS.encode(b).length);

  const list3 = list2.map((fn, idx) => {
    const ext = EXT.get(fn);
    const orglen = SJIS.encode(fn).length - ext.length - 1;
    const idxlen = idx.toString().length;
    if (idxlen > orglen) throw new Error("no more fn2 spaces");
    const padlen = orglen - idxlen;
    const fn2 = idx.toString().padEnd(idxlen + padlen, "_") + "." + ext;
    return { idx, fn, fn2 }
  });
  return list3;
};

if (import.meta.main) {
  const args = Deno.args;
  if (args.length < 2) {
    console.log("maketxtfnlist [txture path] [output csv filename]");
    Deno.exit(1);
  }
  const path = args[0];
  const dstfn = args[1];
  const list3 = await maketxtfnlist(path);
  await Deno.writeTextFile(dstfn, CSV.stringify(list3));
}
