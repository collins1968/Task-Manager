import express from 'express';
import config from './db/config.js';
import TaskRoute from './Routes/taskRoutes.js';
import cors from 'cors';
import UserRoutes from './Routes/userRoutes.js';

const app = express();
app.use(express.static("public"));
app.use(express.json());

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//my routes
TaskRoute(app);
UserRoutes(app);


app.get('/', (req, res) => {
    res.send('Hello World!');
    }       
);

// process.on('SIGINT', async () => {
//     try {
//       await closeDb();
//       process.exit(0);
//     } catch (error) {
//       console.error('Failed to close the database connection.');
//       process.exit(1);
//     }
//   });

app.listen(config.port || 8080, () => {
    console.log("Server is running");
    }   
);