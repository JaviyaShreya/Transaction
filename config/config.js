const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port : process.env.PORT || 3000,
    mongodb : process.env.MONGODB_URL || 'mongodb://localhost:27017/myapp'
}