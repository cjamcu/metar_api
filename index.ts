Bun.serve({
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


        const response = await fetch(`https://tgftp.nws.noaa.gov/data/observations/metar/stations/${icao}.TXT`);
        
        //  Get only the METAR data from the response 

        if(response.body === null){
            return new Response('ICAO code not found', {
                status: 404,
            });
        }

        const metar = (await response.text()).split('\n')[1];


        return new Response(metar, response);
    },
});

