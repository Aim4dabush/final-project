import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersService } from "./Services/users.service";

@Injectable()
export class UserInterceptor implements HttpInterceptor {
    constructor(private usersService: UsersService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const userToken = this.usersService.getToken();
        const userRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + userToken)
        });
        return next.handle(userRequest);
    }
}