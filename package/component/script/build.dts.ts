import { execa } from "execa";

buildTypes();

async function buildTypes() {
  await removeTypes();
  await rollupTypes();
}

async function removeTypes() {
  const { stdout } = await execa("rimraf", ["types"]);
}

async function rollupTypes() {
  try {
    const { stdout } = await execa("vue-tsc", [
      "--declaration",
      "--emitDeclarationOnly",
    ]);
    console.log("generate types successfully.");
  } catch (error) {
    console.error(`ERROR: The command failed. stdout:${error.stdout}`);
  }
}
