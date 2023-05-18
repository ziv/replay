import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ActionsComponent} from './actions/actions.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [AppComponent, ActionsComponent, StatusComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
