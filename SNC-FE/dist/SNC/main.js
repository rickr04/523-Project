(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/home/home.component */ "./src/components/home/home.component.ts");
/* harmony import */ var _components_account_account_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/account/account.component */ "./src/components/account/account.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/login/login.component */ "./src/components/login/login.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @components/register/register.component */ "./src/components/register/register.component.ts");
/* harmony import */ var _components_pci_pci_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @components/pci/pci.component */ "./src/components/pci/pci.component.ts");








var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__["Home"] },
    { path: 'login', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_5__["Login"] },
    { path: 'register', component: _components_register_register_component__WEBPACK_IMPORTED_MODULE_6__["Register"] },
    { path: 'account', component: _components_account_account_component__WEBPACK_IMPORTED_MODULE_4__["Account"] },
    { path: 'pci', component: _components_pci_pci_component__WEBPACK_IMPORTED_MODULE_7__["Pci"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'SNC';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @components/home/home.component */ "./src/components/home/home.component.ts");
/* harmony import */ var _components_account_account_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @components/account/account.component */ "./src/components/account/account.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @components/login/login.component */ "./src/components/login/login.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @components/register/register.component */ "./src/components/register/register.component.ts");
/* harmony import */ var _components_pci_pci_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @components/pci/pci.component */ "./src/components/pci/pci.component.ts");
/* harmony import */ var _components_demo_demo_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @components/demo/demo.component */ "./src/components/demo/demo.component.ts");














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_8__["Home"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_10__["Login"],
                _components_register_register_component__WEBPACK_IMPORTED_MODULE_11__["Register"],
                _components_pci_pci_component__WEBPACK_IMPORTED_MODULE_12__["Pci"],
                _components_account_account_component__WEBPACK_IMPORTED_MODULE_9__["Account"],
                _components_demo_demo_component__WEBPACK_IMPORTED_MODULE_13__["Demo"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            ],
            providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_6__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_6__["HashLocationStrategy"] }],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/components/account/account.component.html":
/*!*******************************************************!*\
  !*** ./src/components/account/account.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12 d-flex ml-auto  justify-content-center\">\n      acccount\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/components/account/account.component.ts":
/*!*****************************************************!*\
  !*** ./src/components/account/account.component.ts ***!
  \*****************************************************/
/*! exports provided: Account */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Account", function() { return Account; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_test_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/test.service */ "./src/services/test.service.ts");



//import { LaserCutterService } from '@services/lasercutter.service';
var Account = /** @class */ (function () {
    function Account() {
    }
    Account.prototype.ngOnInit = function () {
    };
    Account = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'account-root',
            template: __webpack_require__(/*! ./account.component.html */ "./src/components/account/account.component.html"),
            providers: [_services_test_service__WEBPACK_IMPORTED_MODULE_2__["TestService"]],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Account);
    return Account;
}());



/***/ }),

/***/ "./src/components/demo/demo.component.html":
/*!*************************************************!*\
  !*** ./src/components/demo/demo.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12 d-flex ml-auto  justify-content-center\">\n      <div class=\" align-items-center\">\n\n        <div *ngIf=\"get == false && create == false; else elseBlock\">\n          <button type=\"button\" (click)=\"createState()\" class=\"btn-lg btn-outline-primary\">Fill Out Form</button>\n          <button type=\"button\" (click)=\"getState()\" class=\"btn-lg btn-outline-success\">Get Form</button>\n        </div>\n\n        <ng-template #elseBlock>\n          <button type=\"button\" (click)=\"goBack()\" class=\"btn-lg btn-outline-primary\">Go Back</button>\n          <div *ngIf=\"get == false && create == true\">\n\n            <form [formGroup]=\"skeleForm\" layout-align=\"center center\" class=\"card text-center justify-content-center\" (ngSubmit)=\"onSubmit()\">\n              <h2 class=\"card-header  text-center\">\n                Add Patron To Queue\n              </h2>\n              <div class=\"form-group card-body text-center justify-content-center\">\n\n                <input type=\"text\" formControlName=\"c73424df44fb900174f5720\" placeholder=\"What is your name?\"  class=\"form-control form-control-lg\" />\n                <div *ngIf=\"f.c73424df44fb900174f5720.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.c73424df44fb900174f5720.errors.required\">Answer is required</div>\n                </div>\n\n                <input type=\"text\" formControlName=\"c73424df44fb900174f5721\" placeholder=\"What is today's date?\" class=\"form-control form-control-lg\" />\n                <div *ngIf=\"f.c73424df44fb900174f5721.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.c73424df44fb900174f5721.errors.required\">Answer is required</div>\n                </div>\n\n                <input type=\"text\" formControlName=\"c73424df44fb900174f5722\" placeholder=\"How are you today?\" class=\"form-control form-control-lg\" />\n                <div *ngIf=\"f.c73424df44fb900174f5722.errors\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f.c73424df44fb900174f5722.errors.required\">Answer is required</div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <button class=\"btn btn-primary\">Submit Form</button>\n              </div>\n            </form>\n\n          </div>\n          <div *ngIf=\"get == true && create == false\">\n            <div *ngFor=\"let key of keys; let i = index\">\n              <p>\n                <span><h2>{{i+1}}: </h2><button (click)=\"formHandle(key)\"> {{key}}</button></span>\n              </p>\n            </div>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/components/demo/demo.component.ts":
/*!***********************************************!*\
  !*** ./src/components/demo/demo.component.ts ***!
  \***********************************************/
