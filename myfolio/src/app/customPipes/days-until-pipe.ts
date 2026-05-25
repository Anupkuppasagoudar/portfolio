import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysUntil',
})
export class DaysUntilPipe implements PipeTransform {
  transform(targetDate: string | Date): number {
    if(!targetDate) return 0;

    const today = new Date();
    const lwd = new Date(targetDate);

    today.setHours(0, 0, 0, 0);
    lwd.setHours(0, 0, 0, 0);
    const timeDiff = lwd.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }
}
