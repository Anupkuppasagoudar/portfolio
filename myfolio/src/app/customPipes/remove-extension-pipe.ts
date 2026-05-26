import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeExtension',
})
export class RemoveExtensionPipe implements PipeTransform {
  transform(value: string): string {
   if (!value) return '';

    // 1. Remove the extension (.md, .txt, etc.)
    let title = value.replace(/\.[^/.]+$/, "");

    // 2. Replace hyphens and underscores with spaces
    title = title.replace(/[-_]/g, ' ');

    // 3. Capitalize the first letter of each word (Title Case)
    return title.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
  }
}
