import { Sequelize } from 'sequelize-typescript';

const sequalize = new Sequelize('charger', 'root', 'Qwerty1@', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: true
});
sequalize.authenticate().then(() => {
    console.log('Connection has been established successfully');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
})

export default sequalize;

sequalize.sync().then(() =>{
    console.log('Charging station table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
})