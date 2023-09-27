import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TenantHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let tenantname = window.location.href.split("/")[3].toLowerCase();
    const clonedRequest = req.clone({ headers: req.headers.append('X-TENANT-ID', tenantname) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
