import sql from 'mssql';
import config from '../db/config.js'

let pool;

export const connectDB = async () => {
    try {
        if (pool) return pool;
        pool = await sql.connect(config.sql);
        return pool;
    } catch (error) {
        throw new Error('failed to connect')
        
    }
};

export const closeDb = async () => {
    try {
        if (pool) {
            await pool.close();
            pool = undefined;
        }
    }
    catch (error){
        throw new Error('failed to close the database connection')
    }
};

