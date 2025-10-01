import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/user-auth-service';

/**
 * Intercepta todas as requisições HTTP e adiciona o token de autenticação no cabeçalho 'Authorization'
 * caso o usuário esteja logado.
 * @param req Requisição HTTP
 * @param next Próximo manipulador de requisições
 * @returns Observable de HttpEvent
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const _userAuthService = inject(UserAuthService);

  const HAS_TOKEN = _userAuthService.getUserToken();
  if (HAS_TOKEN) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${HAS_TOKEN}`),
    });

    return next(newReq);
  }

  return next(req);
};
