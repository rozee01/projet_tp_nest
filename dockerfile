# Some Nest functionalities require newer node versions
# Use the node 22-alpine image which is a node 22 installed on alpine linux.
FROM node:22-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install


# uncomment this in production

# # update production dependencies.
# RUN npm update

# Copy local code to the container image.
COPY . .

# Build the application
RUN npm run build

# Run the application
CMD ["npm", "run", "start:prod"]
