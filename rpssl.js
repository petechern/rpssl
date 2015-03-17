var http = require('http'),
    url = require('url');

var wins = 0;
var losses = 0;
var ties = 0;

// Rock Paper Scissors Spock Lizard
function rpssl(req, res) {
    var path = url.parse(req.url).pathname;
    
    // Method must be POST to play
    if (req.method === 'POST') {
        // Valid routes
        if (path === '/play/rock' || path === '/play/paper' || path === '/play/scissors' || path === '/play/spock' || path === '/play/lizard') {
            // Possible moves enumerated
            const rock = 0, paper = 1, scissors = 2, spock = 3, lizard = 4;
            
            // Random number between 0-4 representing the server's move
            var hand = Math.floor(Math.random() * 5);
 
            // Determining outcome of game
            switch (path) {
                case '/play/rock':
                    if (hand === lizard || hand === scissors) {
                        wins++;
                        outcome = "win";
                    }
                    else if (hand === rock) {
                        ties++;
                        outcome = "tie";
                    }
                    else {
                        losses++;
                        outcome = "lose";
                    }
                    break;

                case '/play/paper':
                    if (hand === rock || hand === spock) {
                        wins++;
                        outcome = "win";
                    }
                    else if (hand === paper) {
                        ties++;
                        outcome = "tie";
                    }
                    else {
                        losses++;
                        outcome = "lose";
                    }
                    break;

                case '/play/scissors':
                    if (hand === paper || hand === lizard) {
                        wins++;
                        outcome = "win";
                    }
                    else if (hand === scissors) {
                        ties++;
                        outcome = "tie";
                    }
                    else {
                        losses++;
                        outcome = "lose";
                    }
                    break;

                case '/play/lizard':
                    if (hand === lizard || hand === scissors) {
                        wins++;
                        outcome = "win";
                    }
                    else if (hand === lizard) {
                        ties++;
                        outcome = "tie";
                    }
                    else {
                        losses++;
                        outcome = "lose";
                    }
                    break;

                case '/play/spock':
                    if (hand === rock || hand === scissors) {
                        wins++;
                        outcome = "win";
                    }
                    else if (hand === spock) {
                        ties++;
                        outcome = "tie";
                    }
                    else {
                        losses++;
                        outcome = "lose";
                    }
                    break;
            }
            
            
            // json response
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.write('{\n');
            res.write('\t"outcome": "' + outcome + '",\n');
            res.write('\t"wins": ' + wins + ',\n');
            res.write('\t"losses": ' + losses + ',\n');
            res.write('\t"ties": ' + ties + '\n');
            res.write('}\n');
            res.end();
        }
    }
}

var server = http.createServer(rpssl);
server.listen();
var address = server.address();
console.log("RPSSL is listening at http://localhost:" + address.port + "/");