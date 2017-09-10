destinations: [
    { 
        id
        coords: {
            lat
            lng
        }
        area
        city
    }
]

rides: [
    {
        id
        destinationId
        rideOwner
        riders: [
            {
                id
            }
        ]
        departureTime
    }
]

users [
    {
        id
        email
        slackId
        profile {
            firstName
            lastName
        }
        destinations: [
            {
                id
            }
        ]
        ridesGiven: [
            {
                id
            }
        ]
        ridesTaken: [
            {
                id
            }
        ]
    }
]

currentRides: [
    {
        id
    }
]