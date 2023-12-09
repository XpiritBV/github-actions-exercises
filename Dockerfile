# Choose the Node.js version
FROM node:20

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY /src/ .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD [ "node", "server.js" ]