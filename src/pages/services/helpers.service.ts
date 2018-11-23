import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
    filterByKey( data, key?: string, value?: string ) {
        return typeof key == 'undefined' || value == 'undefined' ? data : data.filter(post => post[key] === value);
    }
    
    sortByKey( data, key, order ) {
        return data.sort(this.compareValues(key, order))
    }

    filterByDate( data, startDate, endDate) {
      return data.filter(
        m => new Date(m.date) >= new Date(startDate) && new Date(m.date) <= new Date(endDate)
        );
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
            (order == 'asc') ? 
            (comparison * -1) : comparison
          );
        };
      }
}