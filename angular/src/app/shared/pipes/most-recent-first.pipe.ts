import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../classes/comment';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  transform(comments: Comment[] | undefined
    ): Comment[] | undefined {
      if (comments && comments.length > 0) {
        comments = comments.sort((a, b) => {
          let order = 0;
          if (b.date && a.date) {
            if (b.date > a.date) order = 1;
            else if (b.date < a.date) order = -1;
          }
          return order;
        });
      }
    return comments;
  }

}
