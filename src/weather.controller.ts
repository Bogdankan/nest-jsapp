/*import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(lat: number, lon: number) {
    const data = await this.weatherService.fetchData(lat, lon);
    return { data };
  }
}*/

import { Controller, Get, Query, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('lat') lat: number, @Query('lon') lon: number, @Query('units') units: string) {
    try {
      const data = await this.weatherService.fetchData(lat, lon, units);
      return { data };
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  @Get('/:date')
  async getWeatherByDate(
    @Param('date') date: string,
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('units') units: string,
    ) {
    try {
      const data = await this.weatherService.getByDate(lat, lon, units, date);
      return { data };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
