import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { DataService } from './data.service';
import { LocationComponent } from './location/location.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DetailComponent } from './detail/detail.component';
import { SelectAreaComponent } from './select-area/select-area.component';
import { InvestmentComponent } from './investment/investment.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NavComponent } from './nav/nav.component';
import { PredictService } from './predict.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'location', component: LocationComponent, canActivate: [AuthGuardService] },
  { path: 'selectArea', component: SelectAreaComponent, canActivate: [AuthGuardService] },
  { path: 'detail', component: DetailComponent, canActivate: [AuthGuardService] },
  { path: 'investment', component: InvestmentComponent, canActivate: [AuthGuardService] },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    LocationComponent,
    WelcomeComponent,
    DetailComponent,
    SelectAreaComponent,
    InvestmentComponent,
    PortfolioComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    DataService,
    PredictService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
