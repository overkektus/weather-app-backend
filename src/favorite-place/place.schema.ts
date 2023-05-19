import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlaceDocument = HydratedDocument<Place>;

@Schema()
export class Place {
  @Prop()
  place_id: string;

  @Prop()
  formatted_address: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop()
  timeOffset: number;

  @Prop()
  imgName: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
