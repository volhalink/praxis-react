#!/bin/bash
mongosh -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
use admin;
db.createUser({ user: "${MONGO_BACKUP_USERNAME}", pwd: "${MONGO_BACKUP_PASSWORD}", roles: [ { role: "backup", db: "admin"} ] } );
db.createUser({ user: "${MONGO_RESTORE_USERNAME}", pwd: "${MONGO_RESTORE_PASSWORD}", roles: [ { role: "restore", db: "admin" } ] } );

apidb = db.getSiblingDB("${MONGO_API_DATABASE}");
apidb.createUser({ user: "${MONGO_API_USERNAME}", pwd: "${MONGO_API_PASSWORD}", roles: [ { role: "readWrite", db: "${MONGO_API_DATABASE}" } ] } );
apidb.createUser({ user: "${MONGO_MIGRTIONS_USERNAME}", pwd: "${MONGO_MIGRTIONS_PASSWORD}", roles: [ { role: "readWrite", db: "${MONGO_API_DATABASE}" } ] } );
apidb.createCollection("${MONGO_API_COLLECTION}");
EOF