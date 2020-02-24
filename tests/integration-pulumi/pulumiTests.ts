import {bankLambdas, CoreInfra, coreStack} from '../../index';
import {expect} from 'chai';
import * as chai from 'chai';
import {promise} from "./index";
import * as pulumi from "@pulumi/pulumi";
import {Output} from "@pulumi/pulumi";

describe("#Bank Lambda Provisioning", async () => {

    it("Should have created 5 lambdas", async () => {
        expect(bankLambdas.length).to.equal(5);
    });

    it("Should have given each lambda should have it's own role", async () => {

        const roles = await bankLambdas.map(async bl => await promise(bl.role));
        const uniqueRoles = [...new Set(roles.map((item) => item))];

        expect(uniqueRoles.length).to.equal(5);
    });

    it("Should have used the same bucket for all lambdas", async () => {
        const buckets = await bankLambdas.map(async bl => await promise(bl.s3Bucket));
        const uniqueBuckets = [...new Set(buckets.map((item: any) => item.id))];

        expect(uniqueBuckets.length).to.equal(1);
    });

    it("Should have used the same zip file for all lambdas", async () => {
        const keys = await bankLambdas.map(async bl => await promise(bl.s3Key));
        const uniqueKeys = [...new Set(keys.map((item: any) => item.id))];

        expect(uniqueKeys.length).to.equal(1);
    });
});
