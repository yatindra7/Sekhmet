#!/bin/bash

PYTHON = python3
DB_FILE = db.py

if psql -lqt | cut -d \| -f 1 | grep -qw $1; then
    # do nothing
    echo "DB $1 EXISTS"
else
    ${PYTHON} ${DB_FILE} ${DBNAME}
    psql -U yatindra -d $1 -c "\i triggers.sql;"
fi
