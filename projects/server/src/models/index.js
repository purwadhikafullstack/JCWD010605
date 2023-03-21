'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require('./users')(sequelize, Sequelize);
db.propertys = require('./propertys')(sequelize, Sequelize);
db.categories = require('./categories')(sequelize, Sequelize);
db.fasilities = require('./fasilities')(sequelize, Sequelize);
db.rooms = require('./rooms')(sequelize, Sequelize);
db.special_price = require('./special_price')(sequelize, Sequelize);
db.available_date = require('./available_date')(sequelize, Sequelize);

db.propertys.belongsTo(db.categories, { foreignKey: 'categories_id' });
db.rooms.belongsTo(db.propertys, { foreignKey: 'propertys_id' });
db.rooms.belongsTo(db.special_price, { foreignKey: 'special_price_id' });
db.rooms.belongsTo(db.available_date, { foreignKey: 'available_date_id' });
db.transaction.belongsTo(db.rooms, { foreignKey: 'room_id' });

//propertys_fasilities
db.propertys.belongsToMany(db.fasilities, {
  through: db.propertys_fasilities,
  foreignKey: 'property_id',
});
db.fasilities.belongsToMany(db.propertys, {
  through: db.propertys_fasilities,
  foreignKey: 'fasility_id',
});

module.exports = db;
