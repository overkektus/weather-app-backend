import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenweathermapService } from 'src/openweathermap/openweathermap.service';
import { GetCurrentWeatherQuery } from 'src/weather/dtos/getCurrentWeather.query';
import { ICurrentWeather } from 'src/interface/currentWeather.interface';
import { IForecast } from 'src/interface/forecast.interface';
import { GetForecastQuery } from './dtos/getForecast.query';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly openweathermapService: OpenweathermapService) {}

  @ApiOperation({ summary: 'Get current weather' })
  @Get('/current')
  async getCurrentWeather(
    @Query() queryParams: GetCurrentWeatherQuery,
  ): Promise<ICurrentWeather> {
    return this.openweathermapService.getCurrentWeather(queryParams);
  }

  @ApiOperation({ summary: 'Get forecast' })
  @Get('/forecast')
  async getForecast(
    @Query() queryParams: GetForecastQuery,
  ): Promise<IForecast> {
    return this.openweathermapService.getForecast(queryParams);
  }
}
