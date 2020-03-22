const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log('Conectado a la base de datos'))
    .catch(err => console.log(err));
    