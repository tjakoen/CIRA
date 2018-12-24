var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var HelperService = /** @class */ (function () {
    function HelperService() {
    }
    HelperService.prototype.filterByKey = function (data, key, value) {
        return typeof key == 'undefined' || value == 'undefined' ? data : data.filter(function (post) { return post[key] === value; });
    };
    HelperService.prototype.sortByKey = function (data, key, order) {
        return data.sort(this.compareValues(key, order));
    };
    HelperService.prototype.filterByDate = function (data, startDate, endDate) {
        return data.filter(function (m) { return new Date(m.date) >= new Date(startDate) && new Date(m.date) <= new Date(endDate); });
    };
    HelperService.prototype.compareValues = function (key, order) {
        return function (a, b) {
            if (!a.hasOwnProperty(key) ||
                !b.hasOwnProperty(key)) {
                return 0;
            }
            var varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            var varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];
            var comparison = 0;
            if (varA > varB) {
                comparison = 1;
            }
            else if (varA < varB) {
                comparison = -1;
            }
            return ((order == 'asc') ?
                (comparison * -1) : comparison);
        };
    };
    HelperService = __decorate([
        Injectable()
    ], HelperService);
    return HelperService;
}());
export { HelperService };
//# sourceMappingURL=helpers.service.js.map