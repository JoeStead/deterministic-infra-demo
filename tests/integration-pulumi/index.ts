import * as fs from "fs";
import * as path from "path";
import * as pulumi from "@pulumi/pulumi";
import * as Mocha  from 'mocha';

export function runTests() {
    // Create a new Mocha test runner (with a long timeout).
    const mocha = new Mocha({ timeout: 1000*60*30 });

    // Only keep the .ts files, and skip this file (index.ts).
    const testDir = __dirname;
    fs.readdirSync(testDir).
    filter(file => file.endsWith(".ts") && file !== "index.ts").
    forEach(file => { mocha.addFile(path.join(testDir, file)); });

    // Now actually run the tests with the desired reporter.
    console.log(`Running Mocha Tests: ${mocha.files}`);
    mocha.reporter("spec").run(failures => {
        process.exitCode = failures ? 1 : 0;
    });
}

// promise returns a resource output's value, even if it's undefined.
export function promise<T>(output: pulumi.Output<T>): Promise<T> {
    return (output as any).promise as Promise<T>;
}
