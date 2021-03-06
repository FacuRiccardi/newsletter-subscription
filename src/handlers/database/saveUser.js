const AWS = require('aws-sdk')

module.exports.handler = async (event, context, callback) => {
  try {
    const dynamoDBClient = new AWS.DynamoDB.DocumentClient()
    const user = JSON.parse(event.Records[0].Sns.Message)

    const newUser = {
      TableName: process.env.usersTable,
      Item: user
    }

    await dynamoDBClient.put(newUser).promise()
    callback(null, 'User created!')
  } catch (err) {
    // TODO: Save error cases to an SQS queue for post processing
    console.log('Error ->', err.message)
    callback(null, `Error -> ${err.message}`)
  }
}