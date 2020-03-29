import API from '../configs/configCinema';

const getMoviesInfo = params => API.get(`movies`, {
  params
});

const getSessions = params => API.get(`movieShows`, {
  params
});

const findMovieByParams = params => API.get(`movies/find`, {
  params
});

const reservPlace = body => API.post(`bookingPlace`, body);

export {
  getMoviesInfo,
  getSessions,
  findMovieByParams,
  reservPlace,
}