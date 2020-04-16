var exec = require('child_process').exec,
    fs = require('fs'),
    items = require('./items.json'),
    fetch = require("node-fetch"),
    ctr = 0;

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
                    var avail = data.search(/Ships from and sold by/) !== -1;
                    // notification
                    if (avail && items[ctr].name !== 'test') {
                        exec('osascript notification.scpt "' + items[ctr].name + ' in stock"');
                        exec('osascript imessage.scpt "Click on ' + items[ctr].url + '"');
                        exec('osascript say.scpt');
                        console.log('!!!HEY ' + items[ctr].name + ' in stock');
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

getItem();

setInterval(function () {
    ctr = 0;
    getItem();
}, 120000);
