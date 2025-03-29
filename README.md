# Speed Run Backend

This is the backend for the 3-tier webapp speed-run on Iximiuz Labs. It uses drizzle-orm and connects to a postgresql database.

## Running locally

You'll need to have a postgresql database running before you try to do any migration stuff. There's a convenience script `run-db.sh` if you want to use it, since it starts up the DB in a container and creates the initial `drizzle` database (which the ORM can't do by design, oddly enough...).

But really, any way you'd like to start a postgres server and create the drizzle database will work.

And then you'll need the connection string locally for drizzle to pick up, so you can just run

```bash
echo DATABASE_URL=postgres://postgres:mypassword@localhost:5432/drizzle > .env
```

> I obviously could have just put that in an .env file and _not_ gitignored it, but that felt not as nice.

```bash
npm i
npx drizzle-kit generate
npx drizzle-kit migrate
npm run dev
```

You should now be able to run

```bash
curl localhost:3000/users | jq
```

and see a nice bunch of data coming back

```bash
[
  {
    "id": 1,
    "name": "Mouhamed",
    "age": -118655047,
    "email": "motivational_shakeia@outlook.com"
  },
  {
    "id": 2,
    "name": "Gisele",
    "age": 1415217029,
    "email": "bronchial_myrtice@orange.fr"
...
```
