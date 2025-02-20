import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsService } from '../films/films.service';
import { OrdersRepository } from '../repository/order.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

describe('OrderService', () => {
  let orderService: OrderService;
  let filmsService: FilmsService;
  let ordersRepository: OrdersRepository;

  const mockFilmsService = {
    findById: jest.fn(),
    saveFilm: jest.fn(),
    findAll: jest.fn(), 
  };

  const mockOrdersRepository = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
        {
          provide: OrdersRepository,
          useValue: mockOrdersRepository,
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    filmsService = module.get<FilmsService>(FilmsService);
    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('should create an order successfully', async () => {
    const createOrderDto: CreateOrderDto = {
      email: 'test@example.com',
      phone: 123456789,
      tickets: [
        {
          film: '1',
          session: '1',
          daytime: '2025-02-17T10:00:00',
          day: 'Monday',
          time: '10:00 AM',
          row: 1,
          seat: 1,
          price: 10,
        },
      ],
    };

    const mockFilm = {
      id: '1',
      schedule: [{ id: '1', taken: '' }],
    };

    mockFilmsService.findById.mockResolvedValue(mockFilm);
    mockFilmsService.saveFilm.mockResolvedValue(mockFilm);
    mockFilmsService.findAll.mockResolvedValue([mockFilm]); 

    mockOrdersRepository.createOrder.mockResolvedValue(new Order());

    const result = await orderService.createOrder(createOrderDto);

    expect(result).toBeInstanceOf(Order);
    expect(mockFilmsService.findById).toHaveBeenCalledWith('1');
    expect(mockFilmsService.findAll).toHaveBeenCalled(); 
    expect(mockOrdersRepository.createOrder).toHaveBeenCalled();
  });

  it('should throw an error if film is not found', async () => {
    const createOrderDto: CreateOrderDto = {
      email: 'test@example.com',
      phone: 123456789,
      tickets: [
        {
          film: '1',
          session: '1',
          daytime: '2025-02-17T10:00:00',
          day: 'Monday',
          time: '10:00 AM',
          row: 1,
          seat: 1,
          price: 10,
        },
      ],
    };

    mockFilmsService.findById.mockResolvedValue(null);

    await expect(orderService.createOrder(createOrderDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw an error if seat is already taken', async () => {
    const createOrderDto: CreateOrderDto = {
      email: 'test@example.com',
      phone: 123456789,
      tickets: [
        {
          film: '1',
          session: '1',
          daytime: '2025-02-17T10:00:00',
          day: 'Monday',
          time: '10:00 AM',
          row: 1,
          seat: 1,
          price: 10,
        },
      ],
    };

    const mockFilm = {
      id: '1',
      schedule: [{ id: '1', taken: '1:1' }],
    };

    mockFilmsService.findById.mockResolvedValue(mockFilm);

    await expect(orderService.createOrder(createOrderDto)).rejects.toThrow(
      ConflictException,
    );
  });
});
