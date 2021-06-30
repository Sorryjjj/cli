import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prettier from "prettier";

export default (config) => {
    
    const __dirname = fileURLToPath(import.meta.url)
    const indexTemplate = fs.readFileSync(path.resolve(__dirname, "../template/index.ejs"))
    const code = ejs.render(indexTemplate.toString(), {
        middleware: config.middleware,
        port: config.port
    })

    return prettier.format(code, {parser: "babel"})
};