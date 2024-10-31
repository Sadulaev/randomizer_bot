export default () => ({
  port: +process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  tg: {
    token: process.env.TG_TOKEN,
    adminId: +process.env.TG_SUPERADMIN_ID,
  },
});
