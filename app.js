let request = require("request");

let options = {
    method: 'POST',
    url: 'http://localhost:5279',
    headers:
        {
            'Content-Type': 'application/json'
        },
    body: {method: 'claim_list_mine'},
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    /*body.result.forEach(r => {
        console.log("abandonining: " + r.claim_id);
        abandon(r.claim_id);
    })*/
    for (let i = 0; i < body.result.length; i++) {
        abandon(body.result[i].claim_id).then(console.log).catch(console.error)
    }
});


function abandon(claimid) {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            url: 'http://localhost:5279',
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: {method: 'claim_abandon', params: {claim_id: claimid}},
            json: true
        };

        request(options, function (error, response, body) {
            if (error) return reject(error);

            console.log(body);
            return resolve(body)
        });
    })
}