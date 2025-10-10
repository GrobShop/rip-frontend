import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Текст скопирован в буфер обмена');
    } catch (err) {
      console.error('Ошибка копирования: ', err);
    }
  }
}
