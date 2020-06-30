// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

//Environment variables
const { BASE_TABLE_NAME } = process.env;

//es 
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'https://search-gn-elasticsearch-2bdratt7rmcoh5p2bde6blldci.ap-southeast-1.es.amazonaws.com' })

//async added to accomadate await cluases.
exports.testLambdaFunction = async (event, context, callback) => {
    
    // Let's start by indexing some data
    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
        }
    })

    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'game-of-thrones' })

    // Let's search!
    const { body } = await client.search({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
            query: {
                match: { quote: 'winter' }
            }
        }
    })

    console.log(body.hits.hits)

    /*
    console.log(event);
    try {
        //Putting a new vehicle record to the Base table.    
        var newVehicleId = 'vehicleId_' + (Math.random());
        const params = {
            Item: {
                "vehicleId": {
                    S: newVehicleId
                },
                "hostId": {
                    S: event.hostId
                },
                "hostName": {
                    S: event.hostName
                },
                "hostPhoneNumber": {
                    S: event.hostPhoneNumber
                },
                "vehicleName": {
                    S: event.vehicleName
                },
                "vehicleType": {
                    S: event.vehicleType
                },
                "vehicleNumOfSeats": {
                    S: event.vehicleNumOfSeats
                },
                "vehicleKmPerL": {
                    N: event.vehicleKmPerL
                },
                "vehicleDayPrice": {
                    N: event.vehicleDayPrice
                },
                "vehiclePickupLocation": {
                    S: event.vehiclePickupLocation
                },
                "vehicleReturnLocation": {
                    S: event.vehicleReturnLocation
                },
                "vehicleAvaliableStartDate": {
                    S: event.vehicleAvaliableStartDate
                },
                "vehicleAvaliableEndDate": {
                    S: event.vehicleAvaliableEndDate
                },
                "vehicleDescription": {
                    S: event.vehicleDescription
                },
                "vehicleRegNumber": {
                    S: event.vehicleRegNumber
                },
                "isVehicleFavourite": {
                    BOOL: event.isVehicleFavourite
                },
                "vehicleTag1": {
                    S: event.vehicleTag1
                },
                "vehicleTag2": {
                    S: event.vehicleTag2
                },
                "vehicleTag3": {
                    S: event.vehicleTag3
                },
                "vehicleProfileImageUrl": {
                    S: event.vehicleProfileImageUrl
                },
                "vehicleImageUrl1": {
                    S: event.vehicleImageUrl1
                },
                "vehicleImageUrl2": {
                    S: event.vehicleImageUrl2
                },
                "vehicleImageUrl3": {
                    S: event.vehicleImageUrl3
                },
                "vehicleAvailability": {
                    BOOL: event.vehicleAvailability
                },
                "vehicleTripId": {
                    S: event.vehicleTripId
                }
            },
            TableName: BASE_TABLE_NAME
        };
        dynamodb.putItem(params, function (err, data) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                console.log(data);
                callback(null, newVehicleId);
            }
        });
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
    */
   /*
   var AWS = require('aws-sdk');

var region = 'ap-southeast-1'; // e.g. us-west-1
var domain = 'search-gn-elasticsearch-2bdratt7rmcoh5p2bde6blldci.ap-southeast-1.es.amazonaws.com'; // e.g. search-domain.region.es.amazonaws.com
var index = 'node-test';
var type = '_doc';
var id = '1';
var document = {
  "title": "Moneyball",
  "director": "Bennett Miller",
  "year": "2011"
}


exports.testLambdaFunction =  (document) => {
  var endpoint = new AWS.Endpoint(domain);
  var request = new AWS.HttpRequest(endpoint, region);

  request.method = 'PUT';
  request.path += index + '/' + type + '/' + id;
  request.body = JSON.stringify(document);
  request.headers['host'] = domain;
  request.headers['Content-Type'] = 'application/json';
  // Content-Length is only needed for DELETE requests that include a request
  // body, but including it for all requests doesn't seem to hurt anything.
  request.headers['Content-Length'] = Buffer.byteLength(request.body);

  var credentials = new AWS.EnvironmentCredentials('AWS');
  var signer = new AWS.Signers.V4(request, 'es');
  signer.addAuthorization(credentials, new Date());

  var client = new AWS.HttpClient();
  client.handleRequest(request, null, function(response) {
    console.log(response.statusCode + ' ' + response.statusMessage);
    var responseBody = '';
    response.on('data', function (chunk) {
      responseBody += chunk;
    });
    response.on('end', function (chunk) {
      console.log('Response body: ' + responseBody);
    });
  }, function(error) {
    console.log('Error: ' + error);
  });
}
   */
};
