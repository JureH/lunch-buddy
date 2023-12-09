import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ChoicesListComponent } from './shared/components/choices-list/choices-list.component';
import { FrameworkComponent } from './shared/components/framework/framework.component';
import { RestaurantListComponent } from './shared/components/restaurant-list/restaurant-list.component';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './shared/components/map/map.component';
import { ChatComponent } from './shared/components/chat/chat.component';
import { AddRestaurantComponent } from './shared/components/add-restaurant/add-restaurant.component';
import { RestaurantDetailsComponent } from './shared/components/restaurant-details/restaurant-details.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DetailsPageComponent } from './shared/components/details-page/details-page.component';
import { StarsComponent } from './shared/components/stars/stars.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { MostRecentFirstPipe } from './shared/pipes/most-recent-first.pipe';
import { SortByCountPipe } from './shared/pipes/sort-by-count.pipe'; 

//Choices List
@NgModule({
  declarations: [
    ChoicesListComponent,
    FrameworkComponent, 
    RestaurantListComponent, 
    HomepageComponent, 
    HeaderComponent, 
    LoginComponent, 
    RegistrationComponent, 
    MapComponent, 
    ChatComponent, 
    AddRestaurantComponent, 
    RestaurantDetailsComponent, 
    SidebarComponent, 
    DetailsPageComponent, 
    StarsComponent, 
    MostRecentFirstPipe, 
    SortByCountPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    LeafletModule,
    ModalModule
  ],
  providers: [BsModalService],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }

