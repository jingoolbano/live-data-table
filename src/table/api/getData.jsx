import axios from "axios";


export const getData = () => {
  return axios('https://interview.darkube.app/lastdata');
};



