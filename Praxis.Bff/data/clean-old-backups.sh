#!/bin/bash
find /var/backups/mongodb/ -mtime +3 -exec rm -rf {} \;