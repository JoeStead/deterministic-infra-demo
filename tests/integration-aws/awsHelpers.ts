import * as aws from "aws-sdk";

interface lambdaResponse {
    Functions : functionResponse[]
}

interface functionResponse{
    FunctionName: string,
    FunctionArn: string,
    MemorySize: number
}

export async function getFunctions() : Promise<functionResponse[]> {
    const credentials = new aws.SharedIniFileCredentials({profile: 'default'});
    const lambda = new aws.Lambda({
        region: 'eu-west-1',
        apiVersion: '2015-03-31',
        credentials: credentials
    });

    const functionRequest = lambda.listFunctions();
    const functionResponse = await functionRequest.promise();
    return (functionResponse as lambdaResponse).Functions;
}

