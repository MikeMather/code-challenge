import boto3
import argparse
import re
import time

def create_bucket(bucket_name: str, region: str) -> None:
    print("Creating bucket: ", bucket_name, " in region: ", region)
    try:
      s3 = boto3.resource('s3', region_name=region)
      s3.create_bucket(Bucket=bucket_name)
      print("Bucket created successfully")
    except Exception as e:
      print("Error creating bucket: ", e)
    
    # Keep the container running so that that the deployment
    # considers the container healthy
    while True:
       time.sleep(1)

if __name__ == '__main__':
    argParser = argparse.ArgumentParser()
    argParser.add_argument("-n", "--name", help="the name of the bucket to create", required=True)
    argParser.add_argument("-r", "--region", help="the region to create the bucket in (default: us-east-1)", default="us-east-1")
    args = argParser.parse_args()

    # Verify that the bucket matches the S3 naming requirements
    bucket_name_regex = re.compile(r'^(?!(^xn--|.+-s3alias$))^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$')
    if not bucket_name_regex.match(args.name):
        raise Exception(f"""
        Invalid bucket name: {args.name}. Bucket names must match the requirements specified here:
        https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
      """)

    create_bucket(args.name, args.region)