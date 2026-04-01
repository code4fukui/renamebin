import { CSV } from "https://js.sabae.cc/CSV.js";

export const renametxtfn = async (path, data) => {
  for (const item of data) {
    await Deno.rename(path + "/" + item.fn, path + "/" + item.fn2);
  }
};

if (import.meta.main) {
  const args = Deno.args;
  if (args.length < 2) {
    console.log("renametxtfn [txture path] [output csv filename]");
    Deno.exit(1);
  }
  const path = args[0];
  const csvfn = args[1];
  const data = await CSV.fetchJSON(csvfn);
  await renametxtfn(path, data);
}
