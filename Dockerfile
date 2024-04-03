FROM node:16

ARG NC_INSTALL=true
RUN echo "Running dockerfile..."
# Install nc if specified
RUN if [ "$NC_INSTALL" = "true" ]; then \
      apt-get update && apt-get install -y netcat; \
    fi

# ... (other setup steps)

# Copy wait-for-postgres.sh script
# COPY init-db.sh /app/init-db.sh
# RUN chmod +x /app/init-db.sh

# ... (other setup steps)

# Example: Set working directory
# WORKDIR /usr/src/app
