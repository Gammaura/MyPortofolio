import fs from "fs";
import path from "path";

const raw = fs.readFileSync(path.join(process.cwd(), "src/data/cv-data.json"), "utf-8");
const migrationData = JSON.parse(raw);

export default migrationData;
