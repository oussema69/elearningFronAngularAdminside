import { NgModule } from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ApprenantsComponent} from "./components/apprenants/apprenants.component";
import {FormateursComponent} from "./components/formateurs/formateurs.component";
import {FormationsComponent} from "./components/formations/formations.component";
import { ProfileAppComponent } from './components/profile-app/profile-app.component';
import {ChapitreComponent} from "./components/chapitre/chapitre.component";
import { ProfileFormateurComponent } from './components/profile-formateur/profile-formateur.component';
import {FomationContenuComponent} from "./components/fomation-contenu/fomation-contenu.component";
import {PdfComponent} from "./components/pdf/pdf.component";
import {VideoComponent} from "./components/video/video.component";
import {ImageComponent} from "./components/image/image.component";
import {LoginComponent} from "./components/login/login.component";
import {GardGuard} from "./gard/gard.guard";
import {PlanningComponent} from "./components/planning/planning.component";
import {DashbordComponent} from "./components/dashbord/dashbord.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path:'home', component: HomeComponent, children:[
  {path:'app',component: ApprenantsComponent},
      {path:'comptApp/:id',component:  ProfileAppComponent},

  {path:'form',component: FormateursComponent},
  {path:'formation',component: FormationsComponent},
  {path:'planning',component: PlanningComponent},
      {path:'dash',component: DashbordComponent  },

  {path:'profile/:id',component:  ProfileFormateurComponent},
  {path:'ch/:id',component: ChapitreComponent  },
  {path:'formc/:id',component: FomationContenuComponent  },
  {path:'pdf/:file',component: PdfComponent  },
  {path:'video/:file',component: VideoComponent },
  {path:'img/:file',component: ImageComponent  },
],canActivate: [GardGuard]},
  {path:'login',component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
