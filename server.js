const app = require('./app');

app.listen(3000, () => {
    console.log('Your on Port 3000!');
})

module.exports = app;