import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import {Routes, RouterModule } from '@angular/router';


@Injectable()
export class GameService {
    private creatorName = '';

    
constructor(public router: Router, private http: Http){}
    



    setCreatorName(creator: any) {
        this.creatorName = creator;
    
    }

    getCreatorName(){
        return this.creatorName;
    }


}






