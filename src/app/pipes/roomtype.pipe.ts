import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomtype',
})
export class RoomtypePipe implements PipeTransform {
  transform(values: any, filterString: any): any[] {
    const result: any = [];
    if (!values) {
      return [];
    }
    if (!filterString) {
      return values;
    }
    values.forEach((ele: any) => {
      if (ele.roomtype.trim().toLowerCase().includes(filterString)) {
        result.push(ele);
      }
    });

    return result;
  }
}
