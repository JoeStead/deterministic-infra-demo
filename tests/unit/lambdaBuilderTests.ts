import {configureBankLambdaConfiguration} from '../../lambdaBuilder';
import {expect} from 'chai';

describe("#Lambda Builder", () => {


    it("Should have the correct lambda name", () => {
        const lambdaConfig = configureBankLambdaConfiguration("test-bank");

        expect(lambdaConfig.name).to.equal('test-bank-monitoring-lambda');
    });

    it("Should create the correct environment variables", () => {
        const lambdaConfig = configureBankLambdaConfiguration("test-bank");

        expect(lambdaConfig.environment.variables["BankToTrack"]).to.equal('test-bank');
    });
});
