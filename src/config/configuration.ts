export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    DATABASE: {
        HOST: process.env.DB_HOST,
        PORT: parseInt(process.env.DB_PORT, 10) || 3306,
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASS
    }
});