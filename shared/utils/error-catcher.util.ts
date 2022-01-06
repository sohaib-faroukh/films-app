
export const errorCatcher = <T> ( err: any, caught: unknown ) => {
	console.log( 'HTTP ERROR: ' + JSON.stringify( err ) );
	throw err;
};

export const tryCatch = async ( fn: () => any ) => {
	try {
		await fn();
	}
	catch ( error ) {
		console.error( error );
	}
};
