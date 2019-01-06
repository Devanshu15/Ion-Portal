const express = require('express');
const app = express();
const path = require('path');
const usersMap = {
    'user1': {password: 'pass1', firstName: 'User 1', lastName: 'Last name'},
    'user2': {password: 'pass2', firstName: 'User 2', lastName: 'Last name'},
};
const bodyParser = require('body-parser');

function loginUser(username, password) {
    if (usersMap[username]) {
        if(usersMap[username].password === password) {
          const {firstName, lastName} =  usersMap[username];
          return {userInfo: {firstName, lastName}, success: true, errorMessage: null};
        }
        return {userInfo: null, success: false, errorMessage: `Password for ${username} did not match`};
    }
    return {userInfo: null, success: false, errorMessage: `${username} does not exist`};
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/my-app/index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/my-app/index.html'));
});
app.get('/dashboard', (req, res) => {
res.sendFile(path.join(__dirname + '/dist/my-app/index.html'));
});

app.post('/login', (req, res) => {
  const interval = Math.random() * 3000;
  setTimeout(() => {
    res.send(loginUser(req.body.username, req.body.password));
  }, interval);

});

app.get('/logout', (req, res) => {
  const interval = Math.random() * 3000;
  setTimeout(() => {
    res.send({success: true});
  }, interval);
  
});

app.use('', express.static(path.join(__dirname, '/dist/my-app')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))