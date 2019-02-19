const express    = require('express'),
      bodyParser = require('body-parser'),
      bcrypt     = require('bcrypt-nodejs'),
      cors       = require('cors'),
      app        = express();

app.use(bodyParser.json());
app.use(cors());
    
const data = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(data.users);
});

app.post('/signin', (req, res) => {
    // bcrypt.compare("apples", '$2a$10$fd0uuFWpuidnAzfn7D48PeA6Xccs4nOZXzyP7BL.JfB30AqFaN3jK', function(err, res) {
    //     console.log(res);
    // });
    // bcrypt.compare("apples", '$2a$10$fd0uuFWpuidnAzfn7D48PeA6Xccs4nOZXzyP7BL.JfB30AqFaN3jK', function(err, res) {
    //     console.log(res);
    // });
    if (req.body.email === data.users[0].email && req.body.password === data.users[0].password) {
        res.json(data.users[0]);
    }
    else {
        res.status(400).json("Error logging in")
    }
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    data.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.json(data.users[data.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    data.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if(!found) {
        res.status(400).json("Not found");
    }
});

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    data.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if(!found) {
        res.status(400).json("Not found");
    }
});

app.listen(4000, () => {
    console.log("Listening on PORT 4000")
});