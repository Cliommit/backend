import { TRANSPORT_TYPES, validateTransportType } from "./transportHelpers";

/**
 * Helper method to return the proper emissions factor for each transportation type.
 * Additionally validates the input to confirm that we support the passed in transportation type.
 * @param {String} transportType - type of transport to calculate emissions for
 */
function resolveEmissionFactor(transportType = TRANSPORT_TYPES.DRIVING) {
  const emissionFactorMap = {
    /**
     * This number is based off of IEA GFEI report for Fuel Economy.
     * 206 grams of CO2/KM travelled was the national average for Canada
     * for 2017. We convert to kilograms for calculations.
     * See: https://www.iea.org/topics/transport/gfei/
     */
    [TRANSPORT_TYPES.DRIVING]: 0.206,

    /**
     * We start with the US Average pounds of CO2/e per mile
     * See: https://www.transit.dot.gov/sites/fta.dot.gov/files/docs/PublicTransportationsRoleInRespondingToClimateChange2010.pdf
     * 0.45 lbs CO2/e per mile is the national average for public transit
     * 0.72 lbs CO2/e per KM
     * Roughly 203 grams per mile
     * or 127 grams per KM
     */
    [TRANSPORT_TYPES.TRANSIT]: 0.127,

    // TODO: Validate that these are ACTUALLY zero.
    [TRANSPORT_TYPES.BICYCLING]: 0,
    [TRANSPORT_TYPES.WALKING]: 0
  };

  const validTransportType = validateTransportType(transportType);
  return emissionFactorMap[validTransportType];
}

/**
 * Method for calculating carbon emissions for a single vehicle trip.
 * @param {Interger} distance  - distance of travel in kilometers
 */
export function calculateEmissions(distance, transportType) {
  if (typeof distance !== "number") {
    throw new Error(
      "Invalid distance provided. Distance should be a number in kilometers."
    );
  }

  if (distance <= 0) {
    return 0;
  }

  const EMISSION_FACTOR_PER_KM = resolveEmissionFactor(transportType);
  return parseFloat((distance * EMISSION_FACTOR_PER_KM).toFixed(4));
}
