// sudo vim  /usr/local/var/postgres/postgresql.conf
// tail -f /usr/local/var/log/postgres.log
const postgres = require("postgres");

const DBname = "blue_ocean_dev";
const sql = postgres({
  host: "localhost", // Postgres ip address[s] or domain name[s]
  port: 5432, // Postgres server port[s]
  database: DBname, // Name of database to connect to
  username: "postgres", // Username of database user
  password: "password" // Password of database user
});

module.exports = { sql };
