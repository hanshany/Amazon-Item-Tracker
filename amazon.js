var exec = require('child_process').exec,
    fs = require('fs'),
    items = require('./items.json'),
    ctr = 0;
fetch = require("node-fetch");

function getItem() {
    fetch(items[ctr].url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.text().then(function (data) {
                    var availAmazon = data.search(/Ships from and sold by/) !== -1;
                    var availWalmart = data.search(/Add to Cart/) !== -1 || data.search(/Add to cart/) !== -1;
                    var avail = availAmazon || availWalmart;
                    // notification
                    if (avail && items[ctr].name !== 'test') {
                        exec('osascript notification.scpt "' + items[ctr].name + ' in stock"');
                        exec('osascript imessage.scpt "Click on ' + items[ctr].url + '"');
                        exec('osascript say.scpt');
                        fs.appendFileSync('results.txt', getCurrentDateAndTime() + ' ' + items[ctr].name + '\n');
                        console.log('!!!HEY ' + items[ctr].name + ' in stocks');
                    }

                    items[ctr].instock = avail;
                    console.log('[%s] %s %s', new Date().toISOString(), items[ctr].name, avail ? 'in stock' : 'unavailable');
                    ctr++;
                    if (ctr < items.length) {
                        getItem();
                    } else {
                        fs.writeFileSync('items.json', JSON.stringify(items, null, '  '));
                    }
                });
            }
        );
}

function getCurrentDateAndTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

getItem();

setInterval(function () {
    ctr = 0;
    getItem();
}, 120000);
