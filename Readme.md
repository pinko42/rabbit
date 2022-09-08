in terminal run "node index.js"

## Background

Shetyle is a freight forwarder company. That means we help other companies to get their products from one place to another. We must deliver the goods as fast as possible. To achieve that, we need to replace some human labor with automation. We have part of the process being done via Excel and that is not good to scale.

Have we told you we want to be the biggest freight forwarder company in the world?

The good news is the team Techozon (yeah, they choose this name) already created a service that aggregates lots of information and returns a JSON file for us. This Techozon service returns all shipping options available in the database. We have given you a sample JSON response from Techozon service.

Your job is to create a small service that does some calculations using the JSON file. 

Exchange rates in the JSON file are based on EUR (For example 2022-01-29 usd rate 1.1138 is USD/EUR rate). We decide which exchange_rate will be used to calculate EUR sailing rate based on the *departure_date* of the sailing. Use sailing_code from sailing & rate to get the rate amount & currency. 

Your Product Owner created 3 tickets for you: 3rd task(TST-0003) is a nice to have feature. So it is a bonus task & you can finish it if you have time.

#### (1) PLS-0001 - *Acceptance criteria*: Return the cheapest direct sailing between origin port & destination port in following format. For example using CNSHA as origin port & NLRTM as destination port input parameters


```json
[ 
  {
    "origin_port": "CNSHA",
    "destination_port": "NLRTM",
    "departure_date": "2022-02-01",
    "arrival_date": "2022-03-01",
    "sailing_code": "ABCD",
    "rate": "589.30",
    "rate_currency": "USD"
  }
]
```

#### (2) WRT-0002 - *Acceptance criteria*: Return the cheapest sailing (direct or indirect). If the cheapest one contains more than one sailing (two sailings) in the following format, you should return all sailing legs (You need to compare the sum of all sailing legs to find the cheapest sailing option). Use same CNSHA as origin port & NLRTM as destination port input parameters

```json
[ 
  {
    "origin_port": "CNSHA",
    "destination_port": "ESBCN",
    "departure_date": "2022-01-29",
    "arrival_date": "2022-02-06",
    "sailing_code": "ERXQ",
    "rate": "261.96",
    "rate_currency": "EUR"
  },
  {
    "origin_port": "ESBCN",
    "destination_port": "NLRTM",
    "departure_date": "2022-02-16",
    "arrival_date": "2022-02-20",
    "sailing_code": "ETRG",
    "rate": "69.96",
    "rate_currency": "USD"
  }
]
```

#### (3) (Bonus task) TST-0003 - *Acceptance criteria*: Return the fastest sailing legs (direct or indirect) in the same above format

As those are small changes, we can create one branch for all the changes.

You should provide a solution that make possible to scale because new requirements will come soon. 

4. SLD-0004 - coming soon
5. DRY-0005 - coming soon
6. TDD-0006 - coming soon

We will evaluate the solution with some criteria:

1. Object Oriented Concepts
2. SOLID 
3. DRY 
4. Test Coverage

#### Lingo

CNSHA - Shanghai

NLRTM - Rotterdam

ESBCN - Barcelona

BRSSZ - Santos