/*! exports provided: Demo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Demo", function() { return Demo; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_test_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/test.service */ "./src/services/test.service.ts");





//import { LaserCutterService } from '@services/lasercutter.service';
var Demo = /** @class */ (function () {
    function Demo(router, formBuilder, skeleService
    //private home: Home,
    //private account: Account,
    ) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.skeleService = skeleService;
        this.create = false;
        this.get = false;
        this.questions = ["5c73424df44fb900174f5720", "5c73424df44fb900174f5712", "5c73424df44fb900174f5722"];
    }
    Demo.prototype.ngOnInit = function () {
        this.skeleForm = this.formBuilder.group({
            c73424df44fb900174f5720: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            c73424df44fb900174f5721: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            c73424df44fb900174f5722: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    Object.defineProperty(Demo.prototype, "f", {
        get: function () { return this.skeleForm.controls; },
        enumerable: true,
        configurable: true
    });
    Demo.prototype.createState = function () {
        this.create = true;
        this.get = false;
    };
    Demo.prototype.getState = function () {
        var _this = this;
        this.skeleService.getKeys().subscribe(function (data) {
            _this.keys = data.Keys, _this.create = false,
                _this.get = true;
        });
    };
    Demo.prototype.goBack = function () {
        this.create = false;
        this.get = false;
    };
    Demo.prototype.formHandle = function (key) {
        this.skeleService.getForm(key).subscribe(function (data) {
            var newBlob = new Blob([data], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(newBlob);
            console.log(fileURL);
            window.open(fileURL);
        });
    };
    Demo.prototype.onSubmit = function () {
        var _this = this;
        this.skeleService.writePDF({ answers: this.skeleForm.value, folder: "DEMO", name: "test" }).subscribe(function (data) {
            _this.fileURL = data.msg,
                console.log(_this.fileURL);
        });
    };
    Demo = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'demo-root',
            template: __webpack_require__(/*! ./demo.component.html */ "./src/components/demo/demo.component.html"),
            providers: [_services_test_service__WEBPACK_IMPORTED_MODULE_4__["TestService"]],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_test_service__WEBPACK_IMPORTED_MODULE_4__["TestService"]
            //private home: Home,
            //private account: Account,
        ])
    ], Demo);
    return Demo;
}());



/***/ }),

/***/ "./src/components/home/home.component.html":
/*!*************************************************!*\
  !*** ./src/components/home/home.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12 d-flex ml-auto  justify-content-center\">\n    home\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/components/home/home.component.ts":
/*!***********************************************!*\
  !*** ./src/components/home/home.component.ts ***!
  \***********************************************/
/*! exports provided: Home */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_test_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/test.service */ "./src/services/test.service.ts");



