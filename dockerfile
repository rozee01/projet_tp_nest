# To optimize image sizes further and improve caching
# I will use the following steps

# 1 - Dependencies Level
# 2 - Building Level
# 3 - Runner Level

###### 1 Dependencies

# Some Nest functionalities require newer node versions
# Use the node 22-alpine image which is a node 22 installed on alpine linux.
FROM node:22-alpine AS dependencies
# Create and change to the app directory.
WORKDIR /usr/src/app
# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
# Install production dependencies.
RUN npm install

###### 2 Building

FROM node:22-alpine AS builder

WORKDIR /usr/src/app
# We will then need to copy the relevant artifacts from the previous layer into the builder
# and also set the current working directory.
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy Source files
COPY . .

# Build the project

RUN npm run build

# Removes the devDependencies
RUN npm prune --production

###### 3 Running

FROM node:22-alpine AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/*.env .

EXPOSE 3000

# Run the application
CMD ["node", "dist/main"]
