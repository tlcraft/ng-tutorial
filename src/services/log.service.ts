import { Injectable } from "@angular/core";

@Injectable({  providedIn: 'root' })
export class Logger {
    log(msg: unknown, data?: unknown) { 
        if (data !== 'undefined') {
            console.log(msg, data);
        } else {
            console.log(msg);
        }
    }
    error(msg: unknown) { console.error(msg); }
    warn(msg: unknown) { console.warn(msg); }
}
