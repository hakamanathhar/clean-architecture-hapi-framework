/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.createTable('comments', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      content: {
        type: 'TEXT',
        notNull: true,
      },
      content: {
        type: 'TEXT',
        notNull: true,
      },
      thread_id: {
        type: 'VARCHAR(50)',
        notNull: true,
        foreignKeys: {
            columns: 'id',
            references: 'threads',
            onDelete: 'restrict',
        } 
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
    pgm.dropTable('comments');
  };
  