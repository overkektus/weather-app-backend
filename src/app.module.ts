import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { GoogleMapsService } from './google-maps/google-maps.service';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { WeatherModule } from './weather/weather.module';
import { OpenweathermapService } from './openweathermap/openweathermap.service';
import { FavoritePlaceModule } from './favorite-place/favorite-place.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot(),
    WeatherModule,
    FavoritePlaceModule,
    GoogleMapsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
  ],
  providers: [GoogleMapsService, OpenweathermapService],
})
export class AppModule {}
