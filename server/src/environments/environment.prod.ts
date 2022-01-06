import * as  dotenv from 'dotenv';
dotenv.config();

export const environment = {
	production: true,
	PORT: process.env.PORT || 8080,
	ANGULAR_DIST_FILES: {
		path: 'films-app',
		rootFile: 'index.html',
	},
	postgres: {
		host: '127.0.0.1',
		port: 5432,
		database: 'films-app-prod',
		user: 'postgres',
		password: 'postgres',
	},
	auth: {
		secret: process.env.JWT_SECRET,
		jwtTokenLifeTime: '100',
	},
};
