const env = process.env.NODE_ENV;

const dev = {
    port: process.env.PORT || 3000,
    db: process.env.DB_CONNECTION,
    secret: process.env.SECRET || "supersecret"
};

const test = {
    port: process.env.PORT || 3000,
    db: process.env.TEST_DB_CONNECTION,
    secret: process.env.TEST_SECRET || "supersecret"
};

const config = {
    dev, test
};

module.exports = config[env];