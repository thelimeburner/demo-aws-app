const express = require('express')
const fetch = require('node-fetch');
const app = express()
const port = 8080
var ip = require("ip");

const color = "#"+((1<<24)*Math.random()|0).toString(16);

app.get('/', (req, res) => {
    const ipaddr = ip.address();
    let html = "<html><body bgcolor=\""+color+"\"><h1 align=\"center\">Hello from "+ipaddr+"</h1>
    <p>This is a sample demo app that demonstrates how a load balancer works.</p></body></html>";
    res.send(html);
});

app.get('/hb', (req, res) => res.status(200).send('Hello World!'));


app.get('/aws',async (req,res)=>{

    try{
        //get ip address
        const ipaddr = ip.address();

        //fetch Hostname
        const hostRes = await fetch('http://169.254.169.254/latest/meta-data/local-hostname');
        const hostname = await hostRes.text();

        //fetch instance
        const instanceRes = await fetch('http://169.254.169.254/latest/meta-data/instance-type');
        const instanceType = await instanceRes.text();

        let html = `<html>
                    <body bgcolor="${color}">
                    <h1 align="center">Hello from ${ipaddr}</h1>
                    <h2 align="center">My Hostname is: ${hostname}</h2>
                    <h2 align="center">My Instance type is: ${instanceType}</h2>
                    </body>
                    </html>`;
        console.log("Received request, serving.");
        res.status(200).send(html);
    }catch(e){
        res.status(500).send(e);
    }
    

});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
