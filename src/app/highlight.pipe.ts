import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, keywords: string[]): string {
    if (!value || !keywords || keywords.length == 0) {
      return value;
    }

    let highlightedText = value;
    for (const keyword of keywords) {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<tui-tag>$1</tui-tag>`);
    }
    return highlightedText;
  }

}
