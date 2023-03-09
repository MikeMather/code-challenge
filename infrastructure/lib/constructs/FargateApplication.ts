import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as path from 'path';

export type ApplicationProps = {
  bucketName?: string;
}

export default class FargateApplication extends Construct {

  vpc: ec2.IVpc;
  cluster: ecs.Cluster;
  service: ecs.FargateService;

  constructor(scope: Construct, id: string, props?: ApplicationProps) {
    super(scope, id);
    this.vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      isDefault: true, // just for demo purposes, don't do this in prod
    });

    this.createCluster();
    this.createService(props?.bucketName || 'default-bucket-name');
  }

  createCluster() {
    this.cluster = new ecs.Cluster(this, 'Cluster', { 
      vpc: this.vpc,
    });
  }

  createService(bucketName: string) {
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef');
    taskDefinition.addContainer('app', {
      image: new ecs.AssetImage(path.join(__dirname, '../../..', 'app')),
      memoryLimitMiB: 512,
      command: ['--name', bucketName],
    });

    /**
     * For simplicity's sake, I'm using a public subnet here so that the container can pull the ECR image 
     * over the internet. In a production environment, you'd likely want to use a private subnet with a 
     * VPN endpoint to access ECR to pull the image, and a load balancer in a public subnet to access the service
     */
    this.service = new ecs.FargateService(this, 'Service', {
      cluster: this.cluster,
      taskDefinition,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      }
    });
  }
}