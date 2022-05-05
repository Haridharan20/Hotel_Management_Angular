import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(values: any, filterString: any): any[] {
    const result: any = [];
    if (!values) {
      return [];
    }
    if (!filterString) {
      return values;
    }
    values.forEach((ele: any) => {
      if (ele.name.trim().toLowerCase().includes(filterString)) {
        result.push(ele);
      }
    });

    return result;
  }
}
