import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';


const routes: Routes = [
  { path: "home", component: HomeComponent,
    children: [
    {
      path: "login", // child route path
      component: LoginComponent, // child route component that the router renders
    }]
  },
  { path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
