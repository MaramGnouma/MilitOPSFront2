import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createRange'
})
export class CreateRangePipe implements PipeTransform {
  transform(value: number): number[] {
    const result = [];
    for (let i = 1; i <= value; i++) {
      result.push(i);
    }
    return result;
  }
}


