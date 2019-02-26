import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SideMenuPage } from '../pages/sidemenu/sidemenu';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/login/login';
import { PostsPage, PostFilterPopover, PostDetailsModal,NewPostModalPage } from '../pages/posts/posts';
import { PostsService } from '../pages/posts/posts.service'

import { ReportsPage, ReportDetailsModal, ReportInfoModal, ReportTypeAModal, ReportTypeBModal, ReportTypeCModal, ReportTypeDModal } from '../pages/reports/reports';
import { ReportsService } from '../pages/reports/reports.service'

import { UserInfoPage , EditUserModal} from '../pages/user-info/user-info';
import { UserInfoService } from '../pages/user-info/user-info.service';

import { DataPage } from '../pages/data/data';

import { ImagePicker } from '@ionic-native/image-picker';

import { FirebaseService, UploadService } from '../pages/services/firebase.service';
import { AuthService } from '../pages/services/auth.service';
import { HelperService } from '../pages/services/helpers.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environment/environment';
import { Globals } from '../pages/services/globals';

import { FormControlValidPromptComponent } from '../components/form-control-valid-prompt/form-control-valid-prompt.component';


@NgModule({
  declarations: [
    MyApp,
    LoginPage, RegisterPage,
    PostsPage,  NewPostModalPage, PostDetailsModal,   PostFilterPopover,
    ReportsPage, ReportDetailsModal, ReportInfoModal, ReportTypeAModal, ReportTypeBModal, ReportTypeCModal, ReportTypeDModal,
    TabsPage,
    DataPage,
    SideMenuPage,
    EditUserModal, UserInfoPage,
    FormControlValidPromptComponent
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
    LoginPage, RegisterPage,
    PostsPage,  NewPostModalPage, PostDetailsModal, PostFilterPopover,
    ReportsPage, ReportDetailsModal, ReportInfoModal, ReportTypeAModal, ReportTypeBModal, ReportTypeCModal, ReportTypeDModal,
    TabsPage,
    SideMenuPage,
    DataPage,
    UserInfoPage, EditUserModal,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    FirebaseService,
    UploadService,
    PostsService,
    ReportsService,
    UserInfoService,
    AuthService,
    HelperService,
    Globals,
    // LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}