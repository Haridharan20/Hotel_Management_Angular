import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomsharing',
})
export class RoomsharingPipe implements PipeTransform {
  transform(array: any[], query: string[]): any[] {
    var resultArray = [];
    if (query.length === 0) {
      return array;
    }
    for (let j = 0; j < array.length; j++) {
      if (query.includes(array[j].capacity)) {
        resultArray.push(array[j]);
      }
    }
    return resultArray;
  }
}
