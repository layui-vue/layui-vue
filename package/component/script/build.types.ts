// @ts-ignore
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import * as path from "path";
import { execa } from "execa";

buildTypes();

async function buildTypes() {
  await removeTypesDir();
  await genDts();
  await rollupDts();
}

async function removeTypesDir() {
  const { stdout } = await execa("rimraf", ["types"]);
  console.log("remove types Dir.");
}

async function genDts() {
  try {
    console.log(`building types...`);
    const { stdout } = await execa("vue-tsc", [
      "--declaration",
      "--emitDeclarationOnly"
    ]);
    console.log("generate types successfully.");
  } catch (error) {
    console.error(
      `ERROR: The command failed. stdout:${error.stdout}, stderr: ${error.stderr} (${error.exitCode})`
    );
  }
}

async function rollupDts() {
  const extractorConfigPath = path.resolve(process.cwd(), `api-extractor.json`);
  const extractorConfig =
    ExtractorConfig.loadFileAndPrepare(extractorConfigPath);
  console.log(`rollup types...`);
  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    console.log("API Extractor completed successfully.");
    process.exitCode = 0;
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    );
    process.exitCode = 1;
  }
}
