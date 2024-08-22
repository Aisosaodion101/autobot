module.exports = (sequelize, DataTypes) => {
    const Autobot = sequelize.define('Autobot', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    Autobot.associate = (models) => {
      Autobot.hasMany(models.Post, {
        foreignKey: 'autobotId',
        as: 'posts'
      });
    };
  
    return Autobot;
  };
  