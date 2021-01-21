(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/requirements-bundle"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      //the project id
      required: true
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
  mounted: function mounted() {
    var _this = this;

    this.selected = null;
    this.$EventDispatcher.listen('onAppDesignTabLoad', function () {
      _this.getQuestions();
    });
    this.$EventDispatcher.listen('onPersonalityTableDelete', function (keyId) {
      _this.$notify.message("Deleting...");
      /** set the trigger_widget to null in order to delete the table */


      _this.$API.Question.update(keyId, {
        trigger_widget: null
      }).then(function (res) {
        _this.selected.trigger_widget = null;

        _this.$notify.success("Table deleted!");
      });
    });
  },
  methods: {
    getQuestions: function getQuestions() {
      var _this2 = this;

      this.loadingLeft = true;
      this.selected = null;
      this.$API.Helper.getQuestions(this.id, 'app-design').then(function (res) {
        _this2.questions = res.data;
        _this2.loadingLeft = false; // select the first one in the list

        _this2.$nextTick(function () {
          if (_this2.questions[0]) {
            _this2.$refs['appDesignList'].selectItem(_this2.questions[0]);
          }
        });
      });
    },
    onSelectItem: function onSelectItem(component) {
      var _this3 = this;

      this.selected = null;
      this.$nextTick(function () {
        _this3.selected = component;
      });
    },
    onAutoSave: function onAutoSave(data) {
      var _this4 = this;

      this.$notify.message('Saving...');
      this.$API.Helper.saveAnswer(this.id, data).then(function (res) {
        var index = _.findIndex(_this4.questions, ['id', data.key]);

        if (_this4.questions[index]) {
          Vue.set(_this4.questions[index], 'answer', res.data);
        }

        _this4.$notify.success('All changes are saved!');
      });
    },

    /**
     * Updates the sorting of the Components list
     */
    onDragListEnd: function onDragListEnd(p) {
      var _this5 = this;

      this.$notify.message('Saving...'); // get the ids with new order indexes

      var ids = [];
      $('div#app-design').find('li.list-group-item').each(function () {
        ids.push($(this).attr('data-id'));
      });

      if (ids) {
        this.$API.Helper.saveSort(ids, 'Question').then(function (res) {
          _this5.$notify.success('Saved!');
        });
      }
    },
    onNewInput: function onNewInput(input) {
      var _this6 = this;

      /** get the last index from the list */
      this.$API.Question.add({
        question: input.value,
        section: 'app-design',
        layout: 'text-editor',
        project_id: this.id,
        sort_order: _.findLastIndex(this.questions) + 1
      }).then(function (res) {
        _this6.questions.push(res.data);

        _this6.$notify.success('New section added!');
      });
    },
    onConfirmDelete: function onConfirmDelete(item) {
      var _this7 = this;

      this.$notify.message('Deleting...');
      this.$API.Question["delete"](item.id).then(function () {
        // find the index to remove
        var rIdx = _.findIndex(_this7.questions, ['id', item.id]); // remove from array


        _this7.questions.splice(rIdx, 1);

        _this7.$notify.success('Deleted!');
      });
    },
    onDuplicateItem: function onDuplicateItem(item) {
      var _this8 = this;

      this.$notify.message('Creating...');
      this.$API.Question.duplicate({
        id: item.id,
        sort_order: _.findLastIndex(this.questions) + 1
      }).then(function (res) {
        _this8.questions.push(res.data);

        _this8.$notify.success('Duplicate created!');
      });
    },
    onEditedItem: function onEditedItem(item) {
      var _this9 = this;

      this.$API.Question.update(item.id, {
        question: item.name
      }).then(function (res) {
        _this9.$notify.success("Saved!");
      })["catch"](function (error) {
        // reset back to old name on failure
        var rIdx = _.findIndex(_this9.questions, ['id', item.id]);

        _this9.questions[rIdx].name = item.old_name;

        _this9.$notify.responseError(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      //the project id
      required: true
    }
  },
  data: function data() {
    var self = this;
    return {
      options: [],
      selected: {},
      useCases: [],
      loadingLeft: true,
      loadingRight: false,
      showAlert: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (route().current('Project.requirements')) {
      this.getComponents();
    }

    this.$EventDispatcher.listen('onAppFeaturesTabLoad', function () {
      if (route().current('Project.requirements')) {
        _this.getComponents();
      } else {
        location.href = route('Project.requirements', _this.id);
      }
    });
    this.$EventDispatcher.listen('onNestedDragEnd', function (item) {
      _this.onNestedDragEnd(item);
    });
    this.$EventDispatcher.listen('onNestedConfirmDelete', function (item) {
      _this.onUseCaseDelete(item);
    });
    this.$EventDispatcher.listen('onNestedDuplicateItem', function (item) {
      _this.onUseCaseDuplicate(item);
    });
    this.$EventDispatcher.listen('onNestedEditedItem', function (item) {
      _this.onUseCaseEdited(item);
    });
  },
  computed: {
    alertNotYetDismissed: function alertNotYetDismissed() {
      this.showAlert;
      var key = "project".concat(this.id, "=open");

      if (document.cookie.split(';').some(function (item) {
        return item.indexOf(key) >= 0;
      })) {
        return true;
      }

      return false;
    }
  },
  methods: {
    getComponents: function getComponents() {
      var _this2 = this;

      this.$API.Component.all(this.id).then(function (res) {
        _this2.options = res.data.data;
        _this2.showAlert = res.data.is_init;

        if (_this2.showAlert) {
          // add a cookie alert
          document.cookie = "project" + _this2.id + "=open";
        }
      }).then(function () {
        _this2.loadingLeft = false; // select the first one in the list

        _this2.$nextTick(function () {
          if (_this2.options[0]) {
            _this2.$refs['appFeaturesList'].selectItem(_this2.options[0]);
          }
        });
      });
    },
    onSelectItem: function onSelectItem(component) {
      //set the selected component
      this.selected = component;
      this.getUseCases(component.id);
    },
    getUseCases: function getUseCases(component_id) {
      var _this3 = this;

      this.loadingRight = true; // get its use cases

      this.$API.UseCase.all(component_id).then(function (res) {
        _this3.useCases = res.data;
      }).then(function () {
        _this3.loadingRight = false;
      });
    },

    /** Updates the sorting of the Components list */
    onDragListEnd: function onDragListEnd(p) {
      var _this4 = this;

      this.$API.Component.sort(p.item_id, p.item_index + 1).then(function () {
        _this4.$notify.message('Saved!');
      });
    },

    /** Updates the parent-child relation of Use Cases, and the sort the index too */
    onNestedDragEnd: function onNestedDragEnd(p) {
      //get the parent index, then set its parent id
      var theItem = {};

      if (this.useCases[p.parent_index]) {
        if (p.new_parent_id == null) {
          Vue.set(this.useCases[p.parent_index], 'parent_id', p.new_parent_id);
          Vue.set(this.useCases[p.parent_index], 'sort_order', p.parent_index + 1);
          theItem = this.useCases[p.parent_index];
        } else {
          // get the child index, then set its parent_id
          Vue.set(this.useCases[p.parent_index].children_recursive[p.item_index], 'parent_id', p.new_parent_id);
          Vue.set(this.useCases[p.parent_index].children_recursive[p.item_index], 'sort_order', p.item_index + 1);
          theItem = this.useCases[p.parent_index].children_recursive[p.item_index];
        }

        this.$notify.message('Saving...');
        this.$API.UseCase.sort(p.item_id, {
          parent_id: theItem.parent_id,
          sort_order: theItem.sort_order
        });
      }
    },
    // execute newinput event from ButtonToInput.vue component
    onNewInput: function onNewInput(input) {
      var _this5 = this;

      // get the last index from the list
      this.$API.Component.add({
        name: input.value,
        project_id: this.id,
        sort_order: _.findLastIndex(this.options) + 1
      }).then(function (res) {
        _this5.options.push(res.data);

        _this5.$notify.success('New module added!');
      });
    },
    onConfirmDelete: function onConfirmDelete(item) {
      var _this6 = this;

      this.$notify.message('Deleting...');
      this.$API.Component["delete"](item.id).then(function () {
        // find the index to remove
        var rIdx = _.findIndex(_this6.options, ['id', item.id]); // remove from array


        _this6.options.splice(rIdx, 1); // reselect the first index


        if (_this6.options[0]) {
          _this6.getUseCases(_this6.options[0].id);
        }

        _this6.$notify.success('Deleted!');
      });
    },
    onDuplicateItem: function onDuplicateItem(item) {
      var _this7 = this;

      this.$notify.message('Creating...');
      this.$API.Component.duplicate({
        id: item.id,
        sort_order: _.findLastIndex(this.options) + 1
      }).then(function (res) {
        _this7.options.push(res.data);

        _this7.$notify.success('Duplicate created!');
      });
    },
    onNewFeatureInput: function onNewFeatureInput(input) {
      var _this8 = this;

      // get the last index from the list
      this.$API.UseCase.add({
        name: input.value,
        project_id: this.id,
        component_id: this.selected.id,
        sort_order: this.useCases ? _.findLastIndex(this.useCases) + 1 : 1
      }).then(function (res) {
        _this8.useCases.push(res.data);

        _this8.$notify.success('New feature added!');
      })["catch"](function (error) {
        _this8.$notify.responseError(error.response);
      });
    },
    onUseCaseDelete: function onUseCaseDelete(item) {
      var _this9 = this;

      this.$notify.message('Deleting...');
      this.$API.UseCase["delete"](item.id).then(function () {
        if (item.component_id) {
          _this9.getUseCases(item.component_id);
        }

        _this9.$notify.success('Deleted!');
      });
    },
    onUseCaseDuplicate: function onUseCaseDuplicate(item) {
      var _this10 = this;

      var data = {
        id: item.id,
        sort_order: _.findLastIndex(this.useCases) + 1
      }; // if the item has a parent, get the last index within the same parent

      if (item.parent_id) {
        var parent = _.find(this.useCases, ['id', item.parent_id]); // console.log("parent", parent)


        data.sort_order = parent.children_recursive ? _.findLastIndex(parent.children_recursive) + 1 : 0;
      }

      this.$API.UseCase.duplicate(data).then(function (res) {
        // this.useCases.push(res.data)
        _this10.getUseCases(item.component_id);

        _this10.$notify.success('Duplicate created!');
      });
    },
    dismissAlert: function dismissAlert() {
      this.showAlert = false; // rmeove the cookie

      document.cookie = "project".concat(this.id, "=closed; Max-Age=-99999999;");
    },
    onEditedItem: function onEditedItem(item) {
      var _this11 = this;

      this.$API.Component.update(item.id, item).then(function () {
        _this11.$notify.success("Saved!");
      })["catch"](function (error) {
        // reset back to old name on failure
        var rIdx = _.findIndex(_this11.options, ['id', item.id]);

        _this11.options[rIdx].name = item.old_name;

        _this11.$notify.responseError(error.response);
      });
    },
    onUseCaseEdited: function onUseCaseEdited(item) {
      var _this12 = this;

      this.$notify.message("Saving...");
      this.$API.UseCase.update(item.id, item).then(function () {
        _this12.$notify.success("Saved!");
      })["catch"](function (error) {
        var rIdx = _.findIndex(_this12.useCases, ['id', item.id]);

        _this12.useCases[rIdx].name = item.old_name;

        _this12.$notify.responseError(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=template&id=71f6984e&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=template&id=71f6984e& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
              ref: "appDesignList",
              attrs: {
                name: "app-design",
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
        _vm.loadingRight ? _c("bullet-list-loader") : _vm._e(),
        _vm._v(" "),
        _vm.selected
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
        _c("br"),
        _vm._v(" "),
        _vm.selected && _vm.selected.trigger_widget
          ? _c(_vm.selected.trigger_widget, {
              ref: "qWidget" + _vm.selected.id,
              tag: "component",
              attrs: { "key-id": _vm.selected.id, value: _vm.selected.options },
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
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=template&id=2154f566&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=template&id=2154f566& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "row" },
    [
      _vm.showAlert || _vm.alertNotYetDismissed
        ? _c("ui-alert", { on: { dismiss: _vm.dismissAlert } }, [
            _vm._v(
              "\n        Your project’s proposal and use cases will automatically be generated based on the requirements you enter here.\n    "
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "left-panel col-sm-12 col-md-4" },
        [
          _vm.loadingLeft ? _c("list-loader") : _vm._e(),
          _vm._v(" "),
          _c("draggable-list", {
            ref: "appFeaturesList",
            attrs: {
              name: "app-features",
              options: _vm.options,
              "selected-item": _vm.selected
            },
            on: {
              selectItem: _vm.onSelectItem,
              dragListEnd: _vm.onDragListEnd,
              confirmDelete: _vm.onConfirmDelete,
              duplicateItem: _vm.onDuplicateItem,
              editedItem: _vm.onEditedItem
            }
          }),
          _vm._v(" "),
          _c("button-to-input", {
            attrs: { value: "", label: "Add New Module" },
            on: { newinput: _vm.onNewInput }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "right-panel col-sm-12 col-md-8" }, [
        _c("div", { staticClass: "row" }, [
          _c(
            "div",
            { staticClass: "col-sm-12" },
            [
              _vm.loadingRight ? _c("bullet-list-loader") : _vm._e(),
              _vm._v(" "),
              !_vm.loadingRight
                ? _c("nested-draggable-list", {
                    attrs: { options: _vm.useCases }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-sm-12" },
            [
              _c("button-to-input", {
                staticClass: "p0",
                attrs: { value: "", label: "Add Feature" },
                on: { newinput: _vm.onNewFeatureInput }
              })
            ],
            1
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/AppDesign.vue":
/*!****************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/AppDesign.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppDesign_vue_vue_type_template_id_71f6984e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppDesign.vue?vue&type=template&id=71f6984e& */ "./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=template&id=71f6984e&");
/* harmony import */ var _AppDesign_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppDesign.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppDesign_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppDesign_vue_vue_type_template_id_71f6984e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppDesign_vue_vue_type_template_id_71f6984e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/requirements/AppDesign.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDesign_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AppDesign.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDesign_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=template&id=71f6984e&":
/*!***********************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=template&id=71f6984e& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDesign_vue_vue_type_template_id_71f6984e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AppDesign.vue?vue&type=template&id=71f6984e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/AppDesign.vue?vue&type=template&id=71f6984e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDesign_vue_vue_type_template_id_71f6984e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDesign_vue_vue_type_template_id_71f6984e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/AppFeatures.vue":
/*!******************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/AppFeatures.vue ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppFeatures_vue_vue_type_template_id_2154f566___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppFeatures.vue?vue&type=template&id=2154f566& */ "./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=template&id=2154f566&");
/* harmony import */ var _AppFeatures_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppFeatures.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppFeatures_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppFeatures_vue_vue_type_template_id_2154f566___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppFeatures_vue_vue_type_template_id_2154f566___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/requirements/AppFeatures.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFeatures_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AppFeatures.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFeatures_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=template&id=2154f566&":
/*!*************************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=template&id=2154f566& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFeatures_vue_vue_type_template_id_2154f566___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AppFeatures.vue?vue&type=template&id=2154f566& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/AppFeatures.vue?vue&type=template&id=2154f566&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFeatures_vue_vue_type_template_id_2154f566___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFeatures_vue_vue_type_template_id_2154f566___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);