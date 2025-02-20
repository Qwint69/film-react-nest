import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Schedule } from './entities/schedule.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity.';
import { FilmsRepository } from '../repository/films.repository';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;
  let filmsRepository: Repository<Film>;
  let schedulesRepository: Repository<Schedule>;

  const mockFilmsRepository = {
    find: jest.fn().mockResolvedValue([new Film()]),
    findOne: jest.fn().mockResolvedValue(new Film()),
    save: jest.fn().mockResolvedValue(new Film()),
  };

  const mockSchedulesRepository = {
    find: jest.fn().mockResolvedValue([new Schedule()]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: FilmsRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue([new Film()]),
            findById: jest.fn().mockResolvedValue(new Film()),
            findSchedule: jest.fn().mockResolvedValue([new Schedule()]),
            saveFilm: jest.fn().mockResolvedValue(new Film()),
          },
        },
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmsRepository,
        },
        {
          provide: getRepositoryToken(Schedule),
          useValue: mockSchedulesRepository,
        },
      ],
    }).compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);

    jest.spyOn(filmsService, 'findAll').mockResolvedValue([new Film()]);
    jest
      .spyOn(filmsService, 'findSchedule')
      .mockResolvedValue([new Schedule()]);
    jest.spyOn(filmsService, 'saveFilm').mockResolvedValue(new Film());
  });

  it('should be defined', () => {
    expect(filmsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      await expect(filmsController.findAll()).resolves.toEqual({
        items: [expect.any(Film)],
      });
      expect(filmsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findSchedule', () => {
    it('should return an array of schedules for a film', async () => {
      const filmId = 'some-uuid';
      await expect(filmsController.findSchedule(filmId)).resolves.toEqual({
        items: [expect.any(Schedule)],
      });
      expect(filmsService.findSchedule).toHaveBeenCalledWith(filmId);
      expect(filmsService.findSchedule).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveFilm', () => {
    it('should save and return a film', async () => {
      const filmData = new Film();
      await expect(filmsService.saveFilm(filmData)).resolves.toEqual(
        expect.any(Film),
      );
      expect(filmsService.saveFilm).toHaveBeenCalledWith(filmData);
      expect(filmsService.saveFilm).toHaveBeenCalledTimes(1);
    });
  });
});
