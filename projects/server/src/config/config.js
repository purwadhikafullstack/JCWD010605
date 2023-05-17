module.exports = {
  development: {
    username: process.env.user,
    password: process.env.pass,
    database: process.env.db,
    host: process.env.host,
    dialect: process.env.dialect,
  },
  // test: {
  //   username: root,
  //   password: null,
  //   database: database_test,
  //   host: 127.0.0.1,
  //   dialect: mysql
  // },
  production: {
    username: process.env.user,
    password: process.env.pass,
    database: process.env.db,
    host: process.env.host,
    dialect: process.env.dialect,
  },
};
