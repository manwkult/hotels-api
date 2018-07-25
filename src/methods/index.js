import Response from '../models/response';
import Result from '../models/result';
import * as resultTypes from '../utils/result-types';

import data from '../data/data.json';

const filterHotels = async (filters) => {
  if (Object.keys(filters).length !== 0 && filters.constructor === Object) {
    return data.filter((item) => {
      if (filters.name) {
        if (filters.stars && filters.stars !== 0) {
          return item.name.toLowerCase().includes(filters.name.toLowerCase())
            && item.stars === filters.stars;
        } else {
          return item.name.toLowerCase().includes(filters.name.toLowerCase());
        }
      } else if (filters.stars && filters.stars !== 0) {
        return item.stars === filters.stars;
      } else {
        return item;
      }
    });
  } else {
    return data;
  }
};

export const listHotels = async (params) => {
  try {
    if (params) {
      const {
        filters,
      } = params;

      let results = [];

      if (filters !== undefined) {
        results = await filterHotels(JSON.parse(filters));
      } else {
        results = data;
      }

      if (results && results.length > 0) {
        return new Response(200, new Result(results, resultTypes.SUCCESS, 'Lista de hoteles'));
      } else {
        return new Response(200, new Result([], resultTypes.SUCCESS, 'No se encontraron registros'));
      }
    } else {
      return new Response(400, new Result([], resultTypes.ERROR, 'Ha ocurrido un error'));
    }
  } catch (error) {
    return new Response(500, new Result([], resultTypes.ERROR, error.message));
  }
};
