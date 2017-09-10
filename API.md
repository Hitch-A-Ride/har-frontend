# Available endpoints

## Get Slack User Id
### Request
```
GET: /api/slackUserInfo?email=<email>
```
### Response
```
{
    slackUserId: <id>
}
```

### Request
```
GET: /api/slackUserInfo?id=<SlackUserId>
```
### Response
```
{
    slackUserEmail: <email>
}
```

## Close Ride Request.
Use this after removing ride from `/currentRides` ref in Firebase.
This endpoint adds a :x reaction the request and removes all actions from the message.
### Request
```
POST: /api/cancelRideRequest
{
    rideId: <rideId>
}
```
### Response
```
200
```
