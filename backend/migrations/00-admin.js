async function down(queryInterface, DataTypes) {
  await queryInterface.dropTable('Admin');
}

async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('Admin', {
    _id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(36)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  await queryInterface.addIndex('Admin', ['username', 'password']);
}

module.exports = {
  up,
  down
};