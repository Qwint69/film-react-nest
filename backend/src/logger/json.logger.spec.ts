import { LoggerService } from '@nestjs/common';
import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();

    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log a message with level "log"', () => {
    const message = 'This is a log message';
    const optionalParams = ['param1', 'param2'];

    logger.log(message, ...optionalParams);

    expect(console.log).toHaveBeenCalledWith(
      '{"level":"log","message":"This is a log message","optionalParams":["param1","param2"]}',
    );
  });

  it('should log an error message with level "error"', () => {
    const message = 'This is an error message';
    const optionalParams = ['errorDetails'];

    logger.error(message, ...optionalParams);

    expect(console.error).toHaveBeenCalledWith(
      '{"level":"error","message":"This is an error message","optionalParams":["errorDetails"]}',
    );
  });

  it('should log a warning message with level "warn"', () => {
    const message = 'This is a warning message';
    const optionalParams = ['warningDetails'];

    logger.warn(message, ...optionalParams);

    expect(console.warn).toHaveBeenCalledWith(
      '{"level":"warn","message":"This is a warning message","optionalParams":["warningDetails"]}',
    );
  });

  it('should log a debug message with level "debug"', () => {
    const message = 'This is a debug message';
    const optionalParams = ['debugDetails'];

    logger.debug(message, ...optionalParams);

    expect(console.debug).toHaveBeenCalledWith(
      '{"level":"debug","message":"This is a debug message","optionalParams":["debugDetails"]}',
    );
  });

  it('should log a verbose message with level "verbose"', () => {
    const message = 'This is a verbose message';
    const optionalParams = ['verboseDetails'];

    logger.verbose(message, ...optionalParams);

    expect(console.log).toHaveBeenCalledWith(
      '{"level":"verbose","message":"This is a verbose message","optionalParams":["verboseDetails"]}',
    );
  });
});
