To run the backend:

$ `psql`
# Inside PSQL
$ `CREATE DATABASE <DB_NAME>`
$ `make db`
$ `make`

In case of `sqlalchemy.exc.IntegrityError` error.
Change `DBNAME` from `ass9` to `ass[10..n].db` in `Makefile`.
Its makeshift because I'm going for lunch now.
