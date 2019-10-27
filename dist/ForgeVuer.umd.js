(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('C:UsersGeirDocumentsGitHubSimplifyorge-vuer
ode_modulesollup-plugin-vueuntime
ormalize.js'), require('C:UsersGeirDocumentsGitHubSimplifyorge-vuer
ode_modulesollup-plugin-vueuntimerowser.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'C:UsersGeirDocumentsGitHubSimplifyorge-vuer
ode_modulesollup-plugin-vueuntime
ormalize.js', 'C:UsersGeirDocumentsGitHubSimplifyorge-vuer
ode_modulesollup-plugin-vueuntimerowser.js'], factory) :
    (global = global || self, factory(global.ForgeVuer = {}, global.__vue_normalize__, global.__vue_create_injector__));
}(this, (function (exports, __vue_normalize__, __vue_create_injector__) { 'use strict';

    __vue_normalize__ = __vue_normalize__ && __vue_normalize__.hasOwnProperty('default') ? __vue_normalize__['default'] : __vue_normalize__;
    __vue_create_injector__ = __vue_create_injector__ && __vue_create_injector__.hasOwnProperty('default') ? __vue_create_injector__['default'] : __vue_create_injector__;

    /**
     *
     * @param {Object} autodeskViewing Autodesk.Viewing
     * @param {Object} customExtensions Custom extensions
     */
    var RegisterCustomExtensions = function (AutodeskViewing, customExtensions) {

        var extensionNames = Object.keys(customExtensions);

        var registeredExtensions = [];

        for (var i = 0; i < extensionNames.length; i++) {
            var name = extensionNames[i];

            // If extension already registered
            if(AutodeskViewing.theExtensionManager.getExtension(name) != null){
                registeredExtensions.push(name);
                continue;
            }

            var ExtensionCtor = customExtensions[name];

            var extended = new ExtensionCtor(AutodeskViewing);
            
            var result = AutodeskViewing.theExtensionManager.registerExtension(name, extended);
            if (result === true)
                { registeredExtensions.push(name); }

        }

        return registeredExtensions;

    };

    var VueToViewer3DEvent = function (eventName) {
        // Vuer component events should be the same as Viewer3D's,
        // but low cased and hypen insted of underscore
        return eventName.toUpperCase().replace(/-/g, '_');
    };

    var CreateEmitterFunction = function (vue, name) {
        return function () {
            var prop = [], len = arguments.length;
            while ( len-- ) prop[ len ] = arguments[ len ];

            var p = Object.assign.apply(Object, [ {} ].concat( prop ));
            delete p.target;
            delete p.type;
            vue.$emit(name, p);
        };
    };

    var EmitError = function (vue, error) {
        vue.$emit('error', error);
    };

    var GetEncodedURN = function (urn) {
        var encoded;

        if (urn.indexOf('adsk') != -1) {
            encoded = "urn:" + (btoa(urn));
        }
        else if (urn.indexOf('urn') == -1) {
            encoded = "urn:" + urn;
        }
        else {
            encoded = urn;
        }

        return encoded;
    };

    var Utils = {
        RegisterCustomExtensions: RegisterCustomExtensions,
        VueToViewer3DEvent: VueToViewer3DEvent,
        CreateEmitterFunction: CreateEmitterFunction,
        EmitError: EmitError,
        GetEncodedURN: GetEncodedURN,
    };

    var CustomEventNames = [
        'error',
        "documentLoading",
        "documentLoadError",
        "viewerStarted",
        "modelLoading",
        "modelLoaded",
        "modelLoadError" ];

    /**
     * Creates a new ViewerService object to handle viewer interaction
     * @param {Object} Autodesk Forge Viewer Autodesk SDK
     * @param {Object} VueInstance Vue Instance
     */
    var ViewerService = function (Autodesk, VueInstance) {

        // Autodesk Viewing object
        this.AutodeskViewing = Autodesk.Viewing;

        // Vue instance, store to be able to emit events
        this.VueInstance = VueInstance;

        // Events is an object storing the vue name of the event
        // and the function applied to Viewer3D, so it can be removed later on.
        this.Events = {};

        // Viewer3D instance
        this.Viewer3D = null;

        // Custom Extensions
        this.CustomExtensions;

        this.ViewerContainer;

        // Records the state of the ViewerService
        this.State = {
            initialized: false,
            headless: false,
            urn: '',
            svf: '',
            modelOptions: '',
        };

        // If any event, try to add it to the Viewer instance
        var events = Object.keys(this.VueInstance.$listeners);
        this.SetEvents(events);
    };

    /**
     * Initialize the a Viewer instance
     * @param {String} containerId Id of the DOM element to host the viewer
     * @param {Function} getTokenMethod Function to retrieve the token, which will execute a callback
     */
    ViewerService.prototype.LaunchViewer = async function (containerId, getTokenMethod, options, headless) {
        var this$1 = this;


        var viewerOptions = Object.assign({}, options, {
            getAccessToken: getTokenMethod
        });

        this.SetHeadless(headless);

        return new Promise(function (resolve, reject) {
            try {
                this$1.ViewerContainer = document.getElementById(containerId);
                this$1.AutodeskViewing.Initializer(viewerOptions, function () {
                    this$1.Initialize();
                    resolve(true);
                });

            } catch (error) {
                Utils.EmitError(this$1.VueInstance, error);
                reject(error);
            }
        })
    };

    ViewerService.prototype.Initialize = function () {
        this.State.initialized = true;

        if (typeof this.State.urn === 'string' && this.State.urn.trim().length > 0)
            { this.LoadDocument(this.State.urn); }
    };

    /**
     * Sets the CustomExtensions object.
     * @param {Object} extensions Object where keys will be the extensions names and values should be functions to initialize new extensions.
     */
    ViewerService.prototype.SetCustomExtensions = function (extensions) {
        if (Object.values(extensions).some(function (value) { return typeof (value) != 'function'; })) {
            throw new Error("Extensions should be an object where its values are valid extension functions.");
        }

        this.CustomExtensions = extensions;
    };

    /**
     * Determines if the ViewerService has any custom extensions
     * @return {Boolean} True if it has any custom extensions.
     */
    ViewerService.prototype.HasCustomExtensions = function () {
        return this.CustomExtensions != null && Object.keys(this.CustomExtensions).length > 0;
    };

    /**
     * Creates a new Viewer3DConfig with custom extensions, if any
     * @returns {Object} Viewer3DConfig
     */
    ViewerService.prototype.GetViewer3DConfig = function () {
        var config3d = {};

        if (this.HasCustomExtensions())
            { config3d['extensions'] = Utils.RegisterCustomExtensions(this.AutodeskViewing, this.CustomExtensions); }

        return config3d;
    };

    /**
     * Sets, from the VueInstance event names, an object where to later on store
     * emmiters for the corresponding ForgeViewer events.
     * @param {String[]} events All Vue instance event names.
     */
    ViewerService.prototype.SetEvents = function (events) {

        this.Events = events
            .filter(function (name) { return CustomEventNames.indexOf(name) == -1; })
            .reduce(function (acc, name) {
                acc[name] = null;
                return acc;
            }, {});

    };

    /**
     * Loads a document by a given urn. If the URN is not base64 encoded, but the id retrieved from the API,
     * it will try to encoded to base64.
     * https://forge.autodesk.com/en/docs/model-derivative/v2/tutorials/prepare-file-for-viewer
     */
    ViewerService.prototype.LoadDocument = function (urn) {

        this.State.urn = urn;

        if (this.State.initialized !== true)
            { return; }

        if (typeof urn !== 'string' || urn.trim().length <= 0) {
            if (this.Viewer3D != null) {
                this.Viewer3D.uninitialize();
                this.Viewer3D = null;
            }
            return;
        }

        var documentId = Utils.GetEncodedURN(urn);
        try {
            this.VueInstance.$emit('documentLoading');
            this.AutodeskViewing.Document.load(documentId, this.onDocumentLoadSuccess.bind(this), this.onDocumentLoadError.bind(this));
        } catch (error) {
            Utils.EmitError(this.VueInstance, error);
        }

    };

    /**
     * Register the View3D events according to those supplied by
     * the Vuer component
     */
    ViewerService.prototype.RegisterEvents = function () {

        var eventNames = Object.keys(this.Events);
        if (eventNames.length <= 0)
            { return; }

        for (var i = 0; i < eventNames.length; i++) {
            var vueEventName = eventNames[i];
            var viewerEventName = Utils.VueToViewer3DEvent(vueEventName);
            var eventType = this.AutodeskViewing[viewerEventName];

            if (eventType == null)
                { throw new Error(("Event '" + vueEventName + "' doesn't exist on Forge Viewer")); }

            var emitterFunction = Utils.CreateEmitterFunction(this.VueInstance, vueEventName);
            this.Events[vueEventName] = emitterFunction;

            this.Viewer3D.addEventListener(eventType, emitterFunction);
        }
    };

    ViewerService.prototype.SetHeadless = function (headless) {
        var currentHeadless = this.State.headless;
        this.State.headless = headless;

        if (currentHeadless !== headless && this.Viewer3D != null) {
            this.Viewer3D.uninitialize();
            this.Viewer3D = null;

            if (this.State.svf)
                { this.LoadModel(this.State.svf, this.State.modelOptions); }
        }
    };

    ViewerService.prototype.onDocumentLoadSuccess = function (doc) {

        var geometries = doc.getRoot().search({ 'type': 'geometry' });
        if (geometries.length === 0) {
            Utils.EmitError(this.VueInstance, new Error('Document contains no geometries.'));
            return;
        }

        // Load the chosen geometry
        var svf = doc.getViewablePath(geometries[0]);    var modelOptions = {
            sharedPropertyDbPath: doc.getFullPath(doc.getRoot().findPropertyDbPath())
        };

        this.LoadModel(svf, modelOptions);
    };

    ViewerService.prototype.GetViewerInstance = function (container, configuration, headless) {
        var config = this.GetViewer3DConfig();
        console.log(config);
        if (headless === true)
            { return new this.AutodeskViewing.Viewer3D(this.ViewerContainer, config); }

        return new this.AutodeskViewing.GuiViewer3D(this.ViewerContainer, config);
    };

    ViewerService.prototype.LoadModel = async function (svfURL, modelOptions) {

        // If Viewer3D is null, it needs to be created and started.
        if (this.Viewer3D == null) {
            this.Viewer3D = this.GetViewerInstance(this.ViewerContainer, this.GetViewer3DConfig(), this.State.headless);

            this.Viewer3D.start(svfURL, modelOptions, this.onModelLoaded.bind(this), this.onModelLoadError.bind(this));
            this.RegisterEvents();

            // Emitting Viewer3D Started event
            this.VueInstance.$emit('viewerStarted', this.Viewer3D);
        }
        else {
            this.Viewer3D.tearDown();
            this.Viewer3D.setUp();
            await this.Viewer3D.loadModel(svfURL, modelOptions, this.onModelLoaded.bind(this), this.onModelLoadError.bind(this));
        }

        this.VueInstance.$emit('modelLoading');
        this.State.svf = svfURL;
        this.State.modelOptions = modelOptions;
    };

    ViewerService.prototype.onDocumentLoadError = function (errorCode) {
        if (this.VueInstance.$listeners['documentLoadError'])
            { this.VueInstance.$emit('documentLoadError', errorCode); }
        else
            { Utils.EmitError(this.VueInstance, new Error('Failed to load document. Error Code: ' + errorCode)); }
    };

    ViewerService.prototype.onModelLoaded = function (item) {
        this.VueInstance.$emit('modelLoaded', item);
    };

    ViewerService.prototype.onModelLoadError = function (errorCode) {

        if (this.VueInstance.$listeners['modelLoadError'])
            { this.VueInstance.$emit('modelLoadError', errorCode); }
        else
            { Utils.EmitError(this.VueInstance, new Error('Failed to load model. Error Code: ' + errorCode)); }
    };

    //

    var script = {
        name: 'ForgeVuer',
        props:{

            id:{
                type: String,
                default: function(){
                    return 'forge-vuer'
                }
            },

            getAccessToken: {
                type: Function,
                required: true
            },

            urn:{
                type: String
            },

            options: {
                type: Object,
                default: function () {},
            },

            headless: {
                type: Boolean,
                default: false,
            },

            extensions:{
                type: Object
            },
        },

        watch: {
            urn: function(){
                this.viewerService.LoadDocument(this.urn);
            },

            headless: function(){
                this.viewerService.SetHeadless(this.headless);
            }
        },
        
        data: function data() {
            return {
                viewerService: null,
            }
        },
        mounted: async function(){

            // Retrieving Autodesk global object.
            if(!window.Autodesk)
                { throw new Error("Forge Viewer js missing. Make sure you add it on the HTML header"); }

            if(typeof this.getAccessToken !== 'function')
                { throw new Error("The 'getAccessToken' prop needs to be a function implementing a callback passing in the generated token and expire timeout in seconds."); }
            
            this.viewerService = new ViewerService(window.Autodesk, this);

            if(this.extensions && Object.keys(this.extensions).length > 0)
                { this.viewerService.SetCustomExtensions(this.extensions); }

            // Creating a new instance of the ViewerService
            await this.viewerService.LaunchViewer(this.id, this.getAccessToken, this.options, this.headless);

            // If a urn is supplied, load it to viewer;
            if(typeof this.urn === 'string' && this.urn.trim().length > 0)
                { this.viewerService.LoadDocument(this.urn); }
        },
        methods: {
            handleResize: function(){
                if(this.viewerService.Viewer3D != null)
                    { this.viewerService.Viewer3D.resize(); }
            }
        }
    };

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { staticClass: "forge-vuer-container" },
        [
          _c("div", {
            staticClass: "forge-vuer-viewer-display",
            attrs: { id: _vm.id },
            on: { resize: _vm.handleResize }
          }),
          _vm._v(" "),
          _vm._t("default")
        ],
        2
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = function (inject) {
        if (!inject) { return }
        inject("data-v-1c08c515_0", { source: "\n.forge-vuer-container{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\n}\n.forge-vuer-viewer-display{\r\n    height: 100%;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Geir\\Documents\\GitHub\\Simplify\\forge-vuer\\src\\ForgeVuer.vue"],"names":[],"mappings":";AA2FA;IACA,WAAA;IACA,YAAA;IACA,kBAAA;AACA;AAEA;IACA,YAAA;AACA","file":"ForgeVuer.vue","sourcesContent":["<template>\r\n    <div class=\"forge-vuer-container\" >\r\n        <div class=\"forge-vuer-viewer-display\" :id=\"id\" @resize=\"handleResize\"/>\r\n        <slot />\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nimport { ViewerService } from './services/ViewerService.js';\r\n\r\nexport default {\r\n    name: 'ForgeVuer',\r\n    props:{\r\n\r\n        id:{\r\n            type: String,\r\n            default: function(){\r\n                return 'forge-vuer'\r\n            }\r\n        },\r\n\r\n        getAccessToken: {\r\n            type: Function,\r\n            required: true\r\n        },\r\n\r\n        urn:{\r\n            type: String\r\n        },\r\n\r\n        options: {\r\n            type: Object,\r\n            default: () => {},\r\n        },\r\n\r\n        headless: {\r\n            type: Boolean,\r\n            default: false,\r\n        },\r\n\r\n        extensions:{\r\n            type: Object\r\n        },\r\n    },\r\n\r\n    watch: {\r\n        urn: function(){\r\n            this.viewerService.LoadDocument(this.urn);\r\n        },\r\n\r\n        headless: function(){\r\n            this.viewerService.SetHeadless(this.headless);\r\n        }\r\n    },\r\n    \r\n    data() {\r\n        return {\r\n            viewerService: null,\r\n        }\r\n    },\r\n    mounted: async function(){\r\n\r\n        // Retrieving Autodesk global object.\r\n        if(!window.Autodesk)\r\n            throw new Error(\"Forge Viewer js missing. Make sure you add it on the HTML header\");\r\n\r\n        if(typeof this.getAccessToken !== 'function')\r\n            throw new Error(`The 'getAccessToken' prop needs to be a function implementing a callback passing in the generated token and expire timeout in seconds.`);\r\n        \r\n        this.viewerService = new ViewerService(window.Autodesk, this);\r\n\r\n        if(this.extensions && Object.keys(this.extensions).length > 0)\r\n            this.viewerService.SetCustomExtensions(this.extensions);\r\n\r\n        // Creating a new instance of the ViewerService\r\n        await this.viewerService.LaunchViewer(this.id, this.getAccessToken, this.options, this.headless);\r\n\r\n        // If a urn is supplied, load it to viewer;\r\n        if(typeof this.urn === 'string' && this.urn.trim().length > 0)\r\n            this.viewerService.LoadDocument(this.urn);\r\n    },\r\n    methods: {\r\n        handleResize: function(){\r\n            if(this.viewerService.Viewer3D != null)\r\n                this.viewerService.Viewer3D.resize();\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style>\r\n.forge-vuer-container{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n.forge-vuer-viewer-display{\r\n    height: 100%;\r\n}\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = undefined;
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var component = __vue_normalize__(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        __vue_create_injector__,
        undefined,
        undefined
      );

    // Declare install function executed by Vue.use()
    function install(Vue) {
    	if (install.installed) { return; }
    	install.installed = true;
    	Vue.component('ForgeVuer', component);
    }

    // Create module definition for Vue.use()
    var plugin = {
    	install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
    	GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue = global.Vue;
    }
    if (GlobalVue) {
    	GlobalVue.use(plugin);
    }

    exports.default = component;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
