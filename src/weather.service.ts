import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async fetchData(lat: number, lon: number, units: string): Promise<any> {
    try {
      switch (units) {
      case 'standard':
      case 'metric':
      case 'imperial':  
        break;
      default:
        units = 'metric';
    }
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=d49075ee8bd10666c48b144171c7bf84&units=' + units);
      const jsonData = response.data;
      return jsonData;
    } catch (error) {
      throw new HttpException('Перевірте ваш запис на валідність', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getByDate(lat: number, lon: number, units: string, date: string) {
   try {
      switch (units) {
      case 'standard':
      case 'metric':
      case 'imperial':
        break;
      default:
        units = 'metric';
    }
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=d49075ee8bd10666c48b144171c7bf84&units=' + units);
      const jsonData = response.data;

      const filteredData = jsonData.list.filter((item) => item.dt_txt === date);
      if (filteredData.length > 0) {
      return filteredData[0];
    } else {     
      throw new Error('Дані про погоду для заданої дати не знайдено');
    }
    } catch (error) {
      throw new HttpException('Дані про погоду для заданої дати не знайдено', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

