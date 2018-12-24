var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/login/register/register';
import { PostsPage } from '../pages/posts/posts';
import { NewPostModalPage } from '../pages/posts/new-post-modal/new-post-modal';
import { PostDetailPage } from '../pages/posts/post-details/post-details';
import { PostFilterPopover } from '../pages/posts/posts';
import { ReportsPage } from '../pages/reports/reports';
import { NewReportModalPage } from '../pages/reports/new-report-modal/new-report-modal';
import { ReportDetailPage } from '../pages/reports/report-details/report-details';
import { DataPage } from '../pages/data/data';
import { ImagePicker } from '@ionic-native/image-picker';
import { FirebaseService } from '../pages/services/firebase.service';
import { AuthService } from '../pages/services/auth.service';
import { HelperService } from '../pages/services/helpers.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environment/environment';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                LoginPage,
                RegisterPage,
                PostsPage,
                ReportsPage,
                NewReportModalPage,
                ReportDetailPage,
                NewPostModalPage,
                PostDetailPage,
                TabsPage,
                PostFilterPopover,
                DataPage,
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                AngularFireModule.initializeApp(environment.firebase),
                AngularFirestoreModule,
                AngularFireAuthModule,
                AngularFireStorageModule,
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                LoginPage,
                RegisterPage,
                PostsPage,
                ReportsPage,
                ReportDetailPage,
                NewReportModalPage,
                NewPostModalPage,
                PostDetailPage,
                TabsPage,
                PostFilterPopover,
                DataPage,
            ],
            providers: [
                StatusBar,
                SplashScreen,
                ImagePicker,
                FirebaseService,
                AuthService,
                HelperService,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map