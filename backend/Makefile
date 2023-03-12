DBNAME = sekhmet
PYTHON = python3
APP_FILE = app.py
DB_FILE = db.py
LOG_FILE = server.log
PORT = 5000
WORKERS = 2

run: APP_FILE
	${PYTHON} ${APP_FILE} ${DBNAME}

db: DB_FILE
	${PYTHON} ${DB_FILE} ${DBNAME}

serve:
	gunicorn -w ${WORKERS} -b 127.0.0.1:${PORT} --access-logfile ${LOG_FILE} 'app:app'

APP_FILE:

DB_FILE:
