# Use the Alpine Linux base image
FROM alpine:latest

# Update the package list and install git
RUN apk update && apk add git

# Set the entry point to a shell
ENTRYPOINT ["/bin/sh"]