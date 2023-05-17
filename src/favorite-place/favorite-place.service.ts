import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoogleMapsService } from 'src/google-maps/google-maps.service';
import { PlaceDTO } from 'src/google-maps/dtos/place.dto';
import {
  CreatePlaceByCoordinatesDto,
  CreatePlaceByAddressDto,
} from './dtos/createFavoritePlace.dto';
import { IPlace } from './place.interface';

@Injectable()
export class FavoritePlaceService {
  constructor(
    @InjectModel('Place') private placeModel: Model<IPlace>,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  async getAllPlaces(): Promise<IPlace[]> {
    return this.placeModel.find();
  }

  async createPlaceByCoordinates(
    createPlaceByCoordinatesDto: CreatePlaceByCoordinatesDto,
  ): Promise<IPlace> {
    const place = await this.googleMapsService.getGeocode(
      createPlaceByCoordinatesDto,
    );
    const newPlace = this.placeModel.create(place);
    return newPlace;
  }

  async createPlaceByAdress(
    createPlaceByAddressDto: CreatePlaceByAddressDto,
  ): Promise<IPlace> {
    const place = await this.googleMapsService.getGeocode(
      createPlaceByAddressDto,
    );

    const placeDTO = new PlaceDTO(place);

    const { lat, lng } = placeDTO;

    const timeOffset = await this.googleMapsService.getTimeoffsetByCoordinates(
      lat,
      lng,
    );

    const imgName = await this.googleMapsService.savePlacePhotoByPlaceId(
      placeDTO.place_id,
    );

    placeDTO.timeOffset = timeOffset;

    if (imgName) {
      placeDTO.imgName = imgName;
    }

    const newPlace = await this.placeModel.create(placeDTO);
    return newPlace;
  }

  async deletePlace(placeId: string): Promise<IPlace> {
    const deletedPlace = await this.placeModel.findOneAndDelete({
      place_id: placeId,
    });
    if (!deletedPlace) {
      throw new NotFoundException(`Place #${placeId} not found`);
    }
    return deletedPlace;
  }
}
