import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Observable } from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

    transform(value: number): string {
      let hours: string = ('00'+ Math.floor(value/3600)).slice(-2);
      let hr:number = parseFloat(hours)
      let minutes: string = ('00'+ Math.floor(value/60)%60).slice(-2);
      let min:number = parseFloat(minutes)
       return hours + ':' + minutes + ':' + ('00'+Math.floor(value-min * 60)).slice(-2);
    }

}