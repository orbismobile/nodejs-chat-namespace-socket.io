/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/6/17.
 */
module.exports = {
    port: process.env.PORT || 8123,
    db: {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        database: 'CHAT_DEMO',
        user: 'users_service',
        password: '123',
        port: 3306
    }
};