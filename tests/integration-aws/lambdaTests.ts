import {getFunctions} from './awsHelpers';
import {expect} from 'chai';
import {supportedBanks} from "../../supportedBanks";


describe("#AWS Tests", async () => {

    it("Should 5 functions running", async () => {
        const runningFunctions = await getFunctions();

        expect(runningFunctions.length).to.equal(5);
    });

    it("Should create the correct names", async () => {
        const runningFunctions = await getFunctions();

        const functionNames = runningFunctions.map(f => f.FunctionName);

        const expectedBankNames = supportedBanks.map(bank => `${bank}-monitoring-lambda`);

        expect(functionNames).to.have.members(expectedBankNames);
    });

    it("Should have been given an ARN by AWS", async () => {
        const runningFunctions = await getFunctions();

        const functionArns = runningFunctions.map(f => f.FunctionArn);

        const expectedArns = supportedBanks.map(bank => `arn:aws:lambda:eu-west-1:462093374796:function:${bank}-monitoring-lambda`);

        expect(functionArns).to.have.members(expectedArns);
    });

    it("Should have memory set to 256mb", async () => {
        const runningFunctions = await getFunctions();

        const functionMemorySizes = [...new Set(runningFunctions.map(f => f.MemorySize))];

        expect(functionMemorySizes.length).to.equal(1);
        expect(functionMemorySizes[0]).to.equal(256);
    });
});
