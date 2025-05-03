import * as path from "node:path";
import * as process from "node:process";
import { generateApi } from "swagger-typescript-api";

await generateApi({
  input: path.resolve(process.cwd(), "./open-api/schema.yaml"),
  output: path.resolve(process.cwd(), "./src/__generated__"),
  generateClient: true,
  extractRequestBody: true,
  extractRequestParams: true,
});
