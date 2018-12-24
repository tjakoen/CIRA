var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { FirebaseService } from '../services/firebase.service';
var DataPage = /** @class */ (function () {
    function DataPage(navCtrl, firebaseService, navParams) {
        this.navCtrl = navCtrl;
        this.firebaseService = firebaseService;
        this.navParams = navParams;
        this.postData = {
            solved: {
                missingPersons: 0,
                wantedPersons: 0,
                missingProperties: 0,
            },
            unsolved: {
                missingPersons: 0,
                wantedPersons: 0,
                missingProperties: 0,
            },
        };
    }
    DataPage.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getData()
            .then(function (data) {
            if (data) {
                data.map(function (dataMap) {
                    var allData = dataMap.payload.doc.data();
                    _this.postData = allData;
                });
            }
        });
    };
    DataPage.prototype.postsSum = function (filter) {
        if (filter === void 0) { filter = 'all'; }
        var sum = 0;
        switch (filter) {
            case 'solved':
                sum += this.postData.solved.missingPersons;
                sum += this.postData.solved.missingProperties;
                sum += this.postData.solved.wantedPersons;
                break;
            case 'unsolved':
                sum += this.postData.unsolved.missingPersons;
                sum += this.postData.unsolved.missingProperties;
                sum += this.postData.unsolved.wantedPersons;
                break;
            default:
                sum += this.postData.solved.missingPersons;
                sum += this.postData.solved.missingProperties;
                sum += this.postData.solved.wantedPersons;
                sum += this.postData.unsolved.missingPersons;
                sum += this.postData.unsolved.missingProperties;
                sum += this.postData.unsolved.wantedPersons;
                break;
        }
        return sum;
    };
    DataPage.prototype.getSolveRate = function (solved, unsolved) {
        return ((solved / unsolved) * 100).toFixed(1);
    };
    DataPage.prototype.ionViewDidLoad = function () {
        this.getData();
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'pie',
            data: {
                labels: ["Missing Persons", "Mssing Property", "Wanted Persons"],
                datasets: [{
                        label: 'Post Types',
                        data: [12, 19, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1
                    }]
            }
        });
        // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        //     type: 'doughnut',
        //     data: {
        //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //             label: '# of Votes',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             hoverBackgroundColor: [
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56",
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56"
        //             ]
        //         }]
        //     }
        // });
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    __decorate([
        ViewChild('barCanvas'),
        __metadata("design:type", Object)
    ], DataPage.prototype, "barCanvas", void 0);
    __decorate([
        ViewChild('doughnutCanvas'),
        __metadata("design:type", Object)
    ], DataPage.prototype, "doughnutCanvas", void 0);
    __decorate([
        ViewChild('lineCanvas'),
        __metadata("design:type", Object)
    ], DataPage.prototype, "lineCanvas", void 0);
    DataPage = __decorate([
        Component({
            selector: 'page-data',
            templateUrl: 'data.html',
        }),
        __metadata("design:paramtypes", [NavController,
            FirebaseService,
            NavParams])
    ], DataPage);
    return DataPage;
}());
export { DataPage };
//# sourceMappingURL=data.js.map