var _ = require('lodash');

var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  // 10 days in minutes
  expireTime: process.env.EXPIRE_TIME,
  secrets: {
    jwt: process.env.JWT_SECRET,
    sessions: process.env.SESSION_SECRET
  },
  db: {
    url: process.env.MONGODB_URI
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET
  },
  passport: {

  }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

// merge the two config files together
module.exports = _.merge(config, envConfig);
