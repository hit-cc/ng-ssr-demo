import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { MetaService } from './services/meta/meta.service';
import * as $ from 'jquery';
import { filter, map, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-ssr-demo';
  features: any = [];
  baseUrl = environment.baseUrl;
  private un_sub$ = new Subject();
  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private metaService: MetaService,
    private activatedRoute: ActivatedRoute
  ) {
    this.setPageWiseTitle();
    this.setCanonicalUrl();
  }

  ngOnInit() {
    /** Load static script file form assets and set <script> tag in header */
    this.loadStaticScript('assets/js/test.js');

    /** read static seo data and set to meta tag*/
    this.getSeoData();

    /**
     * COMMENT CODE :- #001
     * Added static Meta tags and title for testing perpose
     */
    // this.titleService.setTitle(
    //   'this is title of your app'
    // );
    // this.meta.addTag({
    //   name: 'angular ssr demo v13',
    //   content: 'dummy content is here',
    // });
    // this.meta.updateTag({
    //   name: 'description',
    //   content:
    //     'Created this app on date of dec-06-2021 for testing purpose' +
    //     'It applies Routing, Lazy loading, Server side rendering and Progressive Web App (PWA)',
    // });
  }

  /**
   *  this method use for load scripts,
   *  generate element and append of head section
   */
  loadStaticScript(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = name;
      s.async = false;
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }

  /**
   * get data from seo_data.json file
   * generate script tags on header,body and footer.
   *
   */
  async getSeoData() {
    await this.metaService
      .getSEOData()
      .pipe(takeUntil(this.un_sub$))
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          data.forEach((element: any) => {
            if (
              element.title.toLowerCase() === '1st title' &&
              element?.content
            ) {
              $('head').append(element?.content || '');
            }
            if (
              element.title.toLowerCase() === '2nd title' &&
              element?.content
            ) {
              $('body').prepend(element?.content || '');
            }

            if (
              element.title.toLowerCase() === '3rd title' &&
              element?.content
            ) {
              $('body').append(element?.content || '');
            }
          });
        }
      }),
      (error: any) => {
        console.error(error);
      };
  }

  /**
   * This method set dynamic title
   * get title from routes
   * must set title on define routes like this..
   * {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
          discription: 'Home Page',
        },
      },
   */
  setPageWiseTitle() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.titleService.setTitle(data + '- ANGULAR SSR DEMO');
        }
      });
  }

  /**
   * set canonical url for crowling
   */
  setCanonicalUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.metaService.setCanonicalUrl(
          this.baseUrl + (event.url == '/' ? '' : event.url)
        );
      }
    });
  }

  ngOnDistroy() {
    this.un_sub$.complete();
  }
}
