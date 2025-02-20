import { LoggerService } from '@nestjs/common';

export class JsonLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]): void {
    const logMessage = this.formatMessage('log', message, optionalParams);
    console.log(logMessage);
  }

  error(message: any, ...optionalParams: any[]): void {
    const logMessage = this.formatMessage('error', message, optionalParams);
    console.error(logMessage);
  }

  warn(message: any, ...optionalParams: any[]): void {
    const logMessage = this.formatMessage('warn', message, optionalParams);
    console.warn(logMessage);
  }

  debug(message: any, ...optionalParams: any[]): void {
    const logMessage = this.formatMessage('debug', message, optionalParams);
    console.debug(logMessage);
  }

  verbose(message: any, ...optionalParams: any[]): void {
    const logMessage = this.formatMessage('verbose', message, optionalParams);
    console.log(logMessage);
  }

  private formatMessage(level: string, message: any, optionalParams: any[]): string {
    return JSON.stringify({ level, message, optionalParams });
  }
}
