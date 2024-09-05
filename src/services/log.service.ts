import { Injectable } from "@angular/core";

@Injectable({  providedIn: 'root' })
export class Logger {
    log(msg: unknown, ...data: unknown[]) { 
        console.log(msg, ...data);
    }
    error(msg: unknown) { console.error(msg); }
    warn(msg: unknown) { console.warn(msg); }
}
