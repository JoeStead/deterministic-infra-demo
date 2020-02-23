import * as pulumi from "@pulumi/pulumi";
import { configureBankLambdaConfiguration }from "./lambdaBuilder";
import * as roleUtils from "./roleExtensions";
import * as aws from "@pulumi/aws";
import {Output} from "@pulumi/pulumi";
import {runTests} from "./tests/integration-pulumi";
import {supportedBanks} from "./supportedBanks";

export interface CoreInfra {
    lambdaBucket: string,
    baseDomainName: string
}

const env = pulumi.getStack();

export const coreStack = new pulumi.StackReference(`JoeStead/core/${env}`);

const infra = coreStack.getOutput('core') as Output<CoreInfra>;

const banksToTrack = supportedBanks;

const lambdas : aws.lambda.Function[] = [];

banksToTrack.forEach(bank => {

    const lambdaConfig = configureBankLambdaConfiguration(bank);

    const lambdaRole = new roleUtils.LambdaRole({
        name: `${bank}-lambda-role`,
    });

    const bankLambda = new aws.lambda.Function(`${bank}-monitor-function`, {
        runtime: aws.lambda.DotnetCore2d1Runtime,
        role: lambdaRole.arn,
        s3Bucket: infra.lambdaBucket,
        ...lambdaConfig
    });

    lambdas.push(bankLambda);
});

export const bankLambdas = lambdas;

runTests();
