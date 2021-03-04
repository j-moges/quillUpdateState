import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill'
import { AppContainerComponent } from './app-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store} from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { reducer } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
// import { ComponentsModule } from './app.index.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([AppEffects]),
    // ComponentsModule
  ],
  providers: [],
  bootstrap: [/*AppComponent*/ AppContainerComponent]
})
export class AppModule { }
