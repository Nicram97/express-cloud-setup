<h1>Express-cloud-setup</h1>
This app is Express.js based exercise of simple cloud based app connected to different services like, influxdb, postgres, SQLite, logstash, Prometheus.

<b>default app port: 3000</b>

<h2>TL;DR </h2>
To run the app execute : "npm run start"
To enable connection to additional services like influx,logstash etc. Uncomment their section in config.yaml and run those services.

You can only run 1 database at a time (SQLite or Postgres)
<h3>How-To</h3>
<p>Start the app</p>
Execute "npm run start"


<p>To debug the app</p>
Execute "npm run start:debug" or use launch.json


<p>To run end-to-end tests</p>
Execute "npm run test:e2e


<p>To run unit tests</p>
Execute "npm run test

<p>To generate git.properties</p>
Execute "npm run saverepoinfo"

<p>To generate contract tests</p>
Execute "npm run test:contract"

<p>To verify contract tests</p>
Execute "npm run test:contract-verifier"


<p></p>
<h4><b>Deploy app to kubernetes</b></h4>
<p>
To create deployment and service You can use express-deployment/service.yaml with command "kubectl apply (-f FILENAME | -k DIRECTORY)"
If You want deployment/service to work remember to use proper name whe creating and pushing app docker build and to properly set Prometheus port
to properly scrap metrics (default prometheus port is 8080 when deployed through helm-chart).
</p>
