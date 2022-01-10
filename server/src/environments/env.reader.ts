import * as dotenv from 'dotenv';
dotenv.config();

export const getDatabaseConfigs = (): any => {
	const configs: any = {};
	const { PROD_PG_HOST, PROD_PG_PORT, PROD_PG_DATABASE, PROD_PG_USERNAME, PROD_PG_PASSWORD, PROD_PG_STING } = process.env;
	if ( !PROD_PG_STING ) {
		if ( !PROD_PG_HOST ) throw new Error( 'no db host' );
		if ( !PROD_PG_PORT ) throw new Error( 'no db port' );
		if ( !PROD_PG_DATABASE ) throw new Error( 'no db name' );
		if ( !PROD_PG_USERNAME ) throw new Error( 'no db username' );
		if ( !PROD_PG_PASSWORD ) throw new Error( 'no db password' );

		configs.host = PROD_PG_HOST;
		if ( !isNaN( Number( PROD_PG_PORT ) ) ) configs.port = Number( PROD_PG_PORT );
		configs.database = PROD_PG_DATABASE;
		configs.user = PROD_PG_USERNAME;
		configs.password = PROD_PG_PASSWORD;
	}
	else {
		configs.connectionString = PROD_PG_STING;
	}
	return configs;
};


export const DatabaseConfigs = ( () => {
	const configs = getDatabaseConfigs();
	console.log( '***** reading DatabaseConfigs: ', configs );
	return configs;
} )();
