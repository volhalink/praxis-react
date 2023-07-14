#!/bin/bash
mongodump --authenticationDatabase admin -u $MONGO_BACKUP_USERNAME -p $MONGO_BACKUP_PASSWORD --db $MONGO_API_DATABASE --out /var/backups/mongodb/$(date +'%Y-%m-%d')
