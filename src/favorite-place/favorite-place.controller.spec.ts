import { Test, TestingModule } from '@nestjs/testing';
import { FavoritePlaceController } from './favorite-place.controller';

describe('FavoritePlaceController', () => {
  let controller: FavoritePlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritePlaceController],
    }).compile();

    controller = module.get<FavoritePlaceController>(FavoritePlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
