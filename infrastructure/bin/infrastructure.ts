#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();

// Get the bucket name from the context
// can be used when deploying by using the -c flag. E.g. cdk deploy -c bucketName=my-bucket-name
const bucketNameArg = app.node.tryGetContext("bucketName")

new InfrastructureStack(app, 'InfrastructureStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  bucketName: bucketNameArg
});