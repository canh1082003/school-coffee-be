source .env;
if [ -n "${DB_USERNAME:-}" ] && [ -n "${DB_PASSWORD}" ]; then
     echo "Start generator 🚀🚀🚀"
	 yarn typeorm-model-generator -h ${HOST} -d ${DB_NAME} -u ${DB_USERNAME} -x ${DB_PASSWORD} -e ${DB_TYPE} -p ${DB_PORT} -o ./src/databases/postgresql -s prod
   rm ./src/databases/postgresql/ormconfig.json
   rm ./src/databases/postgresql/tsconfig.json
else
	echo "SETUP INFO: No Environment variables given!"
fi