import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCount'
})
export class SortByCountPipe implements PipeTransform {
  transform(array: any[], restaurantCounts: { [key: string]: number }): any[] {
    if (!array) {
      return array;
    }

    return array.sort((a, b) => {
      const countA = restaurantCounts[a.restaurant];
      const countB = restaurantCounts[b.restaurant];

      return countB - countA;
    });
  }
}