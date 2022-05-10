export const config = {
  env: process.env.NODE_ENV || 'local',
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 80,
  sendgridApiHost: process.env.SENDGRID_API_HOST || '',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  customerJwtKey: process.env.CUSTOMER_JWT_KEY || '',
  userJwtKey: process.env.USER_JWT_KEY || '',
  customerPasswordEncryptionKey:
    process.env.CUSTOMER_PASSWORD_ENCRYPTION_KEY || '',
  userPasswordEncryptionKey: process.env.USER_PASSWORD_ENCRYPTION_KEY || '',
  dbMongoString: process.env.DB_MONGO_STRING || '',
  awsCdnHost: process.env.AWS_CDN_HOST || '',
  awsCdnS3Region: process.env.AWS_CDN_S3_REGION || 'eu-central-1',
  awsCdnS3BucketName: process.env.AWS_CDN_S3_BUCKET_NAME || '',
  awsCostExplorerRegion: process.env.AWS_COST_EXPLORER_REGION || 'eu-central-1',
  awsCostExplorerBillingAccessKeyId:
    process.env.AWS_BILLING_ACCESS_KEY_ID || '',
  awsCostExplorerBillingSecretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY || '',
  emailInfo: process.env.EMAIL_INFO || '',
};
