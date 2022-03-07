/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.createTable('comments', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      message: {
        type: 'TEXT',
        notNull: true,
      },
      threadId: {
        type: 'VARCHAR(50)',
        notNull: true,
        foreignKeys: {
            columns: 'id',
            references: 'threads',
            onDelete: 'restrict',
        } 
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
    pgm.dropTable('comments');
  };
  