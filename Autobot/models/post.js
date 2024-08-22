module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      autobotId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Post.associate = (models) => {
      Post.belongsTo(models.Autobot, {
        foreignKey: 'autobotId',
        as: 'autobot'
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments'
      });
    };
  
    return Post;
  };
  