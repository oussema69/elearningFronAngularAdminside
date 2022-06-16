import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ApprenantsComponent } from './components/apprenants/apprenants.component';
import { FormateursComponent } from './components/formateurs/formateurs.component';
import { FormationsComponent } from './components/formations/formations.component';
import { FooterComponent } from './components/footer/footer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { ProfileAppComponent } from './components/profile-app/profile-app.component';
import {MatCardModule} from "@angular/material/card";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ChapitreComponent } from './components/chapitre/chapitre.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ChapitrComponent } from './components/chapitr/chapitr.component';
import { ProfileFormateurComponent } from './components/profile-formateur/profile-formateur.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FomationContenuComponent } from './components/fomation-contenu/fomation-contenu.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { PdfComponent } from './components/pdf/pdf.component';
import { ImageComponent } from './components/image/image.component';
import { VideoComponent } from './components/video/video.component';
import { AffectAppComponent } from './components/affect-app/affect-app.component';
import { ApprenantsPipe } from './pipes/apprenants.pipe';
import { FormateurPipe } from './pipes/formateur.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoriePipe } from './pipes/categorie.pipe';
import { FormationPipe } from './pipes/formation.pipe';
import { ChapitrePipe } from './pipes/chapitre.pipe';
import { LoginComponent } from './components/login/login.component';
import {MatMenuModule} from "@angular/material/menu";
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule } from 'ng2-charts';
import { NgSelectModule } from "@ng-select/ng-select";
import 'flatpickr/dist/flatpickr.css';
import { PlanningComponent } from './components/planning/planning.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {IgxCalendarModule, IgxDialogModule} from "igniteui-angular";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import { RoomPipe } from './pipes/room.pipe';
import {DlDateTimeDateModule, DlDateTimePickerModule} from "angular-bootstrap-datetimepicker";
import { RoomComponent } from './components/room/room.component';
import {SchedulerModule} from "angular-calendar-scheduler";
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { CountMonthComponent } from './components/statistique/count-month/count-month.component';
import { CountmonthFormationComponent } from './components/statistique/countmonth-formation/countmonth-formation.component';
import { VisioformateurComponent } from './components/statistique/visioformateur/visioformateur.component';
import { StatapprComponent } from './components/statistique/statappr/statappr.component';
import { StatformComponent } from './components/statistique/statform/statform.component';
import { StatappformationComponent } from './components/statistique/statappformation/statappformation.component';
import { StatappvisioComponent } from './components/statistique/statappvisio/statappvisio.component';
import {FullCalendarModule} from "@fullcalendar/angular";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApprenantsComponent,
    FormateursComponent,
    FormationsComponent,
    FooterComponent,
    ProfileAppComponent,
    ChapitreComponent,
    ChapitrComponent,
    ProfileFormateurComponent,
    SidebarComponent,
    HeaderComponent,
    FomationContenuComponent,
    PdfComponent,
    ImageComponent,
    VideoComponent,
    AffectAppComponent,
    ApprenantsPipe,
    FormateurPipe,
    CategoriePipe,
    FormationPipe,
    ChapitrePipe,
    LoginComponent,
    PlanningComponent,
    RoomPipe,
    RoomComponent,
    DashbordComponent,
    CountMonthComponent,
    CountmonthFormationComponent,
    VisioformateurComponent,
    StatapprComponent,
    StatformComponent,
    StatappformationComponent,
    StatappvisioComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule, HammerModule, IgxCalendarModule, BrowserModule,

    CalendarModule,

    IgxDialogModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,


    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    AngularFileUploaderModule,
    DragDropModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    FullCalendarModule,

    ToastrModule.forRoot(),
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    NgSelectModule,
    MatDatepickerModule, MatMomentDateModule,

    SchedulerModule.forRoot({locale: 'en', headerDateFormat: 'daysRange'}), FullCalendarModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
