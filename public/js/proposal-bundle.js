(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/proposal-bundle"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/proposal/Page.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/proposal/Page.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  props: {
    id: {
      required: true
    },
    // project ID
    name: {
      required: false
    }
  },
  data: function data() {
    var self = this;
    return {
      questions: [],
      selected: null,
      loadingRight: false,
      loadingLeft: false
    };
  },
  beforeMount: function beforeMount() {
    var _this = this;

    this.$EventDispatcher.listen('onProposalTabLoad', function () {
      if (!route().current('Project.proposal')) {
        location.href = route('Project.proposal', _this.id);
      }
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    this.selected = null;

    if (route().current('Project.proposal')) {
      this.getQuestions();
    }

    this.$EventDispatcher.listen('onTimeCostTableDelete', function (keyId) {
      _this2.$notify.message("Deleting...");
      /** set the trigger_widget to null in order to delete the table */


      _this2.$API.Question.update(keyId, {
        trigger_widget: null
      }).then(function (res) {
        _this2.selected.trigger_widget = null;

        _this2.$notify.success("Table deleted!");
      });
    });
  },
  methods: {
    getQuestions: function getQuestions() {
      var _this3 = this;

      this.loadingLeft = true;
      this.selected = null;
      this.$API.Helper.getQuestions(this.id, 'proposal').then(function (res) {
        _this3.questions = res.data;
        _this3.loadingLeft = false; // select the first one in the list

        _this3.$nextTick(function () {
          if (_this3.questions[0]) {
            _this3.$refs['proposalList'].selectItem(_this3.questions[0]);
          }
        });
      });
    },
    onSelectItem: function onSelectItem(component) {
      var _this4 = this;

      this.loadingRight = true;
      this.selected = null;
      /** Remove the rich editor if it is widget only component */

      if (component.layout == 'widget-only' && window.editor && window.editor.state == 'ready') {
        window.editor.destroy()["catch"](function (error) {
          console.log(error);
        });
      }

      this.$nextTick(function () {
        _this4.selected = component;
        _this4.loadingRight = false;
      });
    },
    onAutoSave: function onAutoSave(data) {
      var _this5 = this;

      this.$notify.message('Saving...');
      this.$API.Helper.saveAnswer(this.id, data).then(function (res) {
        var index = _.findIndex(_this5.questions, ['id', data.key]);

        if (_this5.questions[index]) {
          Vue.set(_this5.questions[index], 'answer', res.data);
        }

        _this5.$notify.success('All changes are saved!');
      });
    },

    /**
     * Updates the sorting of the Components list
     */
    onDragListEnd: function onDragListEnd(p) {
      var _this6 = this;

      this.$notify.message('Saving...'); // get the ids with new order indexes

      var ids = [];
      $('div#proposal-list').find('li.list-group-item').each(function () {
        ids.push($(this).attr('data-id'));
      });

      if (ids) {
        this.$API.Helper.saveSort(ids, 'Question').then(function (res) {
          _this6.$notify.success('Saved!');
        });
      }
    },
    onNewInput: function onNewInput(input) {
      var _this7 = this;

      /** get the last index from the list */
      this.$API.Question.add({
        question: input.value,
        section: 'proposal',
        layout: 'text-editor',
        project_id: this.id,
        sort_order: _.findLastIndex(this.questions) + 1
      }).then(function (res) {
        _this7.questions.push(res.data);

        _this7.$notify.success('New section added!');
      });
    },
    onConfirmDelete: function onConfirmDelete(item) {
      var _this8 = this;

      this.$notify.message('Deleting...');
      this.$API.Question["delete"](item.id).then(function () {
        // find the index to remove
        var rIdx = _.findIndex(_this8.questions, ['id', item.id]); // remove from array


        _this8.questions.splice(rIdx, 1);

        _this8.$notify.success('Deleted!');
      });
    },
    onDuplicateItem: function onDuplicateItem(item) {
      var _this9 = this;

      this.$notify.message('Creating...');
      this.$API.Question.duplicate({
        id: item.id,
        sort_order: _.findLastIndex(this.questions) + 1
      }).then(function (res) {
        _this9.questions.push(res.data);

        _this9.$notify.success('Duplicate created!');
      });
    },
    onEditedItem: function onEditedItem(item) {
      var _this10 = this;

      this.$API.Question.update(item.id, {
        question: item.name
      }).then(function (res) {
        _this10.$notify.success("Saved!");
      })["catch"](function (error) {
        // reset back to old name on failure
        var rIdx = _.findIndex(_this10.questions, ['id', item.id]);

        _this10.questions[rIdx].name = item.old_name;

        _this10.$notify.responseError(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/proposal/Page.vue?vue&type=template&id=18189a2e&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/proposal/Page.vue?vue&type=template&id=18189a2e& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "left-panel col-sm-12 col-md-3" },
      [
        _vm.loadingLeft ? _c("bullet-list-loader") : _vm._e(),
        _vm._v(" "),
        !_vm.loadingLeft
          ? _c("draggable-list", {
              ref: "proposalList",
              attrs: {
                name: "proposal-list",
                options: _vm.questions,
                "delete-message":
                  "Are you sure you want to permanently delete this section and all the contents?"
              },
              on: {
                selectItem: _vm.onSelectItem,
                dragListEnd: _vm.onDragListEnd,
                confirmDelete: _vm.onConfirmDelete,
                duplicateItem: _vm.onDuplicateItem,
                editedItem: _vm.onEditedItem
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _c("button-to-input", {
          attrs: { value: "", label: "Add New Section" },
          on: { newinput: _vm.onNewInput }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "right-panel col-sm-12 col-md-9" },
      [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-xs-12 col-sm-6" }, [
            _vm.selected && _vm.selected.name == "Estimates"
              ? _c("h3", { staticClass: "title" }, [
                  _vm._v(_vm._s(_vm.selected.name))
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _vm._m(0)
        ]),
        _vm._v(" "),
        _vm.loadingRight ? _c("bullet-list-loader") : _vm._e(),
        _vm._v(" "),
        _vm.selected && _vm.selected.layout != "widget-only"
          ? _c(_vm.selected.layout, {
              ref: "editorRow" + _vm.selected.id,
              tag: "component",
              staticClass: "editor",
              attrs: {
                "key-id": _vm.selected.id,
                value: _vm.selected.answer.answer
              },
              on: {
                "update:value": function($event) {
                  return _vm.$set(_vm.selected.answer, "answer", $event)
                },
                onAutoSave: _vm.onAutoSave
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.selected && _vm.selected.trigger_widget
          ? _c(_vm.selected.trigger_widget, {
              ref: "qWidget" + _vm.selected.id,
              tag: "component",
              attrs: {
                "key-id": _vm.selected.id,
                projectId: _vm.id,
                value: _vm.selected.options
              },
              on: {
                "update:value": function($event) {
                  return _vm.$set(_vm.selected, "options", $event)
                }
              }
            })
          : _vm._e()
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-xs-12 col-sm-6" }, [
      _c("div", { staticClass: "flex flex-end" }, [
        _c("button", { staticClass: "btn btn-default with-min-width" }, [
          _vm._v("Preview")
        ]),
        _vm._v("   \n                    "),
        _c("button", { staticClass: "btn btn-primary" }, [
          _vm._v("Generate Proposal "),
          _c("span", { staticClass: "material-icons" }, [_vm._v("expand_more")])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/components/projects/proposal/Page.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/projects/proposal/Page.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Page_vue_vue_type_template_id_18189a2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page.vue?vue&type=template&id=18189a2e& */ "./resources/assets/js/components/projects/proposal/Page.vue?vue&type=template&id=18189a2e&");
/* harmony import */ var _Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/proposal/Page.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Page_vue_vue_type_template_id_18189a2e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Page_vue_vue_type_template_id_18189a2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/proposal/Page.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/proposal/Page.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/proposal/Page.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/proposal/Page.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/proposal/Page.vue?vue&type=template&id=18189a2e&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/proposal/Page.vue?vue&type=template&id=18189a2e& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_18189a2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=template&id=18189a2e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/proposal/Page.vue?vue&type=template&id=18189a2e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_18189a2e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_18189a2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);