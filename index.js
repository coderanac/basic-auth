const http = require('http');

const server = http.createServer((req, res) => {

    const auth = req.headers['authorization'];
    console.log("Authorization Header is: ", auth);

    if (!auth) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

        res.end('Need some creds son');
    }

    else if (auth) {
        const tmp = auth.split(' ');

        const buf = new Buffer(tmp[1], 'base64');

        const plain_auth = buf.toString();

        console.log("Decoded Authorization ", plain_auth);

        const creds = plain_auth.split(':');
        const username = creds[0];
        const password = creds[1];

        if ((username == 'carol') && (password == 'senha@1')) {
            res.statusCode = 200;
            res.end('Hello, Node.js!');
        }
        else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

            res.end('You shall not pass');
        }
    }
});


server.listen(5000, () => {
    console.log("Server Listening on http://localhost:5000/");
});
