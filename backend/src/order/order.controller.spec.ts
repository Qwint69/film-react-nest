import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  it('should create an order', async () => {
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

    const orderResponse = {
      tickets: createOrderDto.tickets,
    };

    mockOrderService.createOrder.mockResolvedValue(orderResponse);

    const result = await orderController.createOrder(createOrderDto);

    expect(result).toEqual({ items: createOrderDto.tickets });
    expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
  });
});
