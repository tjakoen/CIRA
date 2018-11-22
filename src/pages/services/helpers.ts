import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
    filterByKey( data, key?: string ) {
        return typeof key == 'undefined' ? data : data.filter(post => post.type === key);
    }
    
    sortByKey( data, key, order='asc' ) {
        return data.sort(this.compareValues(key, order))
    }

    compareValues(key, order) {
        return function(a, b) {
          if(!a.hasOwnProperty(key) || 
             !b.hasOwnProperty(key)) {
            return 0; 
          }
          
          const varA = (typeof a[key] === 'string') ? 
            a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];
            
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order == 'desc') ? 
            (comparison * -1) : comparison
          );
        };
      }
}