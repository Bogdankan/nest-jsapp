import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async fetchData(): Promise<any> {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=d49075ee8bd10666c48b144171c7bf84&units=imperial');
      const jsonData = response.data;

      const modifiedData = this.convertTemperature(jsonData);

      return modifiedData;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private convertTemperature(data: any): any {
    const convertToCelsius = (fahrenheit: number) => parseFloat(((fahrenheit - 32) * 5 / 9).toFixed(2));

    data.list.forEach((item: any) => { 
      item.main.temp = convertToCelsius(item.main.temp);
      item.main.temp_min = convertToCelsius(item.main.temp_min);
      item.main.temp_max = convertToCelsius(item.main.temp_max);
    });

    return data;
  }
}

