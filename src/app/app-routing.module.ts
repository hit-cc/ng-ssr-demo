import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { 
    path: '', redirectTo: 'home', pathMatch: 'full' 
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
      discription: 'Home Page',
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About Us',
      discription: 'About us Page',
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      title: 'Error',
      discription: '404 Page',
    },
  },
  {
    path:'**',redirectTo:'404',pathMatch:'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
