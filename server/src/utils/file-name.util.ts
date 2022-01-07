export class FileNameHandler {
	static DELIMITER = '--';

	static combineFileName = ( id: string, ...segments: string[] ): string => {
		const delimiter = FileNameHandler.DELIMITER;
		let result = id?.trim();

		if ( segments?.length > 0 ) {
			const rest = segments?.join( delimiter ) || '';
			if ( rest?.length > 0 ) result += `${ delimiter }${ rest }`;
		}
		return result;
	}

	static getFileIdFromName = ( name: string ): string => {
		const delimiter = FileNameHandler.DELIMITER;
		if ( !name ) return '';
		return name?.split( delimiter )[ 0 ] || '';
	}

}
