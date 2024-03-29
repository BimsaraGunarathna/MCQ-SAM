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

exports.s3TriggerToDynamodb = (event, context, callback) => {
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
};
