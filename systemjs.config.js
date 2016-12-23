(function (global) {
    var config = {
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            // other libraries
            'angularfire2':               'npm:angularfire2/bundles/angularFire2.umd.js',
            'firebase':                   'npm:angularfire2/node_modules/firebase/firebase.js',
            'moment':                     'npm:moment/moment.js',
            'rxjs':                       'npm:rxjs',
            
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            model: {
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
        }
    };

    System.config(config);
})(this);