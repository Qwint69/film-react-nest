import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity.';
import { Schedule } from 'src/films/entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({ relations: ['schedule'] });
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async findSchedule(id: string): Promise<Schedule[]> {
    const film = await this.findById(id);
    return film ? film.schedule : [];
  }

  async saveFilm(film: Film): Promise<Film> {
    return this.filmRepository.save(film);
  }
}
