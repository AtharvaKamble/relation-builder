# relation-builder

This project uses an `Express.js` and `PostgreSQL` backend to store people data and the relations between them. For the frontend, `React.js` is used along with some components from the `material.UI` library.

The database contains two tables namely `peoples` to store raw people data with a unique ID and `relations` to store relations between people.
After extracting data from relations table, the server uses graph theory to find all possible paths between people and degrees of connection.


* This is currently hosted at https://relationbuilder.herokuapp.com/

* PS: Since, heroku got rid of their free tier, this link would not work at the moment until I host it elsewhere.

<!--
## Question: If this app were to receive 1M requests per day, how would you structure it?

#### IC2 instance
For a given amount of request calls per day (1,000,000), as this app requires to interact with the database a lot, it is recommended that we use AWS EC2's I2 Extra Large instance.
Since there are also a lot calculations that go on the CPU (mapping graph and finding relations between people), getting a Linux server for this is highly crucial as this instance
also provides 4CPU cores and 30GB memory. This instance with a reserved Linix server costs around $13 per day. ($13 * 30 = $390 / month)(Rs. 969 * 30 = Rs. 29,000)

#### C instance
Using the C instance (for applications which are CPU intensive) is also an option, since a lot of calculations will be happening in the background. This instance provides 8CPU cores 
32GB memory.This instance with a reserved Linux server costs around ($3.36 * 30 = $100 / month)(Rs. 250.6 * 30 = Rs. 7457)

Reference: [EC2](http://ec2instances.info/)
-->
