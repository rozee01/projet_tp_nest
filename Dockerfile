# Use the official MySQL image as a base
FROM mysql:latest

# Set environment variables
ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE projet_nest

# Expose the MySQL port
EXPOSE 3306
