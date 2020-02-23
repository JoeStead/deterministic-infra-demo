import * as aws from "@pulumi/aws";

interface LambdaRoleArgs {
    name: string;
};


/** Helper method to create a role for lambda execution
 */
export class LambdaRole extends aws.iam.Role {

    private roleNamePrefix: string;

    constructor(args: LambdaRoleArgs) {
        const policy = {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "sts:AssumeRole",
                    Principal: {
                        Service: ["lambda.amazonaws.com"],
                    },
                    Effect: "Allow",
                    Sid: "",
                },
            ],
        };
        super(
            `${args.name}-lambda-role`,
            {
                name: `${args.name}-lambda-role`,
                assumeRolePolicy: JSON.stringify(policy),
            },            );

        this.roleNamePrefix = args.name;

        new aws.iam.RolePolicyAttachment(
            `${args.name}-vpc-role-attachment`,
            {
                policyArn: aws.iam.AWSLambdaVPCAccessExecutionRole,
                role: this,
            },);


    }
}
