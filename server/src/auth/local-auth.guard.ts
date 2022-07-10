import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

//   handleRequest(err, user, info, context, status) {

//     const request = context.switchToHttp().getRequest();
//     const { email, password } = request.body;

//     if (!password || !email || err) {
//       if (!email) {
//         throw new HttpException({ message: 'no email was provided' }, HttpStatus.OK);
//       } else if (!password) {
//         throw new HttpException({ message: 'no password was provided' }, HttpStatus.OK);
//       } else {
//         throw err || new UnauthorizedException();
//       }
//     }
//     return request;
//   }
}
