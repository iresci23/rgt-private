(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/project-list"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/List.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/List.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ag_grid_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ag-grid-vue */ "./node_modules/ag-grid-vue/main.js");
/* harmony import */ var ag_grid_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ag_grid_vue__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      columnDefs: null,
      rowData: null,
      state: 'Active',
      keyword: null,
      dotOptions: ['Edit', 'Delete', 'Archive']
    };
  },
  components: {
    AgGridVue: ag_grid_vue__WEBPACK_IMPORTED_MODULE_0__["AgGridVue"],
    'modal-confirm': __webpack_require__(/*! ../helpers/ModalConfirm.vue */ "./resources/assets/js/components/helpers/ModalConfirm.vue")["default"]
  },
  beforeMount: function beforeMount() {
    this.columnDefs = [{
      headerName: 'Project Name',
      field: 'name',
      sortable: true,
      cellRenderer: function cellRenderer(params) {
        return "<span class=\"flex-grow-1 project-name\"><a href=\"".concat(route('Project.sales', params.data.id), "\">").concat(params.value, "</a></span>");
      }
    }, {
      headerName: 'Project Type',
      field: 'type.name',
      sortable: true,
      hide: window.innerWidth < 768
    }, {
      headerName: 'Date Created',
      field: 'created_at',
      sortable: true,
      hide: window.innerWidth < 768
    }, {
      headerName: '',
      field: 'id',
      width: 30,
      valueGetter: function valueGetter(params) {
        return '';
      },
      cellRenderer: function cellRenderer(params) {
        return "<div class=\"dot-wrapper hidden\" id=\"dot-wrapper-".concat(params.data.id, "\">\n                                <span class=\"material-icons icon-more-vertical dot-btn\" data-id=\"").concat(params.data.id, "\">more_vert</span>\n                             </div>");
      }
    }];
    this.rowClassRules = {
      'active-row': 'data.state == "Active"',
      'archived-row': 'data.state == "Archived"',
      'deleted-row': 'data.state == "Deleted"'
    };
    this.getList();
  },
  mounted: function mounted() {
    var self = this;
    self.$EventDispatcher.listen('onProjectSave', function () {
      self.getList();
    });
    /** Bind click to close the context menu */

    $(document).bind('click', function (e) {
      if ($('#context-menu-items').is(":visible")) {
        /** the context menu is visible, so we close it when user clicks outside of it */
        if (!$(e.target).is('#context-menu-items') && !$(e.target).is('.dot-btn')) {
          self.hideContextMenu();
        }
      }
    });
  },
  methods: {
    getList: function getList() {
      var _this = this;

      this.hideContextMenu();
      this.$notify.message('Loading...');
      this.$API.Project.all({
        state: this.state,
        keyword: this.keyword
      }).then(function (res) {
        _this.rowData = res.data;
      })["catch"](function (error) {
        self.errors = error.response.data.errors;
      });
    },
    onGridReady: function onGridReady(e) {
      e.api.sizeColumnsToFit();
    },
    getRowClass: function getRowClass(params) {
      return params.data.state;
    },

    /** Show dot icon when a cell / row is hovered */
    cellMouseOver: function cellMouseOver(params) {
      var rowId = params.data.id;
      var rowName = params.data.name;
      var dotElement = $('div#dot-wrapper-' + rowId);

      if (params.data.state == 'Deleted') {
        this.dotOptions = ['Restore'];
      } else if (params.data.state == 'Archived') {
        this.dotOptions = ['Delete', 'Unarchive'];
      } else {
        this.dotOptions = ['Edit', 'Delete', 'Archive'];
      }
      /** Show the dot wrapper */


      dotElement.removeClass('hidden');
      /** Show the context menu when dot is clicked */

      $('.dot-btn').unbind('click').bind('click', function (e) {
        console.log("button offset", e.target.getBoundingClientRect());
        var offset = e.target.getBoundingClientRect();
        $('#context-menu-items').attr('data-id', rowId);
        $('#context-menu-items').find('li').attr("data-id", rowId);
        $('#context-menu-items').find('li').attr("data-name", rowName);

        if (window.innerWidth <= 768) {
          alert("Todo: display context menu as popup in mobile "); // $('#context-menu-items').css({ 
          //     top: offset.top,
          //     right: 80,
          //     position: 'absolute',
          //     display: 'block'
          // });
        } else {
          $('#context-menu-items').css({
            top: offset.top - 200,
            right: 220,
            position: 'absolute',
            display: 'block'
          });
        }
      });
    },

    /** Remove the dot btn */
    cellMouseOut: function cellMouseOut(params) {
      $('div.dot-wrapper').removeClass('hidden').addClass('hidden');
    },

    /** Actions for the context menu */
    doRowAction: function doRowAction(e, action) {
      this.hideContextMenu();
      var rowId = $(e.target).attr('data-id');
      var rowName = $(e.target).attr('data-name');

      if (action != 'Edit') {
        /** Show confirm modal */
        this.$refs['refModalConfirm'].set({
          title: "Confirm ".concat(action),
          html: "Are you sure you want to ".concat(action.toLowerCase(), " <b>").concat(rowName, "</b>?"),
          confirmButtonText: action
        }, {
          id: rowId,
          action: action
        }).open();
      } else {
        /** Show edit form */
        this.$root.$refs.refProjectForm.set(rowId).open();
      }
    },
    hideContextMenu: function hideContextMenu() {
      $('#context-menu-items').hide();
    },

    /** Perform logic after confirming action from the modal */
    onModalConfirm: function onModalConfirm(item) {
      var _this2 = this;

      if (item.action == 'Delete') {
        this.$API.Helper.deleteRows('projects', [item.id]).then(function (res) {
          _this2.getList();
        });
      } else if (item.action == 'Archive') {
        this.$API.Helper.archiveRows('projects', [item.id]).then(function (res) {
          _this2.getList();
        });
      } else if (item.action == 'Restore') {
        this.$API.Helper.restoreRow('projects', item.id, 'deleted').then(function (res) {
          _this2.getList();
        });
      } else if (item.action == 'Unarchive') {
        this.$API.Helper.restoreRow('projects', item.id, 'archived').then(function (res) {
          _this2.getList();
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/List.vue?vue&type=template&id=451681a8&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/List.vue?vue&type=template&id=451681a8& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "grid-table" },
    [
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-sm-12 col-md-8" },
          [
            _c("ui-radio-group", {
              staticClass: "toggle-radio-group",
              attrs: {
                name: "statefilter",
                options: ["Active", "Archived", "Deleted"]
              },
              on: { change: _vm.getList },
              model: {
                value: _vm.state,
                callback: function($$v) {
                  _vm.state = $$v
                },
                expression: "state"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-sm-12 col-md-4" },
          [
            _c("ui-textbox", {
              attrs: { icon: "search", placeholder: "Search" },
              on: { "keydown-enter": _vm.getList },
              model: {
                value: _vm.keyword,
                callback: function($$v) {
                  _vm.keyword = $$v
                },
                expression: "keyword"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-sm-12" },
          [
            _c("ag-grid-vue", {
              staticClass: "ag-theme-alpine",
              staticStyle: { width: "100%", height: "100%" },
              attrs: {
                columnDefs: _vm.columnDefs,
                rowData: _vm.rowData,
                rowClassRules: _vm.rowClassRules,
                domLayout: "autoHeight"
              },
              on: {
                gridReady: _vm.onGridReady,
                cellMouseOver: _vm.cellMouseOver,
                cellMouseOut: _vm.cellMouseOut
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "context-menu-wrapper",
                staticStyle: { display: "none" },
                attrs: { id: "context-menu-items" }
              },
              [
                _c("div", { staticClass: "context-menu" }, [
                  _c(
                    "ul",
                    _vm._l(_vm.dotOptions, function(opt, idx) {
                      return _c(
                        "li",
                        {
                          key: idx,
                          on: {
                            click: function($event) {
                              return _vm.doRowAction($event, opt)
                            }
                          }
                        },
                        [_vm._v(_vm._s(opt))]
                      )
                    }),
                    0
                  )
                ])
              ]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("modal-confirm", {
        ref: "refModalConfirm",
        attrs: { name: "modalConfirm" },
        on: { confirm: _vm.onModalConfirm }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/components/projects/List.vue":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/projects/List.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _List_vue_vue_type_template_id_451681a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.vue?vue&type=template&id=451681a8& */ "./resources/assets/js/components/projects/List.vue?vue&type=template&id=451681a8&");
/* harmony import */ var _List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/List.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _List_vue_vue_type_template_id_451681a8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _List_vue_vue_type_template_id_451681a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/List.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/List.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/projects/List.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./List.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/List.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/List.vue?vue&type=template&id=451681a8&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/List.vue?vue&type=template&id=451681a8& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_451681a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./List.vue?vue&type=template&id=451681a8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/List.vue?vue&type=template&id=451681a8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_451681a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_451681a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);