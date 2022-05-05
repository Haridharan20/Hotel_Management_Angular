import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: any[], inDate: any, outDate: any): any[] {
    console.log(value);
    console.log(inDate);
    const result: any = [];
    if (!value) {
      return [];
    }
    if (!inDate || !outDate) {
      return value;
    }
    value.forEach((ele: any) => {
      let availStart = new Date(ele.dates[0].start);
      let availEnd = new Date(ele.dates[0].end);
      let checkin = new Date(inDate);
      let checkOut = new Date(outDate);
      if (checkin >= availStart && checkOut <= availEnd) {
        result.push(ele);
      }
    });
    return result;
  }
}
