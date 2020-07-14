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

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-1', apiVersion: '2012-08-10' });

//Environment variables
const { 
    BASE_TABLE_NAME,
    HISTORY_TABLE_NAME,
    IDENTITY_POOL_ID,
    ACCOUNT_ID
    } = process.env;

exports.addUserToDatabase = (event, context, callback) => {

    //var identityPoolParams = {
    //    IdentityPoolId: IDENTITY_POOL_ID, /* required */
    //    AccountId: ACCOUNT_ID
    //};
//
    //cognitoidentity.getId(identityPoolParams, function (err, data) {
    //    if (err) console.log(err, err.stack); // an error occurred
    //    else {
    //        console.log(data)
    //        userId = data;
    //    };           // successful response
    //});
    
    

    console.log(event);

    var userAtt = event.request.userAttributes
    /*
    {
        email_verified: 'true',
            phone_number_verified: 'true',
                phone_number: '+94712422767',
                    email: 'bimsara.gunarathna@gmail.com'
    }
    */


    var cognitoUsername = event.userName;

    const now = Date.now();
    
    try {
        //Putting a new Student record to the Base table.   
        const params = {
            Item: {
                "PK": {
                    S: 'USERID#' + cognitoUsername
                },
                "SK": {
                    S: 'STUID#' + cognitoUsername
                },
                "createdAt": {
                    S: now
                },
                "userId": {
                    S: cognitoUsername
                },
                "userProfileImageURL": {
                    S: userAtt.userProfileImageURL
                },
                "userEmail": {
                    N: userAtt.email
                },
                "stuFirstName": {
                    N: event.stuFirstName
                },
                "stuMidName": {
                    S: event.stuMidName
                },
                "stuSecName": {
                    S: event.stuSecName
                },
                "stuBookmarks": {
                    S: event.stuBookmarks
                },
                "stuPaperResultSet": {
                    S: event.stuPaperResultSet
                },
                "stuGrade": {
                    S: event.stuGrade
                },
                "stuFocusExam": {
                    S: event.stuFocusExam
                },
                "stuStream": {
                    BOOL: event.stuStream
                },
                "stuSchool": {
                    S: event.stuSchool
                },
                "stuProvince": {
                    S: event.stuProvince
                },
                "stuDistrict": {
                    S: event.stuDistrict
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
