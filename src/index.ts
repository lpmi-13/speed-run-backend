import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { seed } from 'drizzle-seed';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

import { usersTable } from './db/schema';

dotenv.config();

const app = express();
app.use(express.json());

const connectionString =
    process.env.DATABASE_URL ||
    'postgres://postgres:mypassword@localhost:5432/drizzle';
const pool = new Pool({ connectionString });

const db = drizzle(pool);

app.get('/health', (req: any, res: any) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/users', async (req: any, res: any) => {
    try {
        const allUsers = await db.select().from(usersTable);
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

async function startServer() {
    try {
        console.log('Connecting to PostgreSQL database...');

        console.log('Running migrations if needed...');
        await migrate(db, {
            migrationsFolder: path.join(__dirname, '../drizzle'),
        });
        console.log('Migrations completed successfully');

        // drop all the data if it exists just to avoid conflicts when processes restart
        await db.delete(usersTable);

        await seed(db, { usersTable });

        console.log('Database seeded with 10 users');

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
