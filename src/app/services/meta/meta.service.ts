import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(
    @Inject(DOCUMENT) private dom: Document,
    private httpClient: HttpClient
  ) {}

  // set canonical url on every routes change
  setCanonicalUrl(url: string) {
    url = decodeURI(url);
    const head = this.dom.getElementsByTagName('head')[0];
    var element = this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
  }

  public getSEOData(): Observable<any> {
    return this.httpClient.get('./assets/json/seo_data.json');
  }
}
