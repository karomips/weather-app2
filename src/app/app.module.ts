import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrentDateComponent } from './current-date/current-date.component';
import { FutureService } from './service/future.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrentDateComponent,    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FutureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
