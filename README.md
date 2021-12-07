# Angular SSR Demo APP

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## STEPS TO ADD ANGULAR UNIVERSAL
## Step - 1
add angular universal -- ng add @nguniversal/express-engine [ng add @nguniversal/express-engine](https://angular.io/guide/universal)

## Step - 2 Run 
:- Dynamic SSR
npm run build:ssr && npm run serve:ssr

:- Static Pre-Rendering
npm run prerender && npm run serve:ssr

## Step - 3 Sitemap
We have created the following files

1-robots.txt -- [Create a robots.txt file](https://developers.google.com/search/docs/advanced/robots/create-robots-txt)
    - A robots.txt file tells search engine crawlers which URLs the crawler can access on your site. This is used mainly to avoid overloading your site with requests; it is not a mechanism for keeping a web page out of Google. To keep a web page out of Google, [block indexing with noindex](https://developers.google.com/search/docs/advanced/crawling/block-indexing) or password-protect the page.

2-sitemap.xml
    - The sitemap.xml file can be obtained by going to the sitemap generation site [https://www.xml-sitemaps.com](https://www.xml-sitemaps.com)
    - add your site url and generate xml file copy data on your sitemap.xml content.

## Step - 4 .htaccess
    - add .htaccess file on root folder of your project for set routing rules

## Step - 5 SEO
    - We used the Meta service provided by angular to use and add meta tags.
    - open your app.component.ts file OR what ever you created for root access component home.component.ts etc..
    - use meta service, in this demo you can check COMMENT CODE :- #001 in app.component.ts trying to set static meta
    - check src/app/services/meta/meta.service.ts there is two method for set Canonical Url and for read static meta data from json file
    - you can create API for dynamic meta data and create method in service.

## Step - 6 Replace Production URL https://your_url
    - search http://localhost:4200 in your global project and replace localhost url to your domain


## Deployment
    - used [glitch](https://glitch.com/) to deploy my app free for testing perpose
    - on push code in git automatically generate build and deploy

## glitch