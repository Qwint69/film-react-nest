import { LoggerService } from '@nestjs/common';
import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();

    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log a message with level "log" in TSKV format', () => {
    const message = 'This is a log message';
    const optionalParams = ['param1', 'param2'];

    logger.log(message, ...optionalParams);

    expect(console.log).toHaveBeenCalledWith(
      `log=This is a log message\tparam1\tparam2`,
    );
  });

  it('should log an error message with level "error" in TSKV format', () => {
    const message = 'This is an error message';
    const optionalParams = ['errorDetails'];

    logger.error(message, ...optionalParams);

    expect(console.error).toHaveBeenCalledWith(
      `error=This is an error message\terrorDetails`,
    );
  });

  it('should log a warning message with level "warn" in TSKV format', () => {
    const message = 'This is a warning message';
    const optionalParams = ['warningDetails'];

    logger.warn(message, ...optionalParams);

    expect(console.warn).toHaveBeenCalledWith(
      `warn=This is a warning message\twarningDetails`,
    );
  });

  it('should log a debug message with level "debug" in TSKV format', () => {
    const message = 'This is a debug message';
    const optionalParams = ['debugDetails'];

    logger.debug(message, ...optionalParams);

    expect(console.debug).toHaveBeenCalledWith(
      `debug=This is a debug message\tdebugDetails`,
    );
  });

  it('should log a verbose message with level "verbose" in TSKV format', () => {
    const message = 'This is a verbose message';
    const optionalParams = ['verboseDetails'];

    logger.verbose(message, ...optionalParams);

    expect(console.log).toHaveBeenCalledWith(
      `verbose=This is a verbose message\tverboseDetails`,
    );
  });
});
