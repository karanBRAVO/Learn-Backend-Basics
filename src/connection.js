const mongoose = require("mongoose");
const url = `mongodb://0.0.0.0:27017/myApp`;  // replace myApp with your project name

mongoose.connect(url).then(() => {
	console.log(`[+] Connection successful`);
}).catch((err) => {
	console.log(`[-] cannot connect to database`);
	console.log(err);
})
