import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./core/login/login.component";
import { MfaCodeComponent } from "./core/login/mfa-code/mfa-code.component";
import { MfaQrComponent } from "./core/login/mfa-qr/mfa-qr.component";
import { PasswordResetComponent } from "./core/login/password-reset/password-reset.component";
import { AuthService } from "./core/services/auth.service";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidebarItemComponent } from './core/sidebar/sidebar-item/sidebar-item.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { LoginStartComponent } from './core/login/login-start/login-start.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginModalComponent } from './core/login/login-modal/login-modal.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		PasswordResetComponent,
		MfaCodeComponent,
		MfaQrComponent,
		SidebarItemComponent,
		SidebarComponent,
		ToolbarComponent,
		LoginStartComponent,
		LoginModalComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		MatDialogModule,
		MatInputModule,
		FormsModule,
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
