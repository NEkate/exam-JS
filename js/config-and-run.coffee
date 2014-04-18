require.config
    baseUrl: 'js/'
    paths:
        jquery: 'lib/jquery/dist/jquery.min'
        "jquery-ui": 'lib/jquery-ui/ui/jquery-ui'
        semantic: 'lib/semantic/build/packaged/javascript/semantic.min'
        knockout: 'lib/knockout/knockout.min'

    shim:
        jquery:
            exports: 'jQuery'
        "jquery-ui":
            deps: ['jquery']
            exports: 'jQuery'
        semantic:
            deps: ['jquery']
            exports: 'jQuery'
        knockout:
            exports: 'ko'

require ['app']
