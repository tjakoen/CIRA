var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ModalController, PopoverController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { ReportDetailPage } from './report-details/report-details';
import { HelperService } from '../services/helpers.service';
import { NewReportModalPage } from './new-report-modal/new-report-modal';
var ReportsPage = /** @class */ (function () {
    function ReportsPage(navCtrl, modalCtrl, authService, firebaseService, helperService, popCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.authService = authService;
        this.firebaseService = firebaseService;
        this.helperService = helperService;
        this.popCtrl = popCtrl;
        this.reportData = [];
        this.filteredReportData = [];
        this.reports = [];
        this.filters = {
            viewType: 'all',
        };
    }
    ReportsPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    ReportsPage.prototype.displayReports = function () {
        var _this = this;
        this.proccessPosts(function (callback) {
            if (callback) {
                _this.reports = _this.filteredReportData;
            }
        });
    };
    ReportsPage.prototype.proccessPosts = function (callback) {
        this.filteredReportData = [];
        var filterdValue = this.filterReports(this.reportData);
        //let orderedValue = this.helperService.sortByKey( filterdValue, this.filters.orderBy, this.filters.orderDirection );
        //this.filteredReportData = orderedValue;
        this.filteredReportData = filterdValue;
        callback(true);
    };
    ReportsPage.prototype.filterReports = function (data) {
        data = this.filters.viewType != 'all' ? this.helperService.filterByKey(data, 'type', this.filters.viewType) : data;
        return data;
    };
    ReportsPage.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getReports()
            .then(function (data) {
            if (data) {
                data.map(function (dataMap) {
                    var report = dataMap.payload.doc.data();
                    report.documentId = dataMap.payload.doc.id;
                    _this.reportData.push(report);
                    _this.displayReports();
                });
            }
        });
    };
    ReportsPage.prototype.viewDetails = function (report) {
        this.navCtrl.push(ReportDetailPage, {
            data: report
        });
    };
    ReportsPage.prototype.openNewReportModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(NewReportModalPage);
        modal.onDidDismiss(function (data) {
            if (typeof data != 'undefined') {
                _this.displayReports();
            }
        });
        modal.present();
    };
    ReportsPage = __decorate([
        Component({
            selector: 'page-reports',
            templateUrl: 'reports.html'
        }),
        __metadata("design:paramtypes", [NavController,
            ModalController,
            AuthService,
            FirebaseService,
            HelperService,
            PopoverController])
    ], ReportsPage);
    return ReportsPage;
}());
export { ReportsPage };
//# sourceMappingURL=reports.js.map