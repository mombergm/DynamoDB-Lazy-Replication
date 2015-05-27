var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB({region: 'eu-west-1'});

console.log('Loading function avgKinesisConsumer');
exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, 2));
    
    event.Records.forEach(function(record, index, array) {
        // Kinesis data is base64 encoded so decode here
        var epoch = (Math.round( (new Date().getTime())/1000)).toString();
    	console.log("Submitting epoch key: " + epoch)
        payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');


        var params = {
			Item: {
				timestamp: {
					N: epoch
				},
				payload: {
					S: payload
				}
			},
			TableName: 'AVG-Kinesis-POC'
		}

		try {

			dynamodb.putItem(params,function(e,d){
				console.log(params);
				console.log('Decoded payload:', payload);
				console.log("Added to Dynamodb")
				console.log("Error" + e);

				if (index === array.length - 1) {
		             console.log("Done");
		             context.succeed();
		         }
			})

		} catch (e) {
			console.log(e);
		}
		
        
    });
};