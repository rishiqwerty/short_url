FROM python:3.11.4
# Copy files to container at /usr/src/app
COPY . /usr/src/app
# Setting working directory
WORKDIR /usr/src/app/backend/
RUN ls -l 
# Install required packages from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000