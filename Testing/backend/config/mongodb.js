import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.removeAllListeners();

        mongoose.connection.on('connected', () => console.log("Database Connected Successfully"));
        mongoose.connection.on('error', (err) => console.error("MongoDB connection error:", err));
        mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));

        const isLocalConnection = process.env.MONGODB_URI.includes('127.0.0.1') || 
                                process.env.MONGODB_URI.includes('localhost');

        console.log(`Attempting to connect to MongoDB ${isLocalConnection ? 'Local' : 'Atlas'}...`);

        const options = isLocalConnection ? {
            serverSelectionTimeoutMS: 5000,
            family: 4
        } : {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            ssl: true,
            authSource: 'admin',
            retryWrites: true
        };

        await mongoose.connect(process.env.MONGODB_URI, options);
        
    } catch (error) {
        console.error('\nFailed to connect to MongoDB:');
        console.error('Error type:', error.name);
        console.error('Error message:', error.message);
        
        const isLocalConnection = process.env.MONGODB_URI.includes('127.0.0.1') || 
                                process.env.MONGODB_URI.includes('localhost');
        
        if (error.code === 'ECONNREFUSED') {
            if (isLocalConnection) {
                console.error('\nLocal MongoDB connection refused. Please check:');
                console.error('1. Is MongoDB installed?');
                console.error('2. Is MongoDB service running?');
                console.error('3. Run these commands as administrator:');
                console.error('   - net stop MongoDB');
                console.error('   - net start MongoDB');
            } else {
                console.error('\nAtlas connection refused. Please check:');
                console.error('1. Your internet connection');
                console.error('2. Firewall/antivirus settings');
                console.error('3. VPN settings (if using)');
            }
        }
        
        process.exit(1);
    }
}

export default connectDB;