//import { LaserCutterService } from '@services/lasercutter.service';
var Home = /** @class */ (function () {
    function Home() {
    }
    Home.prototype.ngOnInit = function () {
    };
    Home = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'home-root',
            template: __webpack_require__(/*! ./home.component.html */ "./src/components/home/home.component.html"),
            providers: [_services_test_service__WEBPACK_IMPORTED_MODULE_2__["TestService"]],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Home);
    return Home;
}());



/***/ }),

/***/ "./src/components/login/login.component.html":
/*!***************************************************!*\
  !*** ./src/components/login/login.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12 d-flex ml-auto  justify-content-center\">\n      login\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/components/login/login.component.ts":
/*!*************************************************!*\
  !*** ./src/components/login/login.component.ts ***!
  \*************************************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_test_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/test.service */ "./src/services/test.service.ts");



//import { LaserCutterService } from '@services/lasercutter.service';
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.prototype.ngOnInit = function () {
    };
    Login = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'login-root',
            template: __webpack_require__(/*! ./login.component.html */ "./src/components/login/login.component.html"),
            providers: [_services_test_service__WEBPACK_IMPORTED_MODULE_2__["TestService"]],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Login);
    return Login;
}());



/***/ }),

/***/ "./src/components/pci/pci.component.html":
/*!***********************************************!*\
  !*** ./src/components/pci/pci.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12 d-flex ml-auto  justify-content-center\">\n      pci\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/components/pci/pci.component.ts":
/*!*********************************************!*\
  !*** ./src/components/pci/pci.component.ts ***!
  \*********************************************/
/*! exports provided: Pci */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pci", function() { return Pci; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_test_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/test.service */ "./src/services/test.service.ts");



//import { LaserCutterService } from '@services/lasercutter.service';
var Pci = /** @class */ (function () {
    function Pci() {
    }
    Pci.prototype.ngOnInit = function () {
    };
    Pci = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'pci-root',
            template: __webpack_require__(/*! ./pci.component.html */ "./src/components/pci/pci.component.html"),
            providers: [_services_test_service__WEBPACK_IMPORTED_MODULE_2__["TestService"]],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Pci);
    return Pci;
}());



/***/ }),

/***/ "./src/components/register/register.component.html":
/*!*********************************************************!*\
  !*** ./src/components/register/register.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12 d-flex ml-auto  justify-content-center\">\n      register\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/components/register/register.component.ts":
/*!*******************************************************!*\
  !*** ./src/components/register/register.component.ts ***!
  \*******************************************************/
/*! exports provided: Register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_test_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/test.service */ "./src/services/test.service.ts");



//import { LaserCutterService } from '@services/lasercutter.service';
var Register = /** @class */ (function () {
    function Register() {
    }
    Register.prototype.ngOnInit = function () {
    };
    Register = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'register-root',
            template: __webpack_require__(/*! ./register.component.html */ "./src/components/register/register.component.html"),
            providers: [_services_test_service__WEBPACK_IMPORTED_MODULE_2__["TestService"]],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Register);
    return Register;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/services/test.service.ts":
/*!**************************************!*\
  !*** ./src/services/test.service.ts ***!
  \**************************************/
/*! exports provided: TestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestService", function() { return TestService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var TestService = /** @class */ (function () {
    function TestService(http) {
        this.http = http;
        // _url: string = "https://security-n-compliance.herokuapp.com"
        this._url = "http://localhost:3000";
    }
    TestService.prototype.updateAnswers = function (_id, answer) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'Content-Type: application/json' });
        return this.http.put(this._url + "/api/demo/" + _id, { Answer: answer });
    };
    TestService.prototype.writePDF = function (template) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'Content-Type: application/json' });
        return this.http.post(this._url + "/api/demo/12345/answerquestion", template);
    };
    ;
    TestService.prototype.sendPDF = function (stream) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'Content-Type: application/json' });
        return this.http.post(this._url + "/api/demo/upload", stream);
    };
    TestService.prototype.getKeys = function () {
        return this.http.get(this._url + '/api/demo/DEMO/getkeys');
    };
    TestService.prototype.getForm = function (key) {
        return this.http.post(this._url + '/api/demo/getform', { Key: key }, { responseType: 'arraybuffer' });
    };
    TestService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TestService);
    return TestService;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/c/Users/Mark/Desktop/Code/523-Project/SNC-FE/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map