# Run #
./bin/boot.sh

# Fixtures #
To install some example projects, run ./bin/fixtures.js in your command line.

# Test client #
__./bin/client.rb _requests_ _delay_
Sends a sample request to the server. Data is randomly pulled from the ComicVine API. Requests argument is how many requests to send and delay argument is how many seconds to delay each request. Both default to 1.