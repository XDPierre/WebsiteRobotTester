import os

def generate_docker_compose(num_copies):
    compose_file = open("docker-compose.yml", "w+")

    # Write the initial part of the Docker Compose file
    compose_file.write("version: '3'\n")
    compose_file.write("services:\n")

    compose_file.write("  selenium-hub:\n")
    compose_file.write("    image: selenium/hub\n")
    compose_file.write("    container_name: selenium-hub\n")
    compose_file.write("    ports:\n")
    compose_file.write("      - '4442:4442'\n")
    compose_file.write("      - '4443:4443'\n")
    compose_file.write("      - '4444:4444'\n\n")    

    # Generate the services with unique names
    for i in range(1, num_copies + 1):
        service_name = f"selenium-node-chrome-{i}"
        taylorshow_name = f"taylorshow-{i}"
        
        compose_file.write(f"  {service_name}:\n")
        compose_file.write("    image: selenium/node-chrome\n")
        compose_file.write("    shm_size: 2g\n")
        compose_file.write("    environment:\n")
        compose_file.write("      - SE_EVENT_BUS_HOST=selenium-hub\n")
        compose_file.write("      - SE_EVENT_BUS_PUBLISH_PORT=4442\n")
        compose_file.write("      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443\n")
        compose_file.write("    depends_on:\n")
        compose_file.write("      - selenium-hub\n")
        compose_file.write(f"    ports:\n")
        compose_file.write(f"      - '{7900 + i}:5900'  # Expose VNC port for the browser window\n\n")
        
        compose_file.write(f"  {taylorshow_name}:\n")
        compose_file.write("    image: taylorshow:latest\n")
        compose_file.write("    environment:\n")
        compose_file.write(f"      - HOSTNAME={i}\n")
        compose_file.write("    depends_on:\n")
        compose_file.write("      - selenium-hub\n")
        compose_file.write(f"      - {service_name}\n\n")

    compose_file.close()

# Usage: Call the function with the desired number of copies
generate_docker_compose(2)
