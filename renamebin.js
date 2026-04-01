import { maketxtfnlist } from "./maketxtfnlist.js";
import { renametxtfn } from "./renametxtfn.js";
import { renamebinbymap } from "./renamebinbymap.js";

export const renamebin = async (srcfn, dstfn, texturepath) => {
  const list = await maketxtfnlist(texturepath);
  await renametxtfn(texturepath, list);
  await renamebinbymap(srcfn, dstfn, list);
};

if (import.meta.main) {
  const args = Deno.args;
  if (args.length < 3) {
    console.log("renamebin [src bin file] [dst bin file] [texture path]");
    Deno.exit(1);
  }
  const fn = args[0];
  const dstfn = args[1];
  const texturepath = args[2];
  await renamebin(fn, dstfn, texturepath);
}
