import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    // Если функция canActivate возвращает true, значит доступ к эндпоинту разрешен
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split('')[0];
            const token = authHeader.split('')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: 'User are not authorized',
                    statusCode: HttpStatus.UNAUTHORIZED,
                });
            }

            req.user = this.jwtService.verify(token);
            return true;
        } catch (e) {
            throw new UnauthorizedException({
                message: 'User are not authorized',
                statusCode: HttpStatus.UNAUTHORIZED,
            });
        }
    }
}
