import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  isBrowser: boolean;
  base_url = environment.baseUrl
  seo_codeblock_url = "url"
  constructor(@Inject(PLATFORM_ID) private platformId: any,private http:HttpClient) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  checkIsBrowser() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    return this.isBrowser;
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scroll(0, 0);
    }
  }
  
}
