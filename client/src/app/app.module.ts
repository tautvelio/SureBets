import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {BetsService} from './services/bets.service';
import {BasketballBetsService} from './services/basketball-bets.service';
import {HockeyBetsService} from './services/hockey-bets.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FootballComponent } from './components/football/football.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BasketballComponent } from './components/basketball/basketball.component';
import { HockeyComponent } from './components/hockey/hockey.component';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'football', component: FootballComponent, canActivate:[AuthGuard]},
  {path:'basketball', component: BasketballComponent, canActivate:[AuthGuard]},
  {path:'hockey', component: HockeyComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    FootballComponent,
    BasketballComponent,
    HockeyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ReactiveFormsModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, BetsService, BasketballBetsService, HockeyBetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
