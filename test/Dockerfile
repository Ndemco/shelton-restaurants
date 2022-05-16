FROM mariadb:latest

COPY sql/*.sql /docker-entrypoint-initdb.d
VOLUME ["/docker-entrypoint-initdb.d"]

CMD ["mysqld"]
