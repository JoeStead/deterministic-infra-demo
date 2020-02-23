import {configureBankLambdaConfiguration} from '../../lambdaBuilder';
import { expect } from 'chai';
describe("#Lambda Builder", () => {

    const lambdaConfig = configureBankLambdaConfiguration("test-bank");

    it("Should have the correct lambda name", async () => {
        expect(lambdaConfig.name).to.equal('test-bank-monitoring-lambda');

    });
    it("Should create the correct environment variables", async () => {
        expect(lambdaConfig.environment.variables["BankToTrack"]).to.equal('test-bank');
    });
});
