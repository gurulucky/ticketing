const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');
require('dotenv').config();
const db = process.env.MONGO_URL || 'mongodb://localhost:27017/ticketing';

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...',db);
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
