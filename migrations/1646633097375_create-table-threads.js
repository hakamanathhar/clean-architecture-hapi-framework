/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.createTable('threads', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      content: {
        type: 'TEXT',
        notNull: true,
      },
      images: {
        type: 'TEXT',
        notNull: true,
      },
      createdBy: {
        type: 'VARCHAR(50)',
        notNull: true,
        foreignKeys: {
            columns: 'id',
            references: 'users',
            onDelete: 'restrict',
        } 
      },
      createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      updatedBy: {
        type: 'VARCHAR(50)',
        notNull: true,
        foreignKeys: {
            columns: 'id',
            references: 'users'
        } 
      },
      updatedAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('threads');
  };
  