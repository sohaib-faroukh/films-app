
const apiHost = '';
export const environment = {
	production: true,
	FileUploaderFieldName: 'file',
	ACCOUNT_STORAGE_KEY: 'films_acc_token',
	apiHost,
	apiBaseUrl: `${ apiHost }/v1/api`,
	storagePrefix: 'films_app_prod',
	ADMIN_EMAIL: 'admin@email.com',
};
