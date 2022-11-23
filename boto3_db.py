import boto3

# s3 = boto3.resource('s3')

BUCKET_NAME="pinature-bucket"

s3 = boto3.client("s3")

# List all buckets
for bucket in s3.list_buckets():
    print(bucket)

response = s3.list_buckets()
print(response['Buckets'])

def upload_files(file_name, bucket, object_name=None, args=None):
    """
    file_name: name of file on local computer
    bucket: bucket name
    object_name: name of file on S3
    args: custom args
    """

    if object_name is None:
        object_name = file_name

    response = s3.upload_file(file_name, bucket, object_name, ExtraArgs = args)

    print(response)
