docker-compose = docker-compose -f ./docker/docker-compose.yml

up:
	${docker-compose} up

down:
	${docker-compose} down

daemon:
	${docker-compose} up -d

destroy:
	${docker-compose} down -v