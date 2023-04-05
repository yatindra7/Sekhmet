# To run the backend:

$ `psql` </br>
db=# `CREATE DATABASE <DB_NAME>` </br>
$ `make db` </br>
$ `make` </br>

In case of `sqlalchemy.exc.IntegrityError` error.
Change `DBNAME` from `ass9` to `ass[10..n].db` in `Makefile`.
Its makeshift because I'm going for lunch now.
