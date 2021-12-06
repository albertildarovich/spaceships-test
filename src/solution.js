// Please implement your solution in this file

import get from 'lodash/get';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import orderBy from 'lodash/orderBy';

module.exports = {
  prepareData: (data) => {
    const filteredFlights = reduce(
      data,
      (result, flight) => {
        const payloads = get(flight, 'rocket.second_stage.payloads');
        const flight_number = get(flight, 'flight_number');
        const mission_name = get(flight, 'mission_name');
        const launch_year = get(flight, 'launch_year');
        const launch_date_unix = get(flight, 'launch_date_unix');

        const hasNasaPayload =
          payloads &&
          payloads.find((payload) =>
            payload.customers.find((customer) => customer.includes('NASA'))
          );
        const isTargetYear = launch_year === '2018';

        if (hasNasaPayload && isTargetYear) {
          result.push({
            flight_number,
            mission_name,
            payloads_count: payloads.length,
            launch_date_unix,
          });
        }

        return result;
      },
      []
    );
    const sortedFlights = orderBy(
      filteredFlights,
      ['payloads_count', 'launch_date_unix'],
      ['desc', 'desc']
    );

    return map(
      sortedFlights,
      ({ flight_number, mission_name, payloads_count }) => ({
        flight_number,
        mission_name,
        payloads_count,
      })
    );
  },
  renderData: (data) =>
    (document.getElementById('out').textContent = JSON.stringify(
      data,
      undefined,
      2
    )),
};
