import { Injectable } from "@angular/core";

@Injectable({  providedIn: 'root' })
export class ModeService {
    mode = true;

    getMode(): boolean {
        return this.mode;
    }

    setMode(mode: boolean): void {
        this.mode = mode;
    }
}
