import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { PagesModule } from './pages/pages.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login'
import { environment } from 'src/environments/environment'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        CoreModule,
        PagesModule,
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: true,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            environment.gCloud.clientId,
                            {
                                scope: 'email',
                                plugin_name: environment.gCloud.projectName
                            }
                        )
                    }
                ],
                onError: (err) => {
                    console.error(err)
                }
            } as SocialAuthServiceConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
