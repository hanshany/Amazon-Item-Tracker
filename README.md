Reference: https://github.com/areichman/amazon-tracker
I update and change something to fit my need.

# Amazon Tracker
Monitor the in-stock status of a product from Amazon.com and send yourself an iMessage and notification
when it becomes available.

## Setup
Assuming Node.js is already installed, just run `npm install` to download the project dependencies.

Next, add the list of products you want to track to `items.json`.  It should look something like this:

```
[
  {"name": "Xbox One", "url": "http://www.amazon.com/Xbox-One-Standard-Edition/dp/B00CMQTVUA"},
  {"name": "Kindle Paperwhite": "url": "http://www.amazon.com/dp/B00AWH595M"}
]
```

Next, modify the `imessage.scpt` file to include your iCloud credentials. Both the phone number
and email portion can be for the same account or separate accounts if you happend to have
more than one.

Last, to start the app, just run `node amazon.js`. This will run the app in the foreground,
checking Amazon every two minutes. If you prefer to run this as a cron task or something,
just comment out the setInterval block at the end of the script.