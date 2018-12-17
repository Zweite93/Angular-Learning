import { Injectable } from '@angular/core';

@Injectable()

export class AppConfig {
    
    private _config: { [key: string]: string };

    constructor() {
        this._config = {
            PathAPI: 'http://localhost:50498/api/'
        };
    }
    
    get settings(): { [key: string]: string } {
        return this._config;
    }

    get(key: string) {
        return this._config[key];
    }
};