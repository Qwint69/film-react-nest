import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';
import { Film } from './entities/film.entity.';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<Film[]> {
    return this.filmsRepository.findAll();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmsRepository.findById(id);
  }

  async findSchedule(id: string): Promise<Schedule[]> {
    return this.filmsRepository.findSchedule(id);
  }

  async saveFilm(film: Film): Promise<Film | null> {
    return this.filmsRepository.saveFilm(film);
  }
}
