FROM python:3.10

# Install AWS CLI
RUN pip install awscli

# Copy files and install requirements
ADD create_bucket.py .
ADD requirements.txt .
RUN pip install -r requirements.txt

# Passing -h as default command to show help when the required arguments are not passed
ENTRYPOINT ["python", "create_bucket.py"]
CMD ["-h"]