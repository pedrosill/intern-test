import dotenv from 'dotenv';

dotenv.config();

export default{
    PORT: process.env.PORT || 6000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/intern',
    JWT_SECRET: process.env.JWT_SECRET || 'Pai.natal123',
    accessKeyId: process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};