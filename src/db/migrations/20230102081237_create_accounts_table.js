/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('accounts', function(table){
        table.integer('balance', 255);
        table.timestamps();
        table.integer('user_id').unsigned().nullable();
        // add foreign keys constraint:
        table.foreign('user_id').references('users.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.dropTable('accounts')
};
