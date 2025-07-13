const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN || 'mongodb://localhost:27017/Users';

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));
