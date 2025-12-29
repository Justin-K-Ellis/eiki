import "dotenv/config";
import seedUnits from "./seedUnits";
import seedPassageAndOptions from "./seedPassagesAndOptions";

async function main() {
  // await seedUnits();
  await seedPassageAndOptions();
}

main();
