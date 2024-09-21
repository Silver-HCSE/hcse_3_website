import { Component } from '@angular/core';
import { HcseDataService } from '../hcse-data.service';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss'
})
export class DictionaryComponent {
  current_letter: string = 'A';
  words: any[] = [];
  constructor(private data: HcseDataService) {

  }

  update_word_list(new_char: string) {
    this.current_letter = new_char[0];
    const dictionary = this.data.keyword_ratings();
    this.words = [];
    for (let key in dictionary) {
      if (key[0] == this.current_letter) {
        this.words.push(dictionary[key]);
      }
    }
  }
}
