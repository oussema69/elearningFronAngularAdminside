import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorie'
})
export class CategoriePipe implements PipeTransform {

  transform(value: any[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(p => (p.name?.toLowerCase().includes(Search)));
  }

}
