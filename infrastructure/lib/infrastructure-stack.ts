import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import FargateApplication from './constructs/FargateApplication';

type InfrastructureStackProps = cdk.StackProps & {
  bucketName: string;
};

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: InfrastructureStackProps) {
    super(scope, id, props);

    // The construct that creates the Fargate application
    const application = new FargateApplication(this, 'BusPatrolApp', { bucketName: props?.bucketName });
  }
}
