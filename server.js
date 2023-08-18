const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http');
const fs = require('fs');
var cors = require('cors');
const { Server } = require('socket.io');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync(process.cwd() + '/swagger.css', 'utf8');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// const server = http.createServer(app);

// const io = new Server(app, {
// 	cors: {
// 		origin: 'http://localhost:3000/dashboard/messages',
// 		methods: ['GET', 'POST'],
// 	},
// });

// io.on('connection', (socket) => {
// 	console.log(socket.id);
// 	app
// 	socket.on('disconnect', () => {
// 		console.log('User Disconnected', socket.id);
// 	});
// });

app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, { customCss })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// users
const userRouter = require('./routes/users.routes');
const postRouter = require('./routes/post.routes');

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(port, () => {
	console.log(`Server listening on the port  ${port}`);
});
