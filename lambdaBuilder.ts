interface EnvironmentVariables {
    variables: {
        [key: string]: string;
    };
}

interface BankLambdaSettings{
    name: string,
    s3Key: string,
    handler: string,
    environment: EnvironmentVariables
}

export const configureBankLambdaConfiguration = (bankName: string) : BankLambdaSettings => {

    return {
        name: `${bankName}-monitoring-lambda`,
        s3Key: 'bank-trackinglambda.zip',
        handler: 'BankTrackingLambda::BankTrackingLambda.LambdaEntryPoint::Handle',
        environment: {
            variables: {
                ["BankToTrack"]: bankName
            }
        }
    }
};
