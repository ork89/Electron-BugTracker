const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb+srv://OriKo:EnyZdJNhq6TWI36d@cluster0.vepdz.mongodb.net/BugTracker?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			}
		);

		console.log('Connected to MongoDB');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
