if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('Server running on port ', app.get('port'));
    console.log('Mode: ', process.env.NODE_ENV)
});