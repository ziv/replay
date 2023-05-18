import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReplayModule } from '../../../xpr/replay/src/lib/replay.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReplayModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
