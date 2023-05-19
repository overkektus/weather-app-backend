import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetCurrentWeatherQuery } from 'src/weather/dtos/getCurrentWeather.query';
import { ICurrentWeather } from 'src/interface/currentWeather.interface';
import { IForecast } from 'src/interface/forecast.interface';
import { GetForecastQuery } from 'src/weather/dtos/getForecast.query';

export type Units = 'metric' | 'imperial';

@Injectable()
export class OpenweathermapService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  async getCurrentWeather({
    lat,
    lng,
    units,
  }: GetCurrentWeatherQuery): Promise<ICurrentWeather> {
    try {
      const url = `${this.baseUrl}/weather`;
      const res = await axios.get<ICurrentWeather>(url, {
        params: {
          lat,
          lon: lng,
          units,
          appid: process.env.OPENWEATHERMAP_API_KEY,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error('');
    }
  }

  async getForecast({ lat, lng, units }: GetForecastQuery): Promise<IForecast> {
    try {
      const url = `${this.baseUrl}/forecast`;
      const res = await axios.get<IForecast>(url, {
        params: {
          lat,
          lon: lng,
          units,
          appid: process.env.OPENWEATHERMAP_API_KEY,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
