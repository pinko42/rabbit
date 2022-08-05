const readline = require("readline");
const res = require("./response.json");

const prompt = require("prompt");

var schema = {
  properties: {
    originPort: {
      description: "Enter your origin Port",
      required: true,
    },
    destinationPort: {
      description: "Enter your destination Port",
      required: true,
    },
  },
};

prompt.start();


//PLS-0001
/*prompt.get(schema, function (err, result) {
  if (err) {
    return onErr(err);
  }

  let cheapest = res.sailings.map((elem) => {
    if(elem.origin_port === result.originPort && elem.destination_port === result.destinationPort){

      let temp = {...elem, ...res.rates.find(el => el.sailing_code === elem.sailing_code)};
      if(temp.rate_currency === "USD"){
        temp.rate = temp.rate/res.exchange_rates[elem.departure_date].usd;
        temp.rate_currency = "EUR";
      }
      if(temp.rate_currency === "JPY"){
        temp.rate = temp.rate/res.exchange_rates[elem.departure_date].jpy;
        temp.rate_currency = "EUR";
      }
      return temp;
    }
  }).filter(elem => elem != undefined).find((elem,index,arr) => elem.rate == Math.min(...arr.map(elem =>  elem.rate)));

  console.log(`Cheapest direct sailing between:${result.originPort} and ${result.destinationPort} is:`,cheapest);
  process.exit(0);
});
*/
//WRT-0002
prompt.get(schema, function (err, result) {
  if (err) {
    return onErr(err);
  }
  let directSail;  
  let directSailArr = [];
  let destination;
  let destinationArr = [];
  let originSail;
  let originSailArr = [];

  let cheapest;
   res.sailings.map((elem) => {
    if(elem.origin_port === result.originPort && elem.destination_port === result.destinationPort){ 

      directSail = {...elem, ...res.rates.find(el => el.sailing_code === elem.sailing_code)};
      if(directSail.rate_currency === "USD"){
        directSail.rate = directSail.rate/res.exchange_rates[elem.departure_date].usd;
        directSail.rate_currency = "EUR";
      }
      if(directSail.rate_currency === "JPY"){
        directSail.rate = directSail.rate/res.exchange_rates[elem.departure_date].jpy;
        directSail.rate_currency = "EUR";
      }
      directSailArr.push(directSail);
    }
    if(elem.origin_port !== result.originPort && elem.destination_port === result.destinationPort){
      destination = {...elem, ...res.rates.find(el => el.sailing_code === elem.sailing_code)};
      if(destination.rate_currency === "USD"){
        destination.rate = destination.rate/res.exchange_rates[elem.departure_date].usd;
        destination.rate_currency = "EUR";
      }
      if(destination.rate_currency === "JPY"){
        destination.rate = destination.rate/res.exchange_rates[elem.departure_date].jpy;
        destination.rate_currency = "EUR";
      }
      destinationArr.push(destination);
    }

    if(elem.origin_port === result.originPort && elem.destination_port !== result.destinationPort){
      originSail = {...elem, ...res.rates.find(el => el.sailing_code === elem.sailing_code)};
      if(originSail.rate_currency === "USD"){
        originSail.rate = originSail.rate/res.exchange_rates[elem.departure_date].usd;
        originSail.rate_currency = "EUR";
      }
      if(originSail.rate_currency === "JPY"){
        originSail.rate = originSail.rate/res.exchange_rates[elem.departure_date].jpy;
        originSail.rate_currency = "EUR";
      }
      originSailArr.push(originSail);
    }
    
  }).filter(elem => elem != undefined);
  
  let indirectSail = destinationArr.map((destElem) => {
    return originSailArr.map((orgElem) => {
      if(destElem.origin_port === orgElem.destination_port){

        return {orgElem,destElem};
      }
    }).filter(elem => elem != undefined);

  }).filter(elem => elem != undefined).find((elem,index,arr) => parseFloat(elem[0].orgElem.rate)+parseFloat(elem[0].destElem.rate) == Math.min(...arr.map(el =>  parseFloat(el[0].orgElem.rate)+parseFloat(el[0].destElem.rate))));
  directSailArr.find((elem,index,arr) => elem.rate == Math.min(...arr.map(elem =>  elem.rate)));

  if(parseFloat(indirectSail[0].orgElem.rate)+parseFloat(indirectSail[0].destElem.rate) > directSailArr.find((elem,index,arr) => elem.rate == Math.min(...arr.map(elem =>  elem.rate)))){
    cheapest = directSailArr.find((elem,index,arr) => elem.rate == Math.min(...arr.map(elem =>  elem.rate)));
  } else {
    cheapest = [originSailArr.find(elem => elem.sailing_code === indirectSail[0].orgElem.sailing_code ),destinationArr.find(elem => elem.sailing_code === indirectSail[0].destElem.sailing_code )]
  }


  console.log(`Cheapest sailing between:${result.originPort} and ${result.destinationPort} is:`,cheapest);

  process.exit(0);
});








function onErr(err) {
  console.log(err);
  process.exit(1);
}