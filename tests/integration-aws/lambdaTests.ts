import {getFunctions} from './awsHelpers';
import {expect} from 'chai';
import {supportedBanks} from "../../supportedBanks";


describe("#AWS Tests", async () => {

    it("Should 5 functions running", async () => {
        const functionResponse = await getFunctions();

        expect(functionResponse.length).to.equal(5);
    });

    it("Should create the correct names", async () => {
        const functionResponse = await getFunctions();

        const functionNames = functionResponse.map(f => f.FunctionName);

        const expectedBankNames = supportedBanks.map(bank => `${bank}-monitoring-lambda`);

        expect(functionNames).to.have.members(expectedBankNames);
    });

    it("Should have been given an ARN by AWS", async () => {
        const functionResponse = await getFunctions();

        const functionArns = functionResponse.map(f => f.FunctionArn);

        const expectedArns = supportedBanks.map(bank => `arn:aws:lambda:eu-west-1:462093374796:function:${bank}-monitoring-lambda`);

        expect(functionArns).to.have.members(expectedArns);
    });

    it("Should have memory set to 256mb", async () => {
        const functionResponse = await getFunctions();

        const functionMemorySizes = [...new Set(functionResponse.map(f => f.MemorySize))];

        expect(functionMemorySizes.length).to.equal(1);
        expect(functionMemorySizes[0]).to.equal(128);
    });
});
