# Using this project

## The docker application

The container runs a script which takes a "--name" and an optional "--region" parameter. To run the container and pass in these parameters you can do:
```
docker run -it <container-name> --name my-bucket --region ca-central-1
```


To pass this parameter in during CDK deployment, you can use a context variable like so:

```
cdk deploy InfrastructureStack -c bucketName=my-bucket
```


This will pass the bucket name into the container as a runtime argument. If you wanted to go further and connect this service up to some other services you could see how to use CloudMap via the CDK (and other stuff) in some [blog posts](https://mikemather.cintsa-cms.com/posts/aws-cloud-map-service-discovery-for-ecs-fargate-containers/) I've written in the past ;)