import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class SpinnerService{
    isLoadin$=new Subject<boolean>();
    show():void{
        this.isLoadin$.next(true);
    }
    hide():void{
        this.isLoadin$.next(false);
    }
}