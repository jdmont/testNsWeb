import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProcessComponent } from './components/process/process.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ProcessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
