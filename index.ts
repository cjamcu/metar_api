const server = Bun.serve({
    port: 3000,
    development: false,
    async fetch(request) {
        const icao = request.url.split('/')[3];
        if (icao.length > 4) {
            return new Response('ICAO code must be 4 characters', {
                status: 400,
            });
        }


        if (icao === '') {
            return new Response('Please provide an ICAO code', {
                status: 400,
            });
        }


        const response = await fetch(`https://beta.aviationweather.gov/cgi-bin/data/metar.php?ids=${icao}`);
        return new Response(response.body, response);
    },
});

console.log(`Listening on localhost:${server.port}`);