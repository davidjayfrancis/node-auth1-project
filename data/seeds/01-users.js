exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "shithead", password: "cool" },
        { id: 2, username: "guy", password: "cool" },
        { id: 3, username: "girl", password: "cool" }
      ]);
    });
};
