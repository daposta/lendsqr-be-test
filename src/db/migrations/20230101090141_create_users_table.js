/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function (table) {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('username', 255);
      table.string('pin', 255);
      table.timestamps();
    })
  
    ;
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schemadropTable('users')
    
  
};
