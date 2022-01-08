import * as  dotenv from 'dotenv';
dotenv.config();

export const environment = {
	production: true,
	PORT: process.env.PORT || 8080,
	storageBucket: 'uploaded-files',
	ANGULAR_DIST_FILES: {
		path: 'films-app',
		rootFile: 'index.html',
	},
	postgres: {
		host: 'postgres-db',
		port: 5432,
		database: 'films-app-prod',
		user: 'postgres',
		password: 'postgres',
	},
	SeedDb: process.env.SEED_DB === 'true',
	auth: {
		secret: process.env.JWT_SECRET,
		jwtTokenLifeTime: '100',
	},
};
