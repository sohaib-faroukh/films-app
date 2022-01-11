import { DatabaseConfigs } from './env.reader';

export const environment = {
	production: true,
	PORT: process.env.PORT || 8080,
	storageBucket: 'uploaded-files',
	ANGULAR_DIST_FILES: {
		path: 'films-app',
		rootFile: 'index.html',
	},
	postgres: { ...DatabaseConfigs },
	SeedDb: process.env.SEED_DB === 'true',
	auth: {
		secret: process.env.JWT_SECRET,
		jwtTokenLifeTime: '100',
	},
};
