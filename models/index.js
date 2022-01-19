const dbConfig = require("../config/mysql");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging:false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Event = require('./Event.js')(sequelize, Sequelize);
db.Category = require('./Category.js')(sequelize, Sequelize);
db.Venue = require('./Venue.js')(sequelize, Sequelize);
db.Ticket = require('./Ticket.js')(sequelize, Sequelize);
db.Order = require('./Order.js')(sequelize, Sequelize);

//*********      Events
db.Category.hasMany(db.Event,{
  foreignKey:'categoryId',
  sourcekey:'id'
})

db.Event.belongsTo(db.Category,{
  foreignKey:'categoryId',
  sourcekey:'id'
})

db.Venue.hasMany(db.Event,{
  foreignKey:'venueId',
  sourcekey:'id'
})

db.Event.belongsTo(db.Venue,{
  foreignKey:'venueId',
  sourcekey:'id'
})

module.exports = db;