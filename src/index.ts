import * as express from "express"
import * as users from "./users.json"

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(el => el.userId === parseInt(req.params.id))
    res.send(user);
});

app.post('/users', (req, res) => {
    res.send('Hello World');
});

app.listen(3000);
console.log('Listening on port 3000')