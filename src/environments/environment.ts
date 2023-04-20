// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  recaptcha: {
    siteKey: '6LcYrbIjAAAAAGFrOnLbm3ivYQB_oDcyCR9EV4Ae',
    secretKey: '6LcYrbIjAAAAAAP0KzzbfAqCOsNZClJLVHrq1Q5v',
    linkSetup: 'https://www.google.com/recaptcha/admin/site/598912280/setup'
  },
  oauth: {
    clientID: '2',
    clientSecret: 'Da8W4OFBxhfZF3QkOuSGlQgDheBtEQLpF3FaByeY'
  },
  domain: {
    localDomain: 'http://authca.localdomain'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
