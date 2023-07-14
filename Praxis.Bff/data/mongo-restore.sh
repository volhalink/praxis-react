#!/bin/bash
helpFunction()
{
   echo "" >&2
   echo "Usage: $0 -d Y-m-d" >&2
   echo -e "\t-d Date in format Y-m-d eg. 2023-07-10" >&2
   exit 1 # Exit script after printing help
}

while getopts ":d:" opt; do
  case $opt in
    d)
	  backup_date="$OPTARG"
      echo "restoring backup for the date $backup_date" >&2
	  mongorestore --authenticationDatabase admin -u $MONGO_RESTORE_USERNAME -p $MONGO_RESTORE_PASSWORD --nsInclude=$MONGO_API_DATABASE.$MONGO_API_COLLECTION --drop var/backups/mongodb/"$backup_date"/
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      helpFunction
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      helpFunction
      ;;
  esac
done

if [ -z "$backup_date" ]
then
	echo "Provide the backup's date, please." >&2
    helpFunction
fi
