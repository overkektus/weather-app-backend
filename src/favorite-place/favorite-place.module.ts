import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleMapsService } from 'src/google-maps/google-maps.service';
import { FavoritePlaceController } from './favorite-place.controller';
import { FavoritePlaceService } from './favorite-place.service';
import { PlaceSchema } from './place.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
  ],
  controllers: [FavoritePlaceController],
  providers: [FavoritePlaceService, GoogleMapsService],
})
export class FavoritePlaceModule {}
