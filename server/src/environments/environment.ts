import * as  dotenv from 'dotenv';
dotenv.config();

export const environment = {
	production: false,
	PORT: process.env.PORT || 3005,
	ANGULAR_DIST_FILES: {
		path: 'dist/films-app',
		rootFile: 'index.html',
	},
	postgres: {
		host: '127.0.0.1',
		port: 5432,
		database: 'films-app-dev',
		user: 'postgres',
		password: 'postgres',
	},
	auth: {
		secret: process.env.JWT_SECRET,
		jwtTokenLifeTime: '100',
	},
};
