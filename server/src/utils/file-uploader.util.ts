import { existsSync, mkdirSync } from 'fs';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import { uuid } from '../../../shared/utils/uuid.util';
import { getEnvironment } from '../environments/env.util';
import { FileNameHandler } from './file-name.util';


const dest = getEnvironment().storageBucket;
const storageConfig = diskStorage(
	{
		destination: ( ( req: Request, file: Express.Multer.File, cb: ( error: Error | null, destination: string ) => void ) => {
			if ( !existsSync( dest ) ) {
				mkdirSync( dest );
			}
			cb( null, dest );
		} ) as any,
		filename: ( ( req: Request, file: Express.Multer.File, cb: ( error: Error | null, filename: string ) => void ) => {
			const name = FileNameHandler.combineFileName( uuid(), file.originalname );
			cb( null, name );
		} ) as any,
	} );

export const FileUploaderFieldName = 'file';

export const fileUploader = multer( { storage: storageConfig } );
