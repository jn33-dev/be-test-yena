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

        if (typeof err !== 'string') {
            // class-validator에서 발생한 에러 처리
            if (err.statusCode === 400) {
                return response.status(status).json({
                    errorMessage: '요청한 데이터 형식을 확인해주세요.',
                    validationDetails: err.message,
                });
            }
            // JWT 인증 실패 에러 처리
            if (err.statusCode === 401) {
                return response.status(status).json({
                    errorMessage: '로그인 후 사용 가능합니다.',
                });
            }
            // 500에러 처리
            if (err.statusCode === 500) {
                return response.status(status).json({
                    errorMessage: '서버 오류가 발생했습니다.',
                });
            }
        }

        console.error(exception);

        return response.status(status).json({ errorMessage: exception.message });
    }
}
