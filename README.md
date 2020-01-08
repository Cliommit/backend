# Cliommit Backend
> This project was birthed at the CodeTheChange YYC Hackathon in November 2019. Original repo: https://www.github.com/LMulvey/carbonfootprint-backend

## Endpoints

### Emissions
`/api/emissions?distance=<distance>`

**Parameters:**

* `distance` - Distance in kilometers
* `travelType` - one of: driving, transit, walking, bicycling

Returns emissions value in grams CO2/e.

### RouteAndEmissions
`/api/routeAndEmissions?origin=<origin>&destination=<destination>`

**Parameters:**

* `origin` - lat,lng | placeId | address
* `destination` - lat,lng | placeId | address

Returns emissions value in grams CO2/e by route type.
