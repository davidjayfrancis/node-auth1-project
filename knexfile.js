module.exports = {
  client: "sqlite3",
  connection: {
    filename: "./data/mydb.db3"
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations"
  },
  seeds: {
    directory: "./data/seeds"
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    }
  }
};
