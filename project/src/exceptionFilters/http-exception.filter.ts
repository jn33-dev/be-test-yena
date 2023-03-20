import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const err = exception.getResponse() as
            | { message: any; statusCode: number }
            // class-validator에서 발생한 에러 식별
            | { error: string; statusCode: 400; message: string[] };

        // class-validator에서 발생한 에러 처리
        if (typeof err !== 'string' && err.statusCode === 400) {
            return response.status(status).json({
                errorMessage: '요청한 데이터 형식을 확인해주세요.',
                validationDetails: err.message,
            });
        }
        console.error(exception);

        return response.status(status).json({ errorMessage: exception.message });
    }
}
