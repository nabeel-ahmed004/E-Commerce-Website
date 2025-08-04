#!/bin/bash

case "$1" in
  start)
    echo "Starting MongoDB..."
    docker-compose up -d
    ;;
  stop)
    echo "Stopping MongoDB..."
    docker-compose down
    ;;
  restart)
    echo "Restarting MongoDB..."
    docker-compose down && docker-compose up -d
    ;;
  reset)
    echo "Stopping and removing MongoDB and volume..."
    docker-compose down -v
    ;;
  logs)
    docker-compose logs -f
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|reset|logs}"
    ;;
esac
