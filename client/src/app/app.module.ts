import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NavbarModule } from './modules/navbar/navbar.module';


@NgModule( {
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		NavbarModule,
		BrowserAnimationsModule,
		// FontAwesomeModule,
	],
	providers: [],
	bootstrap: [ AppComponent ],
} )
export class AppModule { }
