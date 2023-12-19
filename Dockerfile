# Stage 1: Build Frontend with Node.js
FROM node:20.10.0-alpine3.18 as frontend

WORKDIR /app/frontend

# copy package.json and yarn.lock to the container
COPY frontend/package.json .
COPY frontend/yarn.lock .

# install frontend dependencies
RUN yarn install

# copy the rest of the frontend files
COPY frontend/ .

# build the frontend
RUN yarn build

# Stage 2: Build Backend with Python
FROM python:3.11 as backend

COPY --from=frontend /app/frontend/build /app/frontend/build

# Set the working directory in the container
WORKDIR /app/backend

# Copy the requirements file into the container at /app
COPY backend/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Execute unit test code
RUN python -m pytest backend/tests

# Copy the current directory contents into the container at /app
COPY backend/ .

# Expose port for the Flask app to run on
EXPOSE 5000

# Run flask when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]
