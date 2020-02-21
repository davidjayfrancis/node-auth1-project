const db = require("../data/db-config");

module.exports = {
  find,
  add,
  findBy,
  findById
};

function find() {
  return db("users").select("id", "username");
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      console.log(id);
      return findById(id);
    });
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter)
    .first();
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
