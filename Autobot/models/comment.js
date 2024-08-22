module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });
    };
  
    return Comment;
  };
  