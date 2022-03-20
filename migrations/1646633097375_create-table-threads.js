/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.createTable('threads', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      title: {
        type: 'TEXT',
        primaryKey: true,
      },
      body: {
        type: 'TEXT',
        notNull: true,
      },
      owner: {
        type: 'VARCHAR(50)',
        notNull: true,
        foreignKeys: {
            columns: 'id',
            references: 'users',
            onDelete: 'restrict',
        } 
      },
      date: {
        type: 'timestamp',
        default: pgm.func('current_timestamp'),
      },
      username: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('threads');
  };
  