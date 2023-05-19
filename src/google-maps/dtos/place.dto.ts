import { GeocodeResult, PlaceType2 } from '@googlemaps/google-maps-services-js';
import { IPlace } from 'src/favorite-place/place.interface';

export class PlaceDTO implements IPlace {
  place_id: string;
  formatted_address: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  timeOffset?: number;
  imgName?: string;

  constructor(geocodeResult: GeocodeResult) {
    this.place_id = geocodeResult.place_id;
    this.formatted_address = geocodeResult.formatted_address;
    this.country = geocodeResult.address_components.filter((component) =>
      component.types.includes(PlaceType2.country),
    )[0].long_name;
    this.city = geocodeResult.address_components.filter((component) =>
      component.types.includes(PlaceType2.locality),
    )[0].long_name;
    this.lat = geocodeResult.geometry.location.lat;
    this.lng = geocodeResult.geometry.location.lng;
  }
}
