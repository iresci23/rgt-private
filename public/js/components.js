(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/components"],{

/***/ "./node_modules/babel-helper-vue-jsx-merge-props/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/babel-helper-vue-jsx-merge-props/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

module.exports = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp
    for (key in b) {
      aa = a[key]
      bb = b[key]
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa
            a[key] = aa = {}
            aa[temp] = true
          }
          if (typeof bb === 'string') {
            temp = bb
            b[key] = bb = {}
            bb[temp] = true
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb)
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb)
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey]
          }
        }
      } else {
        a[key] = b[key]
      }
    }
    return a
  }, {})
}

function mergeFn (a, b) {
  return function () {
    a && a.apply(this, arguments)
    b && b.apply(this, arguments)
  }
}


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      icon: null,
      type: 'default',
      text: null
    };
  },
  methods: {
    message: function message(_message) {
      this.icon = null;
      this.type = 'default';
      this.text = _message;
    },
    success: function success(message) {
      this.icon = 'check_circle_outline';
      this.type = 'success';
      this.text = message;
    },
    error: function error(message) {
      this.icon = 'error_outline';
      this.type = 'error';
      this.text = message;
    },
    clear: function clear() {
      this.icon = null;
      this.type = null;
      this.text = null;
    }
  },
  watch: {
    text: function text() {
      var _this = this;

      if (this.type == 'success') {
        setTimeout(function () {
          _this.text = null;
        }, 2000);
      } else if (this.type == 'error') {
        setTimeout(function () {
          _this.text = null;
        }, 4000);
      } else {
        setTimeout(function () {
          _this.text = null;
        }, 2000);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['slug'],
  data: function data() {
    return {
      selectedIds: []
    };
  },
  methods: {
    confirm: function confirm() {
      var $bulkModal = $('#bulk-archive-modal');
      $bulkModal.appendTo('body');
      var $checkedBoxes = $('#dataTable input[type=checkbox]:checked');
      var count = $checkedBoxes.length;

      if (count) {
        $('#bulk-archive-count').html(count);
        var self = this;
        $.each($checkedBoxes, function (el) {
          self.selectedIds.push($(this).val());
        });
        $bulkModal.modal('show');
      } else {
        // No row selected
        toastr.warning('You haven\'t selected anything to archive');
      }
    },
    proceed: function proceed() {
      this.$API.Helper.archiveRows(this.slug, this.selectedIds).then(function (res) {
        if (res.status === 200) {
          location.reload();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['slug'],
  data: function data() {
    return {
      selectedIds: []
    };
  },
  methods: {
    confirm: function confirm() {
      var $bulkDeleteModal = $('#bulk-delete-modal');
      $bulkDeleteModal.appendTo('body');
      var $checkedBoxes = $('#dataTable input[type=checkbox]:checked');
      var count = $checkedBoxes.length;

      if (count) {
        $('#bulk-delete-count').html(count);
        var self = this;
        $.each($checkedBoxes, function (el) {
          self.selectedIds.push($(this).val());
        });
        $bulkDeleteModal.modal('show');
      } else {
        // No row selected
        toastr.warning('You haven\'t selected anything to delete');
      }
    },
    proceed: function proceed() {
      this.$API.Helper.deleteRows(this.slug, this.selectedIds).then(function (res) {
        if (res.status === 200) {
          location.reload();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id', 'label', 'slug', 'status'],
  data: function data() {
    return {
      displayAction: this.status == 'archived' ? 'Unarchive' : 'Restore'
    };
  },
  methods: {
    confirm: function confirm() {
      var $bulkModal = $("#".concat(this.id, " .bulk-restore-modal"));

      if (this.id) {
        $bulkModal.modal('show');
      } else {
        // No row selected
        toastr.warning("You haven't selected anything to ".concat(this.displayLabel));
      }
    },
    proceed: function proceed() {
      this.$API.Helper.restoreRow(this.slug, this.id, this.status).then(function (res) {
        if (res.status === 200) {
          location.reload();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    label: {
      required: true,
      "default": 'Add New Module'
    },
    value: {
      required: false
    }
  },
  data: function data() {
    return {
      is_input: false,
      getValue: this.value || ''
    };
  },
  methods: {
    toInput: function toInput() {
      this.is_input = true;
    },

    /**
     * Note: specific saving functions must be handled on parent component via listening to newinput event
     * do not add saving functions from here!
     */
    onSave: function onSave(validate) {
      if (this.getValue) {
        this.is_input = false;
        this.$emit('newinput', {
          value: this.getValue
        });
        this.getValue = "";
      } else if (validate) {
        this.$notify.error("Component name is required");
        return;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    name: {
      required: true
    },
    data: {
      required: false,
      "default": Object
    },
    type: {
      required: false,
      "default": 'default'
    }
  },
  data: function data() {
    return {
      options: {
        title: '',
        html: '',
        confirmButtonText: 'OK',
        denyButtonText: 'Cancel'
      },
      item: this.data
    };
  },
  methods: {
    set: function set(options, data) {
      Object.assign(this.options, options);
      Object.assign(this.item, data);
      return this;
    },
    open: function open() {
      this.$refs['ref' + this.name].open();
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', this.item);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ModalForm.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/ModalForm.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    name: {
      required: true
    }
  },
  data: function data() {
    return {
      options: {
        title: '',
        html: '',
        confirmButtonText: 'Save',
        denyButtonText: 'Cancel'
      },
      form: [],
      errors: []
    };
  },
  methods: {
    set: function set(options, data) {
      Object.assign(this.options, options);
      Object.assign(this.form, data);
      this.form = data;
      return this;
    },
    updateValue: function updateValue(value, index) {
      // make the object reactive by using Vue.set
      Vue.set(this.form[index], 'value', value);
    },
    open: function open() {
      this.$refs['ref' + this.name].open();
    },
    close: function close() {
      this.$refs['ref' + this.name].close();
    },
    onSave: function onSave() {
      var data = {};
      this.errors = [];
      /** validate form */

      for (var i = 0; i < this.form.length; i++) {
        var row = this.form[i];

        if (row.required && !row.value) {
          this.errors.push(row.field);
        } else {
          if (row.type == 'email' && !this.validEmail(row.value)) {
            this.errors.push(row.field);
          }
        }
      }

      if (!this.errors.length) {
        /** emit data when no more errors */
        for (var i = 0; i < this.form.length; i++) {
          var _row = this.form[i];
          Vue.set(data, _row.field, _row.value);
        }

        this.$emit('save', data);
        this.close();
      }
    },
    validEmail: function validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    hasError: function hasError(key) {
      return _.includes(this.errors, key);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/Form.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/Form.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
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
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      form: {
        id: 0,
        name: null,
        type_id: null,
        client_id: null
      },
      type: '',
      client: '',
      types: [],
      clients: [],
      errors: []
    };
  },
  mounted: function mounted() {},
  methods: {
    set: function set(id) {
      var self = this;

      if (id) {
        self.form = {
          id: id,
          name: null
        }; // if edit mode, let's load the project info

        this.preload(function () {
          self.$API.Project.get(id).then(function (res) {
            var data = res.data;
            self.form = {
              id: data.id,
              name: data.name,
              type_id: data.type.id,
              client_id: data.client.id
            }; // set the selected option of the dropdown 

            self.type = {
              id: data.type.id,
              name: data.type.name
            };
            self.client = {
              id: data.client.id,
              name: data.client.name
            };
          });
        });
      } else {
        self.form.id = 0;
        self.form.name = '';
        this.preload();
      }

      return this;
    },
    preload: function preload(callback) {
      var self = this;
      Promise.all([self.$API.Project.getTypes()]) //self.$API.Client.all()
      .then(function (results) {
        self.types = results[0].data; // self.clients = results[1].data;

        callback && callback();
      });
    },
    open: function open() {
      var $modal = $('#project-form-modal');
      $modal.appendTo('body');
      $modal.modal('show');
    },
    close: function close() {
      $('#project-form-modal').modal('hide');
    },
    submit: function submit() {
      var self = this;
      this.form.type_id = this.type.id;
      this.form.client_id = 1; //this.client.id;

      this.$API.Project.save(this.form).then(function (res) {
        self.$notify.success('Saved!');
        self.close();
        self.$EventDispatcher.fire('onProjectSave');
      })["catch"](function (error) {
        self.errors = error.response.data.errors;
      });
    },
    hasError: function hasError(key) {
      return this.errors.hasOwnProperty(key);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/TabMenu.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/TabMenu.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id', 'active', 'name'],
  data: function data() {
    var self = this;
    return {
      tabs: [{
        title: 'Sales',
        icon: 'multiline_chart',
        component: __webpack_require__(/*! ./sales/TabMenu.vue */ "./resources/assets/js/components/projects/sales/TabMenu.vue")["default"],
        click: function click() {
          self.$EventDispatcher.fire('onSalesTabLoad');
        }
      }, {
        title: 'Requirements',
        icon: 'fact_check',
        component: __webpack_require__(/*! ./requirements/TabMenu.vue */ "./resources/assets/js/components/projects/requirements/TabMenu.vue")["default"],
        click: function click() {
          self.$EventDispatcher.fire('onAppFeaturesTabLoad');
        }
      }, {
        title: 'Proposal',
        icon: 'description',
        // component: require('./proposal/Page.vue').default,
        component: function component() {
          return __webpack_require__.e(/*! import() | js/proposal-bundle */ "js/proposal-bundle").then(__webpack_require__.bind(null, /*! ./proposal/Page.vue */ "./resources/assets/js/components/projects/proposal/Page.vue"));
        },
        click: function click() {
          self.$EventDispatcher.fire('onProposalTabLoad');
        }
      }, {
        title: 'Use Cases',
        icon: 'tune',
        component: null
      }, {
        title: 'Reports',
        icon: 'date_range',
        component: null
      }]
    };
  },
  methods: {
    onTabSelect: function onTabSelect(e, tab) {
      tab.click && tab.click();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id'],
  data: function data() {
    var self = this;
    return {
      tabs: [{
        title: 'App Features',
        icon: 'voyager-receipt',
        component: function component() {
          return __webpack_require__.e(/*! import() | js/requirements-bundle */ "js/requirements-bundle").then(__webpack_require__.bind(null, /*! ./AppFeatures.vue */ "./resources/assets/js/components/projects/requirements/AppFeatures.vue"));
        },
        click: function click() {
          self.$EventDispatcher.fire('onAppFeaturesTabLoad');
        }
      }, {
        title: 'App Design',
        icon: 'book',
        component: function component() {
          return __webpack_require__.e(/*! import() | js/requirements-bundle */ "js/requirements-bundle").then(__webpack_require__.bind(null, /*! ./AppDesign.vue */ "./resources/assets/js/components/projects/requirements/AppDesign.vue"));
        },
        click: function click() {
          self.$EventDispatcher.fire('onAppDesignTabLoad');
        }
      }]
    };
  },
  methods: {
    onTabSelect: function onTabSelect(e, tab) {
      tab.click && tab.click();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id'],
  data: function data() {
    var self = this;
    return {
      tabs: [{
        title: 'Sales Call',
        icon: 'voyager-receipt',
        component: function component() {
          return __webpack_require__.e(/*! import() | js/sales-bundle */ "js/sales-bundle").then(__webpack_require__.bind(null, /*! ./SalesCallTab.vue */ "./resources/assets/js/components/projects/sales/SalesCallTab.vue"));
        },
        click: function click() {
          self.$EventDispatcher.fire('onSalesTabLoad');
        }
      }, {
        title: 'BA Call',
        icon: 'book',
        component: function component() {
          return __webpack_require__.e(/*! import() | js/sales-bundle */ "js/sales-bundle").then(__webpack_require__.bind(null, /*! ./BACallTab.vue */ "./resources/assets/js/components/projects/sales/BACallTab.vue"));
        },
        click: function click() {
          self.$EventDispatcher.fire('onBACallTabLoad');
        }
      }, {
        title: 'Clients Documents',
        icon: 'collections_bookmark',
        component: function component() {
          return __webpack_require__.e(/*! import() | js/sales-bundle */ "js/sales-bundle").then(__webpack_require__.bind(null, /*! ./ProjectMediaTab.vue */ "./resources/assets/js/components/projects/sales/ProjectMediaTab.vue"));
        },
        click: function click() {
          self.$EventDispatcher.fire('onDocTabLoad');
        }
      }]
    };
  },
  methods: {
    onTabSelect: function onTabSelect(e, tab) {
      tab.click && tab.click();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/DraggableList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/DraggableList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.common.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_0__);
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
    options: {
      required: true,
      "default": Object
    },
    selectedItem: {
      required: false,
      "default": Object
    },
    deleteMessage: {
      required: false,
      type: String,
      "default": 'Are you sure you want to permanently delete this component and all related use cases?'
    },
    name: {
      required: false,
      "default": 'draggableWigdet'
    }
  },
  data: function data() {
    return {
      selected: this.selectedItem || {},
      dragging: false,
      hoveredIndex: null,
      actionMenuIndex: null,
      editOnIndex: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.debounceFn = _.debounce(function (item) {
      // emit the editedItem event
      _this.$emit('editedItem', item);
    }, 900);
  },
  methods: {
    selectItem: function selectItem(item) {
      this.selected = item; // get the use cases for this component

      this.$emit('selectItem', item);
    },
    editItem: function editItem(item, index) {
      var _this2 = this;

      if (this.selected.id == item.id) {
        this.editOnIndex = index;
        this.selected.old_name = item.name;
        this.$nextTick(function () {
          if (_this2.$refs.focusInput[0]) {
            _this2.$refs.focusInput[0].focus();
          }
        });
      } else {
        this.selectItem(item);
      }
    },

    /**
     * Handle the editing of the item's name
     * debounceFn delays the input change
     */
    autoSaveInput: function autoSaveInput(e, item) {
      item.old_name = this.selected.old_name;
      this.debounceFn(item);
    },
    openActionMenu: function openActionMenu(item, index) {
      this.actionMenuIndex = index;
    },
    deleteItem: function deleteItem(item, index) {
      this.actionMenuIndex = null;
      this.$refs['refConfirmDelete'].set({
        title: "Delete ".concat(item.name, "?"),
        html: this.deleteMessage,
        confirmButtonText: 'Delete'
      }, item).open();
    },
    duplicateItem: function duplicateItem(item, index) {
      this.$emit('duplicateItem', item);
    },
    onDragEnd: function onDragEnd(e) {
      this.dragging = false;
      var item_id = $(e.item).data('id'),
          item_index = e.newIndex;
      this.$emit('dragListEnd', {
        item_id: item_id,
        item_index: item_index
      });
    },
    onConfirmDelete: function onConfirmDelete(item) {
      this.$emit('confirmDelete', item);
    }
  },
  watch: {},
  components: {
    'modal-confirm': __webpack_require__(/*! ../helpers/ModalConfirm.vue */ "./resources/assets/js/components/helpers/ModalConfirm.vue")["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['projectId'],
  data: function data() {
    return {
      rows: {},
      rates: {
        ba_rate: 0,
        dev_rate: 0,
        qa_rate: 0,
        pm_rate: 0
      },
      editOnRate: null,
      loading: false,
      showAlert: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.debounceFn = _.debounce(function () {
      /** save the table to DB */
      _this.$API.Project.saveRates(_this.projectId, _this.rates).then(function (res) {
        _this.$notify.success("Rates updated!");
      });
    }, 1000);
    this.getComponents();
    /** Listen to event fired from Row.vue */

    this.$EventDispatcher.listen('caclParentRowTotal', function (parent) {
      _this.caclParentRowTotal(parent);
    });
    this.alertNotYetDismissed;
  },
  methods: {
    /** Get the component and usecases from Requirements tab data */
    getComponents: function getComponents() {
      var _this2 = this;

      this.loading = true;
      this.$API.Component.all(this.projectId, 'with_use_cases, with_estimates').then(function (res) {
        var items = [];
        /** Let's flatten the result so the the Components and the Use Case items are in same array level */

        res.data.data.forEach(function (item) {
          var estimate = item.estimate || {};
          items.push({
            id: estimate.id || null,
            component_id: item.id,
            use_case_id: null,
            name: item.name,
            scope: estimate.scope || 'mvp',
            ba_hours: estimate.ba_hours || 0,
            dev_hours: estimate.dev_hours || 0,
            qa_hours: estimate.qa_hours || 0,
            pm_hours: estimate.pm_hours || 0,
            notes: estimate.notes || "",
            type: 'component',
            "class": "p".concat(item.id),
            expanded: true,
            level: 1
          });

          if (item.useCases) {
            /** Push the use case items */
            item.useCases.forEach(function (usecase) {
              estimate = usecase.estimate || {};
              items.push({
                id: estimate.id || null,
                component_id: item.id,
                use_case_id: usecase.id,
                name: usecase.name,
                scope: estimate.scope || 'mvp',
                ba_hours: estimate.ba_hours || 0,
                dev_hours: estimate.dev_hours || 0,
                qa_hours: estimate.qa_hours || 0,
                pm_hours: estimate.pm_hours || 0,
                notes: estimate.notes || "",
                type: 'use_case',
                "class": "p".concat(item.id, "_child child"),
                expanded: false,
                level: 2
              });
            });
          }
        });
        _this2.rows = items;
      }).then(function () {
        _this2.getProjectRate();

        _this2.loading = false;
      });
    },
    getProjectRate: function getProjectRate() {
      var _this3 = this;

      this.$API.Project.get(this.projectId).then(function (res) {
        var project = res.data;

        if (project) {
          _this3.rates = {
            ba_rate: parseFloat(project.ba_rate),
            dev_rate: parseFloat(project.dev_rate),
            qa_rate: parseFloat(project.qa_rate),
            pm_rate: parseFloat(project.pm_rate)
          };
        }
      });
    },
    autoSaveRate: function autoSaveRate() {
      this.$notify.message("Saving...");
      this.debounceFn();
    },

    /** Calculate the component row based from use case hours */
    caclParentRowTotal: function caclParentRowTotal(parent) {
      var index = _.findIndex(this.rows, {
        'component_id': parent.component_id,
        'use_case_id': null
      });

      if (this.rows[index]) {
        /** set the new values */
        Vue.set(this.rows[index], 'ba_hours', parent.ba_hours);
        Vue.set(this.rows[index], 'dev_hours', parent.dev_hours);
        Vue.set(this.rows[index], 'qa_hours', parent.qa_hours);
        Vue.set(this.rows[index], 'pm_hours', parent.pm_hours);
      }
    },
    dismissAlert: function dismissAlert() {
      this.showAlert = false; // rmeove the cookie

      document.cookie = "project".concat(this.projectId, "_estimate=closed;");
    }
  },
  computed: {
    totalHours: function totalHours() {
      // return usecases only
      var filteredRows = _.filter(this.rows, function (r) {
        return r.use_case_id;
      }),
          ba_hours = _.sumBy(filteredRows, function (o) {
        return parseFloat(o.ba_hours);
      }),
          dev_hours = _.sumBy(filteredRows, function (o) {
        return parseFloat(o.dev_hours);
      }),
          qa_hours = _.sumBy(filteredRows, function (o) {
        return parseFloat(o.qa_hours);
      }),
          pm_hours = _.sumBy(filteredRows, function (o) {
        return parseFloat(o.pm_hours);
      });

      return {
        ba_hours: ba_hours,
        dev_hours: dev_hours,
        qa_hours: qa_hours,
        pm_hours: pm_hours,
        grand_total: ba_hours + dev_hours + qa_hours + pm_hours
      };
    },
    totalMvpHours: function totalMvpHours() {
      // return usecases with MVP scope only 
      var filteredRows = _.filter(this.rows, function (r) {
        return r.use_case_id && r.scope == 'mvp';
      }),
          ba_hours = _.sumBy(filteredRows, function (o) {
        return parseFloat(o.ba_hours);
      }),
          dev_hours = _.sumBy(filteredRows, function (o) {
        return parseFloat(o.dev_hours);
      }),
          qa_hours = _.sumBy(filteredRows, function (o) {
        return parseFloat(o.qa_hours);
      }),
          pm_hours = _.sumBy(filteredRows, function (o) {
        return parseFloat(o.pm_hours);
      });

      return {
        ba_hours: ba_hours,
        dev_hours: dev_hours,
        qa_hours: qa_hours,
        pm_hours: pm_hours,
        grand_total: ba_hours + dev_hours + qa_hours + pm_hours
      };
    },
    totalAmount: function totalAmount() {
      var totalHours = this.totalHours,
          rates = this.rates,
          ba = parseFloat(totalHours.ba_hours * rates.ba_rate),
          dev = parseFloat(totalHours.dev_hours * rates.dev_rate),
          qa = parseFloat(totalHours.qa_hours * rates.qa_rate),
          pm = parseFloat(totalHours.pm_hours * rates.pm_rate);
      return {
        ba: ba.toLocaleString(),
        dev: dev.toLocaleString(),
        qa: qa.toLocaleString(),
        pm: pm.toLocaleString(),
        grand_total: (ba + dev + qa + pm).toLocaleString()
      };
    },
    totalMvpAmount: function totalMvpAmount() {
      var totalMvpHours = this.totalMvpHours,
          rates = this.rates,
          ba = parseFloat(totalMvpHours.ba_hours * rates.ba_rate),
          dev = parseFloat(totalMvpHours.dev_hours * rates.dev_rate),
          qa = parseFloat(totalMvpHours.qa_hours * rates.qa_rate),
          pm = parseFloat(totalMvpHours.pm_hours * rates.pm_rate);
      return {
        ba: ba.toLocaleString(),
        dev: dev.toLocaleString(),
        qa: qa.toLocaleString(),
        pm: pm.toLocaleString(),
        grand_total: (ba + dev + qa + pm).toLocaleString()
      };
    },
    alertNotYetDismissed: function alertNotYetDismissed() {
      var self = this;
      var key = "project".concat(this.projectId, "_estimate=open");
      var key_closed = "project".concat(this.projectId, "_estimate=closed");

      if (document.cookie.split(';').some(function (item) {
        return item.indexOf(key) >= 0;
      })) {
        // if exists, return true
        self.showAlert = true;
      } else {
        if (document.cookie.split(';').some(function (item) {
          return item.indexOf(key_closed) >= 0;
        })) {
          // if exists, return true
          self.showAlert = false;
        } else {
          document.cookie = key;
          self.showAlert = true;
        }
      }

      return self.showAlert;
    }
  },
  components: {
    'row': __webpack_require__(/*! ./TableParts/EstimateRow.vue */ "./resources/assets/js/components/widgets/TableParts/EstimateRow.vue")["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.common.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_0__);
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
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    options: {
      required: true,
      type: Array
    },
    level: {
      required: false,
      "default": 1
    },
    deleteMessage: {
      required: false,
      type: String,
      "default": 'Are you sure you want to permanently delete this use case?'
    }
  },
  data: function data() {
    var self = this;
    return {
      dragging: false,
      hoveredIndex: null,
      actionMenuIndex: null,
      editOnIndex: null,
      selected: {},
      maxLevel: 2
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.debounceFn = _.debounce(function (item) {
      // emit the onNestedEditedItem event via EventDispatcher
      _this.$EventDispatcher.fire('onNestedEditedItem', item);
    }, 900);
  },
  methods: {
    /**
     * Enable the inline edit when item is clicked
     */
    editItem: function editItem(item, index) {
      var _this2 = this;

      this.editOnIndex = index;
      this.$nextTick(function () {
        _this2.selected.old_name = item.name;

        if (_this2.$refs.focusNestedInput[0]) {
          _this2.$refs.focusNestedInput[0].focus();
        }
      });
    },

    /**
     * Handle the editing of the item's name
     * debounceFn delays the input change
     */
    autoSaveInput: function autoSaveInput(e, item) {
      item.old_name = this.selected.old_name;
      this.debounceFn(item);
    },
    openActionMenu: function openActionMenu(item, index) {
      this.actionMenuIndex = index;
    },
    duplicateItem: function duplicateItem(item, index) {
      var _this3 = this;

      this.actionMenuIndex = null;
      this.$nextTick(function () {
        _this3.$EventDispatcher.fire('onNestedDuplicateItem', item);
      });
    },
    deleteItem: function deleteItem(item, index) {
      this.actionMenuIndex = null;
      this.$refs['refConfirmDelete'].set({
        title: "Delete ".concat(item.name, "?"),
        html: this.deleteMessage,
        confirmButtonText: 'Delete'
      }, item).open();
    },
    onDragStart: function onDragStart(e) {
      this.dragging = true;
    },
    onDragEnd: function onDragEnd(e) {
      var _this4 = this;

      this.dragging = false;
      var new_parent_id = null,
          item_id = $(e.item).data('id'),
          parent_index = e.newIndex; //default index when new_parent_id = null

      if ($(e.to.parentElement).data('parent')) {
        new_parent_id = $(e.to.parentElement).data('parent');
        parent_index = $(e.to.parentElement).data('index');
      }

      this.$nextTick(function () {
        _this4.$EventDispatcher.fire('onNestedDragEnd', {
          item_id: item_id,
          new_parent_id: new_parent_id,
          parent_index: parent_index,
          item_index: e.newIndex
        });
      });
    },

    /**
     * Do not drop elements with children to level 2
     */
    onDragMove: function onDragMove(e) {
      var draggedEl = e.draggedContext.element;

      if (draggedEl.children_recursive.length > 0 && e.relatedContext.component.$attrs['data-level'] == 2) {
        // console.debug(draggedEl.children_recursive.length,  e.relatedContext.component.$attrs['data-level'])
        // it has children, so do not drop to level 2
        return false;
      } else if (e.relatedContext.component.$attrs['data-level'] == 3) {
        return false;
      }

      return true;
    },
    onConfirmDelete: function onConfirmDelete(item) {
      var _this5 = this;

      this.$nextTick(function () {
        _this5.$EventDispatcher.fire('onNestedConfirmDelete', item);
      });
    }
  },
  components: {
    'modal-confirm': __webpack_require__(/*! ../helpers/ModalConfirm.vue */ "./resources/assets/js/components/helpers/ModalConfirm.vue")["default"]
  },
  name: "nested-draggable-list"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
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
    keyId: {
      required: true
    },
    value: {
      required: true
    },
    autoSave: {
      required: false,
      "default": true
    }
  },
  data: function data() {
    return {
      items: this.value || '',
      editOnIndex: null,
      addNoteOnIndex: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.debounceFn = _.debounce(function () {
      /** save the table to DB */
      _this.$API.Question.update(_this.keyId, {
        options: _this.items
      }).then(function (res) {
        _this.$notify.success("Table updated!");
      });
    }, 1000);
  },
  methods: {
    validateScore: function validateScore(item, index) {
      if (item.score > 10) {
        this.$notify.error("Please rate on a scale of 1-10");
        this.items[index].score = 0;
        return false;
      } else {
        this.autoSaveInput();
      }
    },
    autoSaveInput: function autoSaveInput() {
      this.$notify.message("Saving...");
      this.debounceFn();
    },
    editItem: function editItem(item, index) {
      var _this2 = this;

      this.editOnIndex = index;
      this.$nextTick(function () {
        if (_this2.$refs.focusInput[0]) {
          _this2.$refs.focusInput[0].focus();
        }
      });
    },
    addNote: function addNote(item, index) {
      var _this3 = this;

      this.addNoteOnIndex = index;
      this.$nextTick(function () {
        if (_this3.$refs.focusInput2[0]) {
          _this3.$refs.focusInput2[0].focus();
        }
      });
    },
    deleteTable: function deleteTable() {
      this.$refs['refConfirmDelete'].set({
        title: "Confirm delete",
        html: "Are you sure you want to delete this table? This action cannot be undone",
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
      }, {}).open();
    },
    onConfirmDelete: function onConfirmDelete() {
      var _this4 = this;

      this.$nextTick(function () {
        _this4.$EventDispatcher.fire('onPersonalityTableDelete', _this4.keyId);
      });
    }
  },
  components: {
    'modal-confirm': __webpack_require__(/*! ../helpers/ModalConfirm.vue */ "./resources/assets/js/components/helpers/ModalConfirm.vue")["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.common.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_0__);
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
    keyId: {
      required: true
    },
    value: {
      required: true
    },
    autoSave: {
      required: false,
      "default": true
    }
  },
  data: function data() {
    return {
      items: this.value || [],
      dragging: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.debounceFn = _.debounce(function () {
      /** save the table to DB */
      _this.$API.Question.update(_this.keyId, {
        options: _this.items
      }).then(function (res) {
        _this.$notify.success("Signature saved!");
      });
    }, 1000);
  },
  methods: {
    add: function add() {
      /**
       * Note: This uses ModalForm.vue, a component accepting dynamic fields
       * @params options for Modal options such as Title
       * @params form for Modal form containing the field info
       */
      this.$refs['refModalAdd'].set({
        title: "Add Signature",
        html: '',
        confirmButtonText: 'Save'
      }, [{
        field: 'name',
        layout: 'text-input',
        label: 'Name',
        type: 'text',
        value: '',
        hidden: false,
        required: true
      }, {
        field: 'organization',
        layout: 'text-input',
        label: 'Organization',
        type: 'text',
        value: '',
        hidden: false,
        required: true
      }, {
        field: 'email',
        layout: 'text-input',
        label: 'Email',
        type: 'email',
        value: '',
        hidden: false,
        required: true
      }]).open();
    },
    onSave: function onSave(form) {
      this.items.push(form);
      this.onAutoSave();
      console.log("onSave", form);
    },
    onAutoSave: function onAutoSave() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$notify.message("Saving...");

        _this2.debounceFn();
      });
    },
    deleteItem: function deleteItem(index) {
      this.$refs['refConfirmDelete'].set({
        title: "Confirm delete",
        html: 'Are you sure you want to permanently delete this signature?',
        confirmButtonText: 'Delete'
      }, index).open();
    },
    onConfirmDelete: function onConfirmDelete(index) {
      this.items.splice(index, 1);
      this.onAutoSave();
    },
    onDragEnd: function onDragEnd(e) {
      this.dragging = false;
      this.onAutoSave();
    }
  },
  components: {
    'modal-confirm': __webpack_require__(/*! ../helpers/ModalConfirm.vue */ "./resources/assets/js/components/helpers/ModalConfirm.vue")["default"],
    'modal-form': __webpack_require__(/*! ../helpers/ModalForm.vue */ "./resources/assets/js/components/helpers/ModalForm.vue")["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
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
    item: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    },
    projectId: {
      required: true
    }
  },
  data: function data() {
    return {
      editOnIndex: null,
      addNoteOnIndex: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.debounceFn = _.debounce(function () {
      /** save the table to DB */
      _this.item.project_id = _this.projectId;

      _this.$API.Estimate.save(_this.item).then(function (res) {
        _this.$EventDispatcher.fire('caclParentRowTotal', res.data.parent);

        _this.$notify.success("Table updated!");
      });
    }, 1000);
  },
  methods: {
    expandRow: function expandRow(method) {
      if (!method) {
        $("tr.".concat(this.item["class"], "_child")).hide();
      } else {
        $("tr.".concat(this.item["class"], "_child")).show();
      }

      this.item.expanded = method;
    },
    editItem: function editItem() {
      var _this2 = this;

      this.editOnIndex = this.index;
      this.$nextTick(function () {
        if (_this2.$refs.focusInput[0]) {
          _this2.$refs.focusInput[0].focus();
        }
      });
    },
    addNote: function addNote() {
      var _this3 = this;

      this.addNoteOnIndex = this.index;
      this.$nextTick(function () {
        if (_this3.$refs.focusInput2[0]) {
          _this3.$refs.focusInput2[0].focus();
        }
      });
    },
    autoSaveInput: function autoSaveInput() {
      this.$notify.message("Saving...");
      this.debounceFn();
    }
  },
  computed: {
    isComponent: function isComponent() {
      return this.item.type == 'component';
    },
    rowId: function rowId() {
      var id = this.item.id;
      return this.item.type == 'component' ? 'p' + id : 'u' + id;
    },
    colTotal: function colTotal() {
      var item = this.item;
      var total = parseFloat(item.ba_hours) + parseFloat(item.dev_hours) + parseFloat(item.qa_hours) + parseFloat(item.pm_hours);
      return total;
    },
    isComponentCollapsed: function isComponentCollapsed() {
      return this.item.type == 'component' && !this.item.expanded;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    item: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: String
    },
    projectId: {
      required: true
    }
  },
  data: function data() {
    return {
      editOnIndex: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.debounceFn = _.debounce(function () {
      _this.$API.Estimate.saveTimeAndCost(_this.projectId, _this.item).then(function (res) {
        _this.$notify.success("Table updated!");
      });
    }, 1000);
  },
  computed: {
    dayCount: function dayCount() {
      var days = parseFloat(this.item.total_days);
      return Number.isInteger(days) ? days : days.toFixed(1);
    }
  },
  methods: {
    autoSaveInput: function autoSaveInput() {
      this.$notify.message("Saving...");
      this.debounceFn();
    },
    editItem: function editItem() {
      var _this2 = this;

      this.editOnIndex = this.index;
      this.$nextTick(function () {
        if (_this2.$refs.focusInput[0]) {
          _this2.$refs.focusInput[0].focus();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TextEditor.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TextEditor.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    keyId: {
      required: true
    },
    value: {
      required: true
    },
    autoSave: {
      required: false,
      "default": true
    }
  },
  data: function data() {
    return {
      getValue: this.value || ''
    };
  },
  created: function created() {
    var _this = this;

    this.debounceFn = _.debounce(function () {
      if (_this.autoSave) {
        _this.$emit('onAutoSave', {
          key: _this.keyId,
          value: _this.getValue,
          layout: 'text-editor'
        });
      }
    }, 1000);
  },
  mounted: function mounted() {
    console.log("mounted text-editor");

    if (window.editor && window.editor.state == 'ready') {
      window.editor.destroy()["catch"](function (error) {
        console.log(error);
      });
    }

    var self = this;
    var csrfToken = document.head.querySelector('meta[name="csrf-token"]');
    ClassicEditor.create(document.querySelector('#editor'), {
      toolbar: {
        items: ['undo', 'redo', 'heading', 'fontFamily', // 'fontSize',
        '|', 'bold', 'italic', 'underline', 'alignment', '|', 'bulletedList', 'numberedList', 'indent', 'outdent', 'imageUpload', '|', 'fontColor', 'fontBackgroundColor', 'link', 'blockQuote', 'insertTable', 'removeFormat']
      },
      indentBlock: {
        offset: 1,
        unit: 'em'
      },
      language: 'en',
      image: {
        toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
      },
      licenseKey: '',
      simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: '/app/media-mngr/upload',
        // Enable the XMLHttpRequest.withCredentials property.
        // withCredentials: true,
        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
          'X-CSRF-TOKEN': csrfToken.content // Authorization: 'Bearer <JSON Web Token>'

        }
      }
    }).then(function (editor) {
      window.editor = editor;
      editor.setData(self.getValue);
      editor.model.document.on('change:data', function () {
        self.getValue = editor.getData();
        self.debounceFn();
      });
    })["catch"](function (error) {
      console.error('Oops, something went wrong!');
      console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
      console.warn('Build id: ol34o81w67i-fxa2jjcxjrqu');
      console.error(error);
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=script&lang=js& ***!
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
    keyId: {
      required: true
    },
    autoSave: {
      required: false,
      "default": true
    },
    projectId: {
      required: true
    }
  },
  data: function data() {
    return {
      rows: {},
      headerLabels: {
        mvp: 'MVP Features',
        optional: 'Optional / Post-MVP Features',
        out_of_scope: 'Out of Scope'
      },
      loading: false,
      buttonAction: null
    };
  },
  mounted: function mounted() {
    var self = this;
    this.getTimeAndCost(function () {
      self.loading = false;
    }); // this.$EventDispatcher.listen('onTimeCostTableUpdate', () => { this.saveUpdate() });
  },
  methods: {
    getTimeAndCost: function getTimeAndCost(callback) {
      var _this = this;

      this.loading = true;
      this.$API.Estimate.getTimeAndCost(this.projectId).then(function (res) {
        _this.rows = res.data;
        callback && callback();
      });
    },
    getSubTotal: function getSubTotal(group) {
      var total = {};
      total.hours = 0;
      total.days = 0;
      total.cost = 0;
      var groupedRows = this.rows[group];
      Array.from(groupedRows).forEach(function (row) {
        total.hours += parseFloat(row.total_hours);
        total.days += parseFloat(row.total_days);
        total.cost += parseFloat(row.total_cost);
      });
      total.days = total.days.toFixed(1);
      total.cost = total.cost.toLocaleString();
      return total;
    },
    resetTable: function resetTable() {
      this.buttonAction = 'reset';
      this.$refs['refConfirmAction'].set({
        title: "Confirm reset",
        html: "Are you sure you want to discard all changes and reset all to the default values?",
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
      }, {}).open();
    },
    deleteTable: function deleteTable() {
      this.buttonAction = 'delete';
      this.$refs['refConfirmAction'].set({
        title: "Confirm delete",
        html: "Are you sure you want to delete this table? This action cannot be undone",
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
      }, {}).open();
    },
    onConfirmAction: function onConfirmAction() {
      var _this2 = this;

      var self = this;

      if (this.buttonAction == 'reset') {
        this.$API.Estimate.resetTimeAndCost(this.projectId).then(function (res) {
          self.rows = [];
          self.$notify.success("Table reset!");
          self.getTimeAndCost(function () {
            self.loading = false;
          });
        });
      } else {
        this.$nextTick(function () {
          _this2.$EventDispatcher.fire('onTimeCostTableDelete', _this2.keyId);
        });
      }

      this.buttonAction = null;
    }
  },
  computed: {
    grandTotalHours: function grandTotalHours() {
      var groups = Object.keys(this.rows),
          total = {
        hours: 0,
        days: 0,
        cost: 0
      },
          self = this;

      _.forEach(groups, function (group) {
        total.hours += _.sumBy(self.rows[group], function (g) {
          return parseFloat(g.total_hours);
        });
        total.days += _.sumBy(self.rows[group], function (g) {
          return parseFloat(g.total_days);
        });
        total.cost += _.sumBy(self.rows[group], function (g) {
          return parseFloat(g.total_cost);
        });
      });

      total.days = total.days.toFixed(1);
      total.cost = total.cost.toLocaleString();
      return total;
    }
  },
  components: {
    'modal-confirm': __webpack_require__(/*! ../helpers/ModalConfirm.vue */ "./resources/assets/js/components/helpers/ModalConfirm.vue")["default"],
    'row': __webpack_require__(/*! ./TableParts/TimeCostRow.vue */ "./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue")["default"]
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.button[data-v-6ac47f66] {\n  margin-top: 35px;\n}\n.flip-list-move[data-v-6ac47f66] {\n  transition: transform 0.5s;\n}\n.no-move[data-v-6ac47f66] {\n  transition: transform 0s;\n}\n.ghost[data-v-6ac47f66] {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n.list-group-item[data-v-6ac47f66] {\n  cursor: move;\n}\n.list-group-item i[data-v-6ac47f66] {\n  cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/sortablejs/modular/sortable.complete.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/sortablejs/modular/sortable.complete.esm.js ***!
  \******************************************************************/
/*! exports provided: default, Sortable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sortable", function() { return It; });
function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function e(t){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(t)}var n=e(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),o=e(/Edge/i),i=e(/firefox/i),r=e(/safari/i)&&!e(/chrome/i)&&!e(/android/i),a=e(/iP(ad|od|hone)/i),l=e(/chrome/i)&&e(/android/i),s={capture:!1,passive:!1};function c(t,e,o){t.addEventListener(e,o,!n&&s)}function u(t,e,o){t.removeEventListener(e,o,!n&&s)}function d(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function h(t){return t.host&&t!==document&&t.host.nodeType?t.host:t.parentNode}function f(t,e,n,o){if(t){n=n||document;do{if(null!=e&&(">"===e[0]?t.parentNode===n&&d(t,e):d(t,e))||o&&t===n)return t;if(t===n)break}while(t=h(t))}return null}var p,g=/\s+/g;function v(t,e,n){if(t&&e)if(t.classList)t.classList[n?"add":"remove"](e);else{var o=(" "+t.className+" ").replace(g," ").replace(" "+e+" "," ");t.className=(o+(n?" "+e:"")).replace(g," ")}}function m(t,e,n){var o=t&&t.style;if(o){if(void 0===n)return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(n=t.currentStyle),void 0===e?n:n[e];e in o||-1!==e.indexOf("webkit")||(e="-webkit-"+e),o[e]=n+("string"==typeof n?"":"px")}}function b(t,e){var n="";if("string"==typeof t)n=t;else do{var o=m(t,"transform");o&&"none"!==o&&(n=o+" "+n)}while(!e&&(t=t.parentNode));var i=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return i&&new i(n)}function w(t,e,n){if(t){var o=t.getElementsByTagName(e),i=0,r=o.length;if(n)for(;i<r;i++)n(o[i],i);return o}return[]}function E(){return document.scrollingElement||document.documentElement}function y(t,e,o,i,r){if(t.getBoundingClientRect||t===window){var a,l,s,c,u,d,h;if(t!==window&&t!==E()?(l=(a=t.getBoundingClientRect()).top,s=a.left,c=a.bottom,u=a.right,d=a.height,h=a.width):(l=0,s=0,c=window.innerHeight,u=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(e||o)&&t!==window&&(r=r||t.parentNode,!n))do{if(r&&r.getBoundingClientRect&&("none"!==m(r,"transform")||o&&"static"!==m(r,"position"))){var f=r.getBoundingClientRect();l-=f.top+parseInt(m(r,"border-top-width")),s-=f.left+parseInt(m(r,"border-left-width")),c=l+a.height,u=s+a.width;break}}while(r=r.parentNode);if(i&&t!==window){var p=b(r||t),g=p&&p.a,v=p&&p.d;p&&(c=(l/=v)+(d/=v),u=(s/=g)+(h/=g))}return{top:l,left:s,bottom:c,right:u,width:h,height:d}}}function D(t,e,n){for(var o=x(t,!0),i=y(t)[e];o;){var r=y(o)[n];if(!("top"===n||"left"===n?i>=r:i<=r))return o;if(o===E())break;o=x(o,!1)}return!1}function _(t,e,n){for(var o=0,i=0,r=t.children;i<r.length;){if("none"!==r[i].style.display&&r[i]!==It.ghost&&r[i]!==It.dragged&&f(r[i],n.draggable,t,!1)){if(o===e)return r[i];o++}i++}return null}function S(t,e){for(var n=t.lastElementChild;n&&(n===It.ghost||"none"===m(n,"display")||e&&!d(n,e));)n=n.previousElementSibling;return n||null}function C(t,e){var n=0;if(!t||!t.parentNode)return-1;for(;t=t.previousElementSibling;)"TEMPLATE"===t.nodeName.toUpperCase()||t===It.clone||e&&!d(t,e)||n++;return n}function T(t){var e=0,n=0,o=E();if(t)do{var i=b(t);e+=t.scrollLeft*i.a,n+=t.scrollTop*i.d}while(t!==o&&(t=t.parentNode));return[e,n]}function x(t,e){if(!t||!t.getBoundingClientRect)return E();var n=t,o=!1;do{if(n.clientWidth<n.scrollWidth||n.clientHeight<n.scrollHeight){var i=m(n);if(n.clientWidth<n.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||n.clientHeight<n.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!n.getBoundingClientRect||n===document.body)return E();if(o||e)return n;o=!0}}}while(n=n.parentNode);return E()}function M(t,e){return Math.round(t.top)===Math.round(e.top)&&Math.round(t.left)===Math.round(e.left)&&Math.round(t.height)===Math.round(e.height)&&Math.round(t.width)===Math.round(e.width)}function N(t,e){return function(){if(!p){var n=arguments,o=this;1===n.length?t.call(o,n[0]):t.apply(o,n),p=setTimeout(function(){p=void 0},e)}}}function O(t,e,n){t.scrollLeft+=e,t.scrollTop+=n}function A(t){var e=window.Polymer,n=window.jQuery||window.Zepto;return e&&e.dom?e.dom(t).cloneNode(!0):n?n(t).clone(!0)[0]:t.cloneNode(!0)}function I(t,e){m(t,"position","absolute"),m(t,"top",e.top),m(t,"left",e.left),m(t,"width",e.width),m(t,"height",e.height)}function P(t){m(t,"position",""),m(t,"top",""),m(t,"left",""),m(t,"width",""),m(t,"height","")}var k="Sortable"+(new Date).getTime(),R=[],X={initializeByDefault:!0},Y={mount:function(t){for(var e in X)X.hasOwnProperty(e)&&!(e in t)&&(t[e]=X[e]);R.push(t)},pluginEvent:function(e,n,o){var i=this;this.eventCanceled=!1,o.cancel=function(){i.eventCanceled=!0};var r=e+"Global";R.forEach(function(i){n[i.pluginName]&&(n[i.pluginName][r]&&n[i.pluginName][r](t({sortable:n},o)),n.options[i.pluginName]&&n[i.pluginName][e]&&n[i.pluginName][e](t({sortable:n},o)))})},initializePlugins:function(t,e,n,o){for(var i in R.forEach(function(o){var i=o.pluginName;if(t.options[i]||o.initializeByDefault){var r=new o(t,e,t.options);r.sortable=t,r.options=t.options,t[i]=r,Object.assign(n,r.defaults)}}),t.options)if(t.options.hasOwnProperty(i)){var r=this.modifyOption(t,i,t.options[i]);void 0!==r&&(t.options[i]=r)}},getEventProperties:function(t,e){var n={};return R.forEach(function(o){"function"==typeof o.eventProperties&&Object.assign(n,o.eventProperties.call(e[o.pluginName],t))}),n},modifyOption:function(t,e,n){var o;return R.forEach(function(i){t[i.pluginName]&&i.optionListeners&&"function"==typeof i.optionListeners[e]&&(o=i.optionListeners[e].call(t[i.pluginName],n))}),o}};function B(e){var i=e.sortable,r=e.rootEl,a=e.name,l=e.targetEl,s=e.cloneEl,c=e.toEl,u=e.fromEl,d=e.oldIndex,h=e.newIndex,f=e.oldDraggableIndex,p=e.newDraggableIndex,g=e.originalEvent,v=e.putSortable,m=e.extraEventProperties;if(i=i||r&&r[k]){var b,w=i.options,E="on"+a.charAt(0).toUpperCase()+a.substr(1);!window.CustomEvent||n||o?(b=document.createEvent("Event")).initEvent(a,!0,!0):b=new CustomEvent(a,{bubbles:!0,cancelable:!0}),b.to=c||r,b.from=u||r,b.item=l||r,b.clone=s,b.oldIndex=d,b.newIndex=h,b.oldDraggableIndex=f,b.newDraggableIndex=p,b.originalEvent=g,b.pullMode=v?v.lastPutMode:void 0;var y=t({},m,Y.getEventProperties(a,i));for(var D in y)b[D]=y[D];r&&r.dispatchEvent(b),w[E]&&w[E].call(i,b)}}var H=function(e,n,o){var i=void 0===o?{}:o,r=i.evt,a=function(t,e){if(null==t)return{};var n,o,i={},r=Object.keys(t);for(o=0;o<r.length;o++)e.indexOf(n=r[o])>=0||(i[n]=t[n]);return i}(i,["evt"]);Y.pluginEvent.bind(It)(e,n,t({dragEl:L,parentEl:K,ghostEl:W,rootEl:j,nextEl:z,lastDownEl:G,cloneEl:U,cloneHidden:q,dragStarted:lt,putSortable:tt,activeSortable:It.active,originalEvent:r,oldIndex:V,oldDraggableIndex:Q,newIndex:Z,newDraggableIndex:$,hideGhostForTarget:xt,unhideGhostForTarget:Mt,cloneNowHidden:function(){q=!0},cloneNowShown:function(){q=!1},dispatchSortableEvent:function(t){F({sortable:n,name:t,originalEvent:r})}},a))};function F(e){B(t({putSortable:tt,cloneEl:U,targetEl:L,rootEl:j,oldIndex:V,oldDraggableIndex:Q,newIndex:Z,newDraggableIndex:$},e))}var L,K,W,j,z,G,U,q,V,Z,Q,$,J,tt,et,nt,ot,it,rt,at,lt,st,ct,ut,dt,ht=!1,ft=!1,pt=[],gt=!1,vt=!1,mt=[],bt=!1,wt=[],Et="undefined"!=typeof document,yt=a,Dt=o||n?"cssFloat":"float",_t=Et&&!l&&!a&&"draggable"in document.createElement("div"),St=function(){if(Et){if(n)return!1;var t=document.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}}(),Ct=function(t,e){var n=m(t),o=parseInt(n.width)-parseInt(n.paddingLeft)-parseInt(n.paddingRight)-parseInt(n.borderLeftWidth)-parseInt(n.borderRightWidth),i=_(t,0,e),r=_(t,1,e),a=i&&m(i),l=r&&m(r),s=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+y(i).width,c=l&&parseInt(l.marginLeft)+parseInt(l.marginRight)+y(r).width;return"flex"===n.display?"column"===n.flexDirection||"column-reverse"===n.flexDirection?"vertical":"horizontal":"grid"===n.display?n.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal":i&&a.float&&"none"!==a.float?!r||"both"!==l.clear&&l.clear!==("left"===a.float?"left":"right")?"horizontal":"vertical":i&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||s>=o&&"none"===n[Dt]||r&&"none"===n[Dt]&&s+c>o)?"vertical":"horizontal"},Tt=function(t){function e(t,n){return function(o,i,r,a){if(null==t&&(n||o.options.group.name&&i.options.group.name&&o.options.group.name===i.options.group.name))return!0;if(null==t||!1===t)return!1;if(n&&"clone"===t)return t;if("function"==typeof t)return e(t(o,i,r,a),n)(o,i,r,a);var l=(n?o:i).options.group.name;return!0===t||"string"==typeof t&&t===l||t.join&&t.indexOf(l)>-1}}var n={},o=t.group;o&&"object"==typeof o||(o={name:o}),n.name=o.name,n.checkPull=e(o.pull,!0),n.checkPut=e(o.put),n.revertClone=o.revertClone,t.group=n},xt=function(){!St&&W&&m(W,"display","none")},Mt=function(){!St&&W&&m(W,"display","")};Et&&document.addEventListener("click",function(t){if(ft)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),ft=!1,!1},!0);var Nt,Ot=function(t){if(L){var e=(i=(t=t.touches?t.touches[0]:t).clientX,r=t.clientY,pt.some(function(t){if(!S(t)){var e=y(t),n=t[k].options.emptyInsertThreshold;return n&&i>=e.left-n&&i<=e.right+n&&r>=e.top-n&&r<=e.bottom+n?a=t:void 0}}),a);if(e){var n={};for(var o in t)t.hasOwnProperty(o)&&(n[o]=t[o]);n.target=n.rootEl=e,n.preventDefault=void 0,n.stopPropagation=void 0,e[k]._onDragOver(n)}}var i,r,a},At=function(t){L&&L.parentNode[k]._isOutsideThisEl(t.target)};function It(e,n){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be an HTMLElement, not "+{}.toString.call(e);this.el=e,this.options=n=Object.assign({},n),e[k]=this;var o,i,r={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Ct(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==It.supportPointer&&"PointerEvent"in window,emptyInsertThreshold:5};for(var a in Y.initializePlugins(this,e,r),r)!(a in n)&&(n[a]=r[a]);for(var l in Tt(n),this)"_"===l.charAt(0)&&"function"==typeof this[l]&&(this[l]=this[l].bind(this));this.nativeDraggable=!n.forceFallback&&_t,this.nativeDraggable&&(this.options.touchStartThreshold=1),n.supportPointer?c(e,"pointerdown",this._onTapStart):(c(e,"mousedown",this._onTapStart),c(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(c(e,"dragover",this),c(e,"dragenter",this)),pt.push(this.el),n.store&&n.store.get&&this.sort(n.store.get(this)||[]),Object.assign(this,(i=[],{captureAnimationState:function(){i=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(e){if("none"!==m(e,"display")&&void 0!==e){i.push({target:e,rect:y(e)});var n=t({},i[i.length-1].rect);if(e.thisAnimationDuration){var o=b(e,!0);o&&(n.top-=o.f,n.left-=o.e)}e.fromRect=n}})},addAnimationState:function(t){i.push(t)},removeAnimationState:function(t){i.splice(function(t,e){for(var n in t)if(t.hasOwnProperty(n))for(var o in e)if(e.hasOwnProperty(o)&&e[o]===t[n][o])return Number(n);return-1}(i,{target:t}),1)},animateAll:function(t){var e=this;if(!this.options.animation)return clearTimeout(o),void("function"==typeof t&&t());var n=!1,r=0;i.forEach(function(t){var o=0,i=t.target,a=i.fromRect,l=y(i),s=i.prevFromRect,c=i.prevToRect,u=t.rect,d=b(i,!0);d&&(l.top-=d.f,l.left-=d.e),i.toRect=l,i.thisAnimationDuration&&M(s,l)&&!M(a,l)&&(u.top-l.top)/(u.left-l.left)==(a.top-l.top)/(a.left-l.left)&&(o=function(t,e,n,o){return Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))/Math.sqrt(Math.pow(e.top-n.top,2)+Math.pow(e.left-n.left,2))*o.animation}(u,s,c,e.options)),M(l,a)||(i.prevFromRect=a,i.prevToRect=l,o||(o=e.options.animation),e.animate(i,u,l,o)),o&&(n=!0,r=Math.max(r,o),clearTimeout(i.animationResetTimer),i.animationResetTimer=setTimeout(function(){i.animationTime=0,i.prevFromRect=null,i.fromRect=null,i.prevToRect=null,i.thisAnimationDuration=null},o),i.thisAnimationDuration=o)}),clearTimeout(o),n?o=setTimeout(function(){"function"==typeof t&&t()},r):"function"==typeof t&&t(),i=[]},animate:function(t,e,n,o){if(o){m(t,"transition",""),m(t,"transform","");var i=b(this.el),r=(e.left-n.left)/(i&&i.a||1),a=(e.top-n.top)/(i&&i.d||1);t.animatingX=!!r,t.animatingY=!!a,m(t,"transform","translate3d("+r+"px,"+a+"px,0)"),this.forRepaintDummy=function(t){return t.offsetWidth}(t),m(t,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),m(t,"transform","translate3d(0,0,0)"),"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=setTimeout(function(){m(t,"transition",""),m(t,"transform",""),t.animated=!1,t.animatingX=!1,t.animatingY=!1},o)}}}))}function Pt(t,e,i,r,a,l,s,c){var u,d,h=t[k],f=h.options.onMove;return!window.CustomEvent||n||o?(u=document.createEvent("Event")).initEvent("move",!0,!0):u=new CustomEvent("move",{bubbles:!0,cancelable:!0}),u.to=e,u.from=t,u.dragged=i,u.draggedRect=r,u.related=a||e,u.relatedRect=l||y(e),u.willInsertAfter=c,u.originalEvent=s,t.dispatchEvent(u),f&&(d=f.call(h,u,s)),d}function kt(t){t.draggable=!1}function Rt(){bt=!1}function Xt(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,n=e.length,o=0;n--;)o+=e.charCodeAt(n);return o.toString(36)}function Yt(t){return setTimeout(t,0)}function Bt(t){return clearTimeout(t)}It.prototype={constructor:It,_isOutsideThisEl:function(t){this.el.contains(t)||t===this.el||(st=null)},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,L):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e=this,n=this.el,o=this.options,i=o.preventOnFilter,a=t.type,l=t.touches&&t.touches[0]||t.pointerType&&"touch"===t.pointerType&&t,s=(l||t).target,c=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,u=o.filter;if(function(t){wt.length=0;for(var e=t.getElementsByTagName("input"),n=e.length;n--;){var o=e[n];o.checked&&wt.push(o)}}(n),!L&&!(/mousedown|pointerdown/.test(a)&&0!==t.button||o.disabled)&&!c.isContentEditable&&(this.nativeDraggable||!r||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=f(s,o.draggable,n,!1))&&s.animated||G===s)){if(V=C(s),Q=C(s,o.draggable),"function"==typeof u){if(u.call(this,t,s,this))return F({sortable:e,rootEl:c,name:"filter",targetEl:s,toEl:n,fromEl:n}),H("filter",e,{evt:t}),void(i&&t.cancelable&&t.preventDefault())}else if(u&&(u=u.split(",").some(function(o){if(o=f(c,o.trim(),n,!1))return F({sortable:e,rootEl:o,name:"filter",targetEl:s,fromEl:n,toEl:n}),H("filter",e,{evt:t}),!0})))return void(i&&t.cancelable&&t.preventDefault());o.handle&&!f(c,o.handle,n,!1)||this._prepareDragStart(t,l,s)}}},_prepareDragStart:function(t,e,r){var a,l=this,s=l.el,u=l.options,d=s.ownerDocument;if(r&&!L&&r.parentNode===s){var h=y(r);if(j=s,K=(L=r).parentNode,z=L.nextSibling,G=r,J=u.group,It.dragged=L,rt=(et={target:L,clientX:(e||t).clientX,clientY:(e||t).clientY}).clientX-h.left,at=et.clientY-h.top,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,L.style["will-change"]="all",a=function(){H("delayEnded",l,{evt:t}),It.eventCanceled?l._onDrop():(l._disableDelayedDragEvents(),!i&&l.nativeDraggable&&(L.draggable=!0),l._triggerDragStart(t,e),F({sortable:l,name:"choose",originalEvent:t}),v(L,u.chosenClass,!0))},u.ignore.split(",").forEach(function(t){w(L,t.trim(),kt)}),c(d,"dragover",Ot),c(d,"mousemove",Ot),c(d,"touchmove",Ot),c(d,"mouseup",l._onDrop),c(d,"touchend",l._onDrop),c(d,"touchcancel",l._onDrop),i&&this.nativeDraggable&&(this.options.touchStartThreshold=4,L.draggable=!0),H("delayStart",this,{evt:t}),!u.delay||u.delayOnTouchOnly&&!e||this.nativeDraggable&&(o||n))a();else{if(It.eventCanceled)return void this._onDrop();c(d,"mouseup",l._disableDelayedDrag),c(d,"touchend",l._disableDelayedDrag),c(d,"touchcancel",l._disableDelayedDrag),c(d,"mousemove",l._delayedDragTouchMoveHandler),c(d,"touchmove",l._delayedDragTouchMoveHandler),u.supportPointer&&c(d,"pointermove",l._delayedDragTouchMoveHandler),l._dragStartTimer=setTimeout(a,u.delay)}}},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;Math.max(Math.abs(e.clientX-this._lastX),Math.abs(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){L&&kt(L),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;u(t,"mouseup",this._disableDelayedDrag),u(t,"touchend",this._disableDelayedDrag),u(t,"touchcancel",this._disableDelayedDrag),u(t,"mousemove",this._delayedDragTouchMoveHandler),u(t,"touchmove",this._delayedDragTouchMoveHandler),u(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||"touch"==t.pointerType&&t,!this.nativeDraggable||e?c(document,this.options.supportPointer?"pointermove":e?"touchmove":"mousemove",this._onTouchMove):(c(L,"dragend",this),c(j,"dragstart",this._onDragStart));try{document.selection?Yt(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(ht=!1,j&&L){H("dragStarted",this,{evt:e}),this.nativeDraggable&&c(document,"dragover",At);var n=this.options;!t&&v(L,n.dragClass,!1),v(L,n.ghostClass,!0),It.active=this,t&&this._appendGhost(),F({sortable:this,name:"start",originalEvent:e})}else this._nulling()},_emulateDragOver:function(){if(nt){this._lastX=nt.clientX,this._lastY=nt.clientY,xt();for(var t=document.elementFromPoint(nt.clientX,nt.clientY),e=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(nt.clientX,nt.clientY))!==e;)e=t;if(L.parentNode[k]._isOutsideThisEl(t),e)do{if(e[k]&&e[k]._onDragOver({clientX:nt.clientX,clientY:nt.clientY,target:t,rootEl:e})&&!this.options.dragoverBubble)break;t=e}while(e=e.parentNode);Mt()}},_onTouchMove:function(t){if(et){var e=this.options,n=e.fallbackTolerance,o=e.fallbackOffset,i=t.touches?t.touches[0]:t,r=W&&b(W,!0),a=W&&r&&r.a,l=W&&r&&r.d,s=yt&&dt&&T(dt),c=(i.clientX-et.clientX+o.x)/(a||1)+(s?s[0]-mt[0]:0)/(a||1),u=(i.clientY-et.clientY+o.y)/(l||1)+(s?s[1]-mt[1]:0)/(l||1);if(!It.active&&!ht){if(n&&Math.max(Math.abs(i.clientX-this._lastX),Math.abs(i.clientY-this._lastY))<n)return;this._onDragStart(t,!0)}if(W){r?(r.e+=c-(ot||0),r.f+=u-(it||0)):r={a:1,b:0,c:0,d:1,e:c,f:u};var d="matrix("+r.a+","+r.b+","+r.c+","+r.d+","+r.e+","+r.f+")";m(W,"webkitTransform",d),m(W,"mozTransform",d),m(W,"msTransform",d),m(W,"transform",d),ot=c,it=u,nt=i}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!W){var t=this.options.fallbackOnBody?document.body:j,e=y(L,!0,yt,!0,t),n=this.options;if(yt){for(dt=t;"static"===m(dt,"position")&&"none"===m(dt,"transform")&&dt!==document;)dt=dt.parentNode;dt!==document.body&&dt!==document.documentElement?(dt===document&&(dt=E()),e.top+=dt.scrollTop,e.left+=dt.scrollLeft):dt=E(),mt=T(dt)}v(W=L.cloneNode(!0),n.ghostClass,!1),v(W,n.fallbackClass,!0),v(W,n.dragClass,!0),m(W,"transition",""),m(W,"transform",""),m(W,"box-sizing","border-box"),m(W,"margin",0),m(W,"top",e.top),m(W,"left",e.left),m(W,"width",e.width),m(W,"height",e.height),m(W,"opacity","0.8"),m(W,"position",yt?"absolute":"fixed"),m(W,"zIndex","100000"),m(W,"pointerEvents","none"),It.ghost=W,t.appendChild(W),m(W,"transform-origin",rt/parseInt(W.style.width)*100+"% "+at/parseInt(W.style.height)*100+"%")}},_onDragStart:function(t,e){var n=this,o=t.dataTransfer,i=n.options;H("dragStart",this,{evt:t}),It.eventCanceled?this._onDrop():(H("setupClone",this),It.eventCanceled||((U=A(L)).draggable=!1,U.style["will-change"]="",this._hideClone(),v(U,this.options.chosenClass,!1),It.clone=U),n.cloneId=Yt(function(){H("clone",n),It.eventCanceled||(n.options.removeCloneOnHide||j.insertBefore(U,L),n._hideClone(),F({sortable:n,name:"clone"}))}),!e&&v(L,i.dragClass,!0),e?(ft=!0,n._loopId=setInterval(n._emulateDragOver,50)):(u(document,"mouseup",n._onDrop),u(document,"touchend",n._onDrop),u(document,"touchcancel",n._onDrop),o&&(o.effectAllowed="move",i.setData&&i.setData.call(n,o,L)),c(document,"drop",n),m(L,"transform","translateZ(0)")),ht=!0,n._dragStartId=Yt(n._dragStarted.bind(n,e,t)),c(document,"selectstart",n),lt=!0,r&&m(document.body,"user-select","none"))},_onDragOver:function(e){var n,o,i,r,a=this.el,l=e.target,s=this.options,c=s.group,u=It.active,d=J===c,h=s.sort,p=tt||u,g=this,b=!1;if(!bt){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),l=f(l,s.draggable,a,!0),B("dragOver"),It.eventCanceled)return b;if(L.contains(e.target)||l.animated&&l.animatingX&&l.animatingY||g._ignoreWhileAnimating===l)return U(!1);if(ft=!1,u&&!s.disabled&&(d?h||(i=!j.contains(L)):tt===this||(this.lastPutMode=J.checkPull(this,u,L,e))&&c.checkPut(this,u,L,e))){if(r="vertical"===this._getDirection(e,l),n=y(L),B("dragOverValid"),It.eventCanceled)return b;if(i)return K=j,G(),this._hideClone(),B("revert"),It.eventCanceled||(z?j.insertBefore(L,z):j.appendChild(L)),U(!0);var w=S(a,s.draggable);if(!w||function(t,e,n){var o=y(S(n.el,n.options.draggable));return e?t.clientX>o.right+10||t.clientX<=o.right&&t.clientY>o.bottom&&t.clientX>=o.left:t.clientX>o.right&&t.clientY>o.top||t.clientX<=o.right&&t.clientY>o.bottom+10}(e,r,this)&&!w.animated){if(w===L)return U(!1);if(w&&a===e.target&&(l=w),l&&(o=y(l)),!1!==Pt(j,a,L,n,l,o,e,!!l))return G(),a.appendChild(L),K=a,q(),U(!0)}else if(l.parentNode===a){o=y(l);var E,_,T,x=L.parentNode!==a,M=!function(t,e,n){var o=n?t.left:t.top,i=n?e.left:e.top;return o===i||(n?t.right:t.bottom)===(n?e.right:e.bottom)||o+(n?t.width:t.height)/2===i+(n?e.width:e.height)/2}(L.animated&&L.toRect||n,l.animated&&l.toRect||o,r),N=r?"top":"left",A=D(l,"top","top")||D(L,"top","top"),I=A?A.scrollTop:void 0;if(st!==l&&(_=o[N],gt=!1,vt=!M&&s.invertSwap||x),0!==(E=function(t,e,n,o,i,r,a,l){var s=o?t.clientY:t.clientX,c=o?n.height:n.width,u=o?n.top:n.left,d=o?n.bottom:n.right,h=!1;if(!a)if(l&&ut<c*i){if(!gt&&(1===ct?s>u+c*r/2:s<d-c*r/2)&&(gt=!0),gt)h=!0;else if(1===ct?s<u+ut:s>d-ut)return-ct}else if(s>u+c*(1-i)/2&&s<d-c*(1-i)/2)return function(t){return C(L)<C(t)?1:-1}(e);return(h=h||a)&&(s<u+c*r/2||s>d-c*r/2)?s>u+c/2?1:-1:0}(e,l,o,r,M?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,vt,st===l))){var P=C(L);do{T=K.children[P-=E]}while(T&&("none"===m(T,"display")||T===W))}if(0===E||T===l)return U(!1);st=l,ct=E;var R=l.nextElementSibling,X=!1,Y=Pt(j,a,L,n,l,o,e,X=1===E);if(!1!==Y)return 1!==Y&&-1!==Y||(X=1===Y),bt=!0,setTimeout(Rt,30),G(),X&&!R?a.appendChild(L):l.parentNode.insertBefore(L,X?R:l),A&&O(A,0,I-A.scrollTop),K=L.parentNode,void 0===_||vt||(ut=Math.abs(_-y(l)[N])),q(),U(!0)}if(a.contains(L))return U(!1)}return!1}function B(s,c){H(s,g,t({evt:e,isOwner:d,axis:r?"vertical":"horizontal",revert:i,dragRect:n,targetRect:o,canSort:h,fromSortable:p,target:l,completed:U,onMove:function(t,o){return Pt(j,a,L,n,t,y(t),e,o)},changed:q},c))}function G(){B("dragOverAnimationCapture"),g.captureAnimationState(),g!==p&&p.captureAnimationState()}function U(t){return B("dragOverCompleted",{insertion:t}),t&&(d?u._hideClone():u._showClone(g),g!==p&&(v(L,tt?tt.options.ghostClass:u.options.ghostClass,!1),v(L,s.ghostClass,!0)),tt!==g&&g!==It.active?tt=g:g===It.active&&tt&&(tt=null),p===g&&(g._ignoreWhileAnimating=l),g.animateAll(function(){B("dragOverAnimationComplete"),g._ignoreWhileAnimating=null}),g!==p&&(p.animateAll(),p._ignoreWhileAnimating=null)),(l===L&&!L.animated||l===a&&!l.animated)&&(st=null),s.dragoverBubble||e.rootEl||l===document||(L.parentNode[k]._isOutsideThisEl(e.target),!t&&Ot(e)),!s.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),b=!0}function q(){Z=C(L),$=C(L,s.draggable),F({sortable:g,name:"change",toEl:a,newIndex:Z,newDraggableIndex:$,originalEvent:e})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){u(document,"mousemove",this._onTouchMove),u(document,"touchmove",this._onTouchMove),u(document,"pointermove",this._onTouchMove),u(document,"dragover",Ot),u(document,"mousemove",Ot),u(document,"touchmove",Ot)},_offUpEvents:function(){var t=this.el.ownerDocument;u(t,"mouseup",this._onDrop),u(t,"touchend",this._onDrop),u(t,"pointerup",this._onDrop),u(t,"touchcancel",this._onDrop),u(document,"selectstart",this)},_onDrop:function(t){var e=this.el,n=this.options;Z=C(L),$=C(L,n.draggable),H("drop",this,{evt:t}),K=L&&L.parentNode,Z=C(L),$=C(L,n.draggable),It.eventCanceled||(ht=!1,vt=!1,gt=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Bt(this.cloneId),Bt(this._dragStartId),this.nativeDraggable&&(u(document,"drop",this),u(e,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),r&&m(document.body,"user-select",""),m(L,"transform",""),t&&(lt&&(t.cancelable&&t.preventDefault(),!n.dropBubble&&t.stopPropagation()),W&&W.parentNode&&W.parentNode.removeChild(W),(j===K||tt&&"clone"!==tt.lastPutMode)&&U&&U.parentNode&&U.parentNode.removeChild(U),L&&(this.nativeDraggable&&u(L,"dragend",this),kt(L),L.style["will-change"]="",lt&&!ht&&v(L,tt?tt.options.ghostClass:this.options.ghostClass,!1),v(L,this.options.chosenClass,!1),F({sortable:this,name:"unchoose",toEl:K,newIndex:null,newDraggableIndex:null,originalEvent:t}),j!==K?(Z>=0&&(F({rootEl:K,name:"add",toEl:K,fromEl:j,originalEvent:t}),F({sortable:this,name:"remove",toEl:K,originalEvent:t}),F({rootEl:K,name:"sort",toEl:K,fromEl:j,originalEvent:t}),F({sortable:this,name:"sort",toEl:K,originalEvent:t})),tt&&tt.save()):Z!==V&&Z>=0&&(F({sortable:this,name:"update",toEl:K,originalEvent:t}),F({sortable:this,name:"sort",toEl:K,originalEvent:t})),It.active&&(null!=Z&&-1!==Z||(Z=V,$=Q),F({sortable:this,name:"end",toEl:K,originalEvent:t}),this.save())))),this._nulling()},_nulling:function(){H("nulling",this),j=L=K=W=z=U=G=q=et=nt=lt=Z=$=V=Q=st=ct=tt=J=It.dragged=It.ghost=It.clone=It.active=null,wt.forEach(function(t){t.checked=!0}),wt.length=ot=it=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":L&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move"),t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],n=this.el.children,o=0,i=n.length,r=this.options;o<i;o++)f(t=n[o],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||Xt(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,o){var i=n.children[o];f(i,this.options.draggable,n,!1)&&(e[t]=i)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return f(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];var o=Y.modifyOption(this,t,e);n[t]=void 0!==o?o:e,"group"===t&&Tt(n)},destroy:function(){H("destroy",this);var t=this.el;t[k]=null,u(t,"mousedown",this._onTapStart),u(t,"touchstart",this._onTapStart),u(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(u(t,"dragover",this),u(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),pt.splice(pt.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!q){if(H("hideClone",this),It.eventCanceled)return;m(U,"display","none"),this.options.removeCloneOnHide&&U.parentNode&&U.parentNode.removeChild(U),q=!0}},_showClone:function(t){if("clone"===t.lastPutMode){if(q){if(H("showClone",this),It.eventCanceled)return;L.parentNode!=j||this.options.group.revertClone?z?j.insertBefore(U,z):j.appendChild(U):j.insertBefore(U,L),this.options.group.revertClone&&this.animate(L,U),m(U,"display",""),q=!1}}else this._hideClone()}},Et&&c(document,"touchmove",function(t){(It.active||ht)&&t.cancelable&&t.preventDefault()}),It.utils={on:c,off:u,css:m,find:w,is:function(t,e){return!!f(t,e,t,!1)},extend:function(t,e){if(t&&e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},throttle:N,closest:f,toggleClass:v,clone:A,index:C,nextTick:Yt,cancelNextTick:Bt,detectDirection:Ct,getChild:_},It.get=function(t){return t[k]},It.mount=function(){var e=[].slice.call(arguments);e[0].constructor===Array&&(e=e[0]),e.forEach(function(e){if(!e.prototype||!e.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not "+{}.toString.call(e);e.utils&&(It.utils=t({},It.utils,e.utils)),Y.mount(e)})},It.create=function(t,e){return new It(t,e)},It.version="1.12.0";var Ht,Ft,Lt,Kt,Wt,jt=[],zt=[],Gt=!1,Ut=!1,qt=!1;function Vt(t,e){zt.forEach(function(n,o){var i=e.children[n.sortableIndex+(t?Number(o):0)];i?e.insertBefore(n,i):e.appendChild(n)})}function Zt(){jt.forEach(function(t){t!==Lt&&t.parentNode&&t.parentNode.removeChild(t)})}var Qt=function(t){var e=t.originalEvent,n=t.putSortable,o=t.dragEl,i=t.dispatchSortableEvent,r=t.unhideGhostForTarget;if(e){var a=n||t.activeSortable;(0,t.hideGhostForTarget)();var l=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,s=document.elementFromPoint(l.clientX,l.clientY);r(),a&&!a.el.contains(s)&&(i("spill"),this.onSpill({dragEl:o,putSortable:n}))}};function $t(){}function Jt(){}$t.prototype={startIndex:null,dragStart:function(t){this.startIndex=t.oldDraggableIndex},onSpill:function(t){var e=t.dragEl,n=t.putSortable;this.sortable.captureAnimationState(),n&&n.captureAnimationState();var o=_(this.sortable.el,this.startIndex,this.options);o?this.sortable.el.insertBefore(e,o):this.sortable.el.appendChild(e),this.sortable.animateAll(),n&&n.animateAll()},drop:Qt},Object.assign($t,{pluginName:"revertOnSpill"}),Jt.prototype={onSpill:function(t){var e=t.dragEl,n=t.putSortable||this.sortable;n.captureAnimationState(),e.parentNode&&e.parentNode.removeChild(e),n.animateAll()},drop:Qt},Object.assign(Jt,{pluginName:"removeOnSpill"});var te,ee,ne,oe,ie,re,ae=[],le=!1;function se(){ae.forEach(function(t){clearInterval(t.pid)}),ae=[]}function ce(){clearInterval(re)}var ue=N(function(t,e,n,o){if(e.scroll){var i,r=(t.touches?t.touches[0]:t).clientX,a=(t.touches?t.touches[0]:t).clientY,l=e.scrollSensitivity,s=e.scrollSpeed,c=E(),u=!1;ee!==n&&(ee=n,se(),i=e.scrollFn,!0===(te=e.scroll)&&(te=x(n,!0)));var d=0,h=te;do{var f=h,p=y(f),g=p.top,v=p.bottom,b=p.left,w=p.right,D=p.width,_=p.height,S=void 0,C=void 0,T=f.scrollWidth,M=f.scrollHeight,N=m(f),A=f.scrollLeft,I=f.scrollTop;f===c?(S=D<T&&("auto"===N.overflowX||"scroll"===N.overflowX||"visible"===N.overflowX),C=_<M&&("auto"===N.overflowY||"scroll"===N.overflowY||"visible"===N.overflowY)):(S=D<T&&("auto"===N.overflowX||"scroll"===N.overflowX),C=_<M&&("auto"===N.overflowY||"scroll"===N.overflowY));var P=S&&(Math.abs(w-r)<=l&&A+D<T)-(Math.abs(b-r)<=l&&!!A),R=C&&(Math.abs(v-a)<=l&&I+_<M)-(Math.abs(g-a)<=l&&!!I);if(!ae[d])for(var X=0;X<=d;X++)ae[X]||(ae[X]={});ae[d].vx==P&&ae[d].vy==R&&ae[d].el===f||(ae[d].el=f,ae[d].vx=P,ae[d].vy=R,clearInterval(ae[d].pid),0==P&&0==R||(u=!0,ae[d].pid=setInterval(function(){o&&0===this.layer&&It.active._onTouchMove(ie);var e=ae[this.layer].vy?ae[this.layer].vy*s:0,n=ae[this.layer].vx?ae[this.layer].vx*s:0;"function"==typeof i&&"continue"!==i.call(It.dragged.parentNode[k],n,e,t,ie,ae[this.layer].el)||O(ae[this.layer].el,n,e)}.bind({layer:d}),24))),d++}while(e.bubbleScroll&&h!==c&&(h=x(h,!1)));le=u}},30);It.mount(new function(){function t(){for(var t in this.defaults={scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}return t.prototype={dragStarted:function(t){var e=t.originalEvent;this.sortable.nativeDraggable?c(document,"dragover",this._handleAutoScroll):c(document,this.options.supportPointer?"pointermove":e.touches?"touchmove":"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var e=t.originalEvent;this.options.dragOverBubble||e.rootEl||this._handleAutoScroll(e)},drop:function(){this.sortable.nativeDraggable?u(document,"dragover",this._handleAutoScroll):(u(document,"pointermove",this._handleFallbackAutoScroll),u(document,"touchmove",this._handleFallbackAutoScroll),u(document,"mousemove",this._handleFallbackAutoScroll)),ce(),se(),clearTimeout(p),p=void 0},nulling:function(){ie=ee=te=le=re=ne=oe=null,ae.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,e){var i=this,a=(t.touches?t.touches[0]:t).clientX,l=(t.touches?t.touches[0]:t).clientY,s=document.elementFromPoint(a,l);if(ie=t,e||o||n||r){ue(t,this.options,s,e);var c=x(s,!0);!le||re&&a===ne&&l===oe||(re&&ce(),re=setInterval(function(){var n=x(document.elementFromPoint(a,l),!0);n!==c&&(c=n,se()),ue(t,i.options,n,e)},10),ne=a,oe=l)}else{if(!this.options.bubbleScroll||x(s,!0)===E())return void se();ue(t,this.options,x(s,!1),!1)}}},Object.assign(t,{pluginName:"scroll",initializeByDefault:!0})}),It.mount(Jt,$t),It.mount(new function(){function t(){this.defaults={swapClass:"sortable-swap-highlight"}}return t.prototype={dragStart:function(t){Nt=t.dragEl},dragOverValid:function(t){var e=t.completed,n=t.target,o=t.changed,i=t.cancel;if(t.activeSortable.options.swap){var r=this.options;if(n&&n!==this.sortable.el){var a=Nt;!1!==(0,t.onMove)(n)?(v(n,r.swapClass,!0),Nt=n):Nt=null,a&&a!==Nt&&v(a,r.swapClass,!1)}o(),e(!0),i()}},drop:function(t){var e,n,o,i,r,a,l=t.activeSortable,s=t.putSortable,c=t.dragEl,u=s||this.sortable,d=this.options;Nt&&v(Nt,d.swapClass,!1),Nt&&(d.swap||s&&s.options.swap)&&c!==Nt&&(u.captureAnimationState(),u!==l&&l.captureAnimationState(),a=(n=Nt).parentNode,(r=(e=c).parentNode)&&a&&!r.isEqualNode(n)&&!a.isEqualNode(e)&&(o=C(e),i=C(n),r.isEqualNode(a)&&o<i&&i++,r.insertBefore(n,r.children[o]),a.insertBefore(e,a.children[i])),u.animateAll(),u!==l&&l.animateAll())},nulling:function(){Nt=null}},Object.assign(t,{pluginName:"swap",eventProperties:function(){return{swapItem:Nt}}})}),It.mount(new function(){function t(t){for(var e in this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this));t.options.supportPointer?c(document,"pointerup",this._deselectMultiDrag):(c(document,"mouseup",this._deselectMultiDrag),c(document,"touchend",this._deselectMultiDrag)),c(document,"keydown",this._checkKeyDown),c(document,"keyup",this._checkKeyUp),this.defaults={selectedClass:"sortable-selected",multiDragKey:null,setData:function(e,n){var o="";jt.length&&Ft===t?jt.forEach(function(t,e){o+=(e?", ":"")+t.textContent}):o=n.textContent,e.setData("Text",o)}}}return t.prototype={multiDragKeyDown:!1,isMultiDrag:!1,delayStartGlobal:function(t){Lt=t.dragEl},delayEnded:function(){this.isMultiDrag=~jt.indexOf(Lt)},setupClone:function(t){var e=t.sortable,n=t.cancel;if(this.isMultiDrag){for(var o=0;o<jt.length;o++)zt.push(A(jt[o])),zt[o].sortableIndex=jt[o].sortableIndex,zt[o].draggable=!1,zt[o].style["will-change"]="",v(zt[o],this.options.selectedClass,!1),jt[o]===Lt&&v(zt[o],this.options.chosenClass,!1);e._hideClone(),n()}},clone:function(t){var e=t.dispatchSortableEvent,n=t.cancel;this.isMultiDrag&&(this.options.removeCloneOnHide||jt.length&&Ft===t.sortable&&(Vt(!0,t.rootEl),e("clone"),n()))},showClone:function(t){var e=t.cloneNowShown,n=t.cancel;this.isMultiDrag&&(Vt(!1,t.rootEl),zt.forEach(function(t){m(t,"display","")}),e(),Wt=!1,n())},hideClone:function(t){var e=this,n=t.cloneNowHidden,o=t.cancel;this.isMultiDrag&&(zt.forEach(function(t){m(t,"display","none"),e.options.removeCloneOnHide&&t.parentNode&&t.parentNode.removeChild(t)}),n(),Wt=!0,o())},dragStartGlobal:function(t){!this.isMultiDrag&&Ft&&Ft.multiDrag._deselectMultiDrag(),jt.forEach(function(t){t.sortableIndex=C(t)}),jt=jt.sort(function(t,e){return t.sortableIndex-e.sortableIndex}),qt=!0},dragStarted:function(t){var e=this,n=t.sortable;if(this.isMultiDrag){if(this.options.sort&&(n.captureAnimationState(),this.options.animation)){jt.forEach(function(t){t!==Lt&&m(t,"position","absolute")});var o=y(Lt,!1,!0,!0);jt.forEach(function(t){t!==Lt&&I(t,o)}),Ut=!0,Gt=!0}n.animateAll(function(){Ut=!1,Gt=!1,e.options.animation&&jt.forEach(function(t){P(t)}),e.options.sort&&Zt()})}},dragOver:function(t){var e=t.completed,n=t.cancel;Ut&&~jt.indexOf(t.target)&&(e(!1),n())},revert:function(t){var e=t.fromSortable,n=t.rootEl,o=t.sortable,i=t.dragRect;jt.length>1&&(jt.forEach(function(t){o.addAnimationState({target:t,rect:Ut?y(t):i}),P(t),t.fromRect=i,e.removeAnimationState(t)}),Ut=!1,function(t,e){jt.forEach(function(n,o){var i=e.children[n.sortableIndex+(t?Number(o):0)];i?e.insertBefore(n,i):e.appendChild(n)})}(!this.options.removeCloneOnHide,n))},dragOverCompleted:function(t){var e=t.sortable,n=t.isOwner,o=t.activeSortable,i=t.parentEl,r=t.putSortable,a=this.options;if(t.insertion){if(n&&o._hideClone(),Gt=!1,a.animation&&jt.length>1&&(Ut||!n&&!o.options.sort&&!r)){var l=y(Lt,!1,!0,!0);jt.forEach(function(t){t!==Lt&&(I(t,l),i.appendChild(t))}),Ut=!0}if(!n)if(Ut||Zt(),jt.length>1){var s=Wt;o._showClone(e),o.options.animation&&!Wt&&s&&zt.forEach(function(t){o.addAnimationState({target:t,rect:Kt}),t.fromRect=Kt,t.thisAnimationDuration=null})}else o._showClone(e)}},dragOverAnimationCapture:function(t){var e=t.dragRect,n=t.isOwner,o=t.activeSortable;if(jt.forEach(function(t){t.thisAnimationDuration=null}),o.options.animation&&!n&&o.multiDrag.isMultiDrag){Kt=Object.assign({},e);var i=b(Lt,!0);Kt.top-=i.f,Kt.left-=i.e}},dragOverAnimationComplete:function(){Ut&&(Ut=!1,Zt())},drop:function(t){var e=t.originalEvent,n=t.rootEl,o=t.parentEl,i=t.sortable,r=t.dispatchSortableEvent,a=t.oldIndex,l=t.putSortable,s=l||this.sortable;if(e){var c=this.options,u=o.children;if(!qt)if(c.multiDragKey&&!this.multiDragKeyDown&&this._deselectMultiDrag(),v(Lt,c.selectedClass,!~jt.indexOf(Lt)),~jt.indexOf(Lt))jt.splice(jt.indexOf(Lt),1),Ht=null,B({sortable:i,rootEl:n,name:"deselect",targetEl:Lt,originalEvt:e});else{if(jt.push(Lt),B({sortable:i,rootEl:n,name:"select",targetEl:Lt,originalEvt:e}),e.shiftKey&&Ht&&i.el.contains(Ht)){var d,h,f=C(Ht),p=C(Lt);if(~f&&~p&&f!==p)for(p>f?(h=f,d=p):(h=p,d=f+1);h<d;h++)~jt.indexOf(u[h])||(v(u[h],c.selectedClass,!0),jt.push(u[h]),B({sortable:i,rootEl:n,name:"select",targetEl:u[h],originalEvt:e}))}else Ht=Lt;Ft=s}if(qt&&this.isMultiDrag){if((o[k].options.sort||o!==n)&&jt.length>1){var g=y(Lt),m=C(Lt,":not(."+this.options.selectedClass+")");if(!Gt&&c.animation&&(Lt.thisAnimationDuration=null),s.captureAnimationState(),!Gt&&(c.animation&&(Lt.fromRect=g,jt.forEach(function(t){if(t.thisAnimationDuration=null,t!==Lt){var e=Ut?y(t):g;t.fromRect=e,s.addAnimationState({target:t,rect:e})}})),Zt(),jt.forEach(function(t){u[m]?o.insertBefore(t,u[m]):o.appendChild(t),m++}),a===C(Lt))){var b=!1;jt.forEach(function(t){t.sortableIndex===C(t)||(b=!0)}),b&&r("update")}jt.forEach(function(t){P(t)}),s.animateAll()}Ft=s}(n===o||l&&"clone"!==l.lastPutMode)&&zt.forEach(function(t){t.parentNode&&t.parentNode.removeChild(t)})}},nullingGlobal:function(){this.isMultiDrag=qt=!1,zt.length=0},destroyGlobal:function(){this._deselectMultiDrag(),u(document,"pointerup",this._deselectMultiDrag),u(document,"mouseup",this._deselectMultiDrag),u(document,"touchend",this._deselectMultiDrag),u(document,"keydown",this._checkKeyDown),u(document,"keyup",this._checkKeyUp)},_deselectMultiDrag:function(t){if(!(void 0!==qt&&qt||Ft!==this.sortable||t&&f(t.target,this.options.draggable,this.sortable.el,!1)||t&&0!==t.button))for(;jt.length;){var e=jt[0];v(e,this.options.selectedClass,!1),jt.shift(),B({sortable:this.sortable,rootEl:this.sortable.el,name:"deselect",targetEl:e,originalEvt:t})}},_checkKeyDown:function(t){t.key===this.options.multiDragKey&&(this.multiDragKeyDown=!0)},_checkKeyUp:function(t){t.key===this.options.multiDragKey&&(this.multiDragKeyDown=!1)}},Object.assign(t,{pluginName:"multiDrag",utils:{select:function(t){var e=t.parentNode[k];e&&e.options.multiDrag&&!~jt.indexOf(t)&&(Ft&&Ft!==e&&(Ft.multiDrag._deselectMultiDrag(),Ft=e),v(t,e.options.selectedClass,!0),jt.push(t))},deselect:function(t){var e=t.parentNode[k],n=jt.indexOf(t);e&&e.options.multiDrag&&~n&&(v(t,e.options.selectedClass,!1),jt.splice(n,1))}},eventProperties:function(){var t=this,e=[],n=[];return jt.forEach(function(o){var i;e.push({multiDragElement:o,index:o.sortableIndex}),i=Ut&&o!==Lt?-1:Ut?C(o,":not(."+t.options.selectedClass+")"):C(o),n.push({multiDragElement:o,index:i})}),{items:[].concat(jt),clones:[].concat(zt),oldIndicies:e,newIndicies:n}},optionListeners:{multiDragKey:function(t){return"ctrl"===(t=t.toLowerCase())?t="Control":t.length>1&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}}})});/* harmony default export */ __webpack_exports__["default"] = (It);
//# sourceMappingURL=sortable.complete.esm.js.map


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--5-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--5-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=template&id=52cf081c&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=template&id=52cf081c& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
  return _vm.text
    ? _c("label", { staticClass: "auto-save-indicator", class: _vm.type }, [
        _vm.icon
          ? _c("span", { staticClass: "material-icons" }, [
              _vm._v(_vm._s(_vm.icon))
            ])
          : _vm._e(),
        _vm._v("\n    " + _vm._s(_vm.text) + "\n")
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=template&id=39dbc25f&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=template&id=39dbc25f& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "bulk-archive" }, [
    _c("a", { attrs: { href: "javascript:;" }, on: { click: _vm.confirm } }, [
      _vm._v("Archive")
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal modal-danger fade",
        attrs: { tabindex: "-1", id: "bulk-archive-modal", role: "dialog" }
      },
      [
        _c("div", { staticClass: "modal-dialog" }, [
          _c("div", { staticClass: "modal-content" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _vm._v(
                "\n                    Are you sure you want to archive ("
              ),
              _c("span", { attrs: { id: "bulk-archive-count" } }),
              _vm._v(") " + _vm._s(_vm.slug) + "?\n                ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c("input", {
                staticClass: "btn btn-danger pull-right",
                attrs: { type: "submit", value: "Archive" },
                on: { click: _vm.proceed }
              }),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-default pull-right",
                  attrs: { type: "button", "data-dismiss": "modal" }
                },
                [
                  _vm._v(
                    "\n                        Cancel\n                    "
                  )
                ]
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      ),
      _vm._v(" "),
      _c("h4", { staticClass: "modal-title" }, [
        _c("i", { staticClass: "voyager-trash" }),
        _vm._v(" Archive confirmation \n                    ")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=template&id=165f761e&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=template&id=165f761e& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "bulk-delete" }, [
    _c("a", { attrs: { href: "javascript:;" }, on: { click: _vm.confirm } }, [
      _vm._v("Delete")
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal modal-danger fade",
        attrs: { tabindex: "-1", id: "bulk-delete-modal", role: "dialog" }
      },
      [
        _c("div", { staticClass: "modal-dialog" }, [
          _c("div", { staticClass: "modal-content" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _vm._v("\n                    Are you sure you want to delete ("),
              _c("span", { attrs: { id: "bulk-delete-count" } }),
              _vm._v(") " + _vm._s(_vm.slug) + "?\n                ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c("input", {
                staticClass: "btn btn-danger pull-right",
                attrs: { type: "submit", value: "Delete" },
                on: { click: _vm.proceed }
              }),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-default pull-right",
                  attrs: { type: "button", "data-dismiss": "modal" }
                },
                [
                  _vm._v(
                    "\n                        Cancel\n                    "
                  )
                ]
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      ),
      _vm._v(" "),
      _c("h4", { staticClass: "modal-title" }, [
        _c("i", { staticClass: "voyager-trash" }),
        _vm._v(" Delete confirmation \n                    ")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=template&id=6d36c24b&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=template&id=6d36c24b& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "bulk-restore", attrs: { id: _vm.id } }, [
    _c(
      "a",
      {
        staticClass: "btn btn-sm btn-warning pull-right edit",
        attrs: { href: "javascript:;" },
        on: { click: _vm.confirm }
      },
      [
        _c("i", { staticClass: "voyager-refresh" }),
        _vm._v(" "),
        _c("span", { staticClass: "hidden-xs hidden-sm" }, [
          _vm._v("\n    " + _vm._s(_vm.displayAction) + "\n    ")
        ])
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "bulk-restore-modal modal modal-success fade",
        attrs: { tabindex: "-1", role: "dialog" }
      },
      [
        _c("div", { staticClass: "modal-dialog" }, [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("h4", { staticClass: "modal-title" }, [
                _c("i", { staticClass: "voyager-refresh" }),
                _vm._v(" " + _vm._s(_vm.displayAction) + ' "'),
                _c("i", [_vm._v(_vm._s(_vm.label))]),
                _vm._v('" ? \n                    ')
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c("input", {
                staticClass: "btn btn-success pull-right",
                attrs: { type: "submit" },
                domProps: { value: _vm.displayAction },
                on: { click: _vm.proceed }
              }),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-default pull-right",
                  attrs: { type: "button", "data-dismiss": "modal" }
                },
                [
                  _vm._v(
                    "\n                        Cancel\n                    "
                  )
                ]
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=template&id=cb951568&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=template&id=cb951568& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "button-to-input" }, [
    !_vm.is_input
      ? _c(
          "a",
          {
            staticClass: "btn btn-default",
            attrs: { href: "javascript:;" },
            on: {
              click: function($event) {
                return _vm.toInput()
              }
            }
          },
          [
            _c("span", { staticClass: "material-icons" }, [_vm._v("add_box")]),
            _vm._v(" " + _vm._s(_vm.label) + "\n    ")
          ]
        )
      : _c(
          "div",
          { staticClass: "flex" },
          [
            _c("ui-textbox", {
              attrs: { autofocus: true },
              on: {
                "keydown-enter": function($event) {
                  return _vm.onSave()
                }
              },
              model: {
                value: _vm.getValue,
                callback: function($$v) {
                  _vm.getValue = $$v
                },
                expression: "getValue"
              }
            }),
            _vm._v(" "),
            _c("div", [
              _c(
                "a",
                {
                  staticClass: "btn-plus",
                  attrs: { href: "javascript:;" },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      return _vm.onSave(true)
                    }
                  }
                },
                [_c("span", { staticClass: "material-icons" }, [_vm._v(" + ")])]
              )
            ])
          ],
          1
        )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=template&id=4bc76ed4&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=template&id=4bc76ed4& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    "ui-confirm",
    {
      ref: "ref" + _vm.name,
      class: _vm.type,
      attrs: {
        title: _vm.options.title,
        confirmButtonText: _vm.options.confirmButtonText,
        denyButtonText: _vm.options.denyButtonText,
        autofocus: "none"
      },
      on: { confirm: _vm.onConfirm }
    },
    [_c("div", { domProps: { innerHTML: _vm._s(_vm.options.html) } })]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ModalForm.vue?vue&type=template&id=01b5d960&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/helpers/ModalForm.vue?vue&type=template&id=01b5d960& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    "ui-modal",
    {
      ref: "ref" + _vm.name,
      attrs: { title: _vm.options.title, "dismiss-on": "close-button" }
    },
    [
      _c("div", { domProps: { innerHTML: _vm._s(_vm.options.html) } }),
      _vm._v(" "),
      _vm._l(_vm.form, function(row, index) {
        return [
          _c("div", { key: index, staticClass: "dynamic-form" }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !row.hidden,
                    expression: "!row.hidden"
                  }
                ],
                staticClass: "form-group"
              },
              [
                _c("label", { staticClass: "text-label" }, [
                  _vm._v(_vm._s(row.label))
                ]),
                _vm._v(" "),
                row.layout == "text-input"
                  ? _c("ui-textbox", {
                      attrs: {
                        type: row.type || "text",
                        value: _vm.form[index].value,
                        required: row.required,
                        minlength: 1,
                        maxlength: 80,
                        invalid: _vm.hasError(row.field)
                      },
                      on: {
                        input: function($event) {
                          return _vm.updateValue($event, index)
                        }
                      }
                    })
                  : _vm._e()
              ],
              1
            )
          ])
        ]
      }),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { slot: "footer" }, slot: "footer" },
        [
          _c(
            "ui-button",
            { attrs: { color: "primary" }, on: { click: _vm.onSave } },
            [_vm._v(_vm._s(_vm.options.confirmButtonText))]
          ),
          _vm._v(" "),
          _c(
            "ui-button",
            { attrs: { color: "default" }, on: { click: _vm.close } },
            [_vm._v(_vm._s(_vm.options.denyButtonText))]
          )
        ],
        1
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/Form.vue?vue&type=template&id=ad08cf5c&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/Form.vue?vue&type=template&id=ad08cf5c& ***!
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
  return _c("div", { staticClass: "project-form" }, [
    _c(
      "div",
      {
        staticClass: "modal modal-default fade",
        attrs: { tabindex: "-1", id: "project-form-modal", role: "dialog" }
      },
      [
        _c("div", { staticClass: "modal-dialog" }, [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header with-border" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("h4", { staticClass: "modal-title" }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.form.id ? "Edit" : "Create New") +
                    " Project\n                    "
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-sm-12" }, [
                  _c(
                    "div",
                    { staticClass: "form-group" },
                    [
                      _c("label", { staticClass: "text-label" }, [
                        _vm._v("Project Name")
                      ]),
                      _vm._v(" "),
                      _c("ui-textbox", {
                        attrs: { invalid: _vm.hasError("name") },
                        model: {
                          value: _vm.form.name,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "name", $$v)
                          },
                          expression: "form.name"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.types
                    ? _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c("label", { staticClass: "text-label" }, [
                            _vm._v("Project Type")
                          ]),
                          _vm._v(" "),
                          _c("ui-select", {
                            attrs: {
                              options: _vm.types,
                              invalid: _vm.hasError("type_id")
                            },
                            model: {
                              value: _vm.type,
                              callback: function($$v) {
                                _vm.type = $$v
                              },
                              expression: "type"
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c("input", {
                staticClass: "btn btn-primary pull-right",
                attrs: { type: "submit", value: "Save" },
                on: { click: _vm.submit }
              }),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-default pull-right",
                  attrs: { type: "button", "data-dismiss": "modal" }
                },
                [
                  _vm._v(
                    "\n                        Cancel\n                    "
                  )
                ]
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/TabMenu.vue?vue&type=template&id=84a70f14&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/TabMenu.vue?vue&type=template&id=84a70f14& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
    [
      _c(
        "ui-tabs",
        {
          attrs: {
            fullwidth: "",
            raised: "",
            type: "icon-and-text",
            indicatorColor: "white"
          }
        },
        _vm._l(_vm.tabs, function(tab) {
          return _c(
            "ui-tab",
            {
              key: tab.title,
              attrs: {
                id: tab.title,
                selected: tab.title == _vm.active,
                title: tab.title
              },
              on: {
                select: function($event) {
                  return _vm.onTabSelect($event, tab)
                }
              }
            },
            [
              _c("ui-icon", {
                attrs: { slot: "icon", icon: tab.icon },
                slot: "icon"
              }),
              _vm._v(" "),
              _c(
                "keep-alive",
                [
                  tab.component
                    ? _c(tab.component, {
                        tag: "component",
                        staticClass: "tab",
                        attrs: { id: _vm.id, name: _vm.name }
                      })
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=template&id=44c922e3&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=template&id=44c922e3& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "sales-tab-menu" },
    [
      _c(
        "ui-tabs",
        {
          staticClass: "not-fullwidth background-white",
          attrs: { fullwidth: false, indicatorColor: "primary" }
        },
        _vm._l(_vm.tabs, function(tab) {
          return _c(
            "ui-tab",
            {
              key: tab.title,
              attrs: {
                selected: tab.title === "App Features",
                title: tab.title
              },
              on: {
                select: function($event) {
                  return _vm.onTabSelect($event, tab)
                }
              }
            },
            [
              _c("div", { attrs: { slot: "icon" }, slot: "icon" }, [
                _c("i", { staticClass: "voyager-receipts" })
              ]),
              _vm._v(" "),
              _c(
                "keep-alive",
                [
                  _c(tab.component, {
                    tag: "component",
                    staticClass: "tab",
                    attrs: { id: _vm.id }
                  })
                ],
                1
              )
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=template&id=1fceb473&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=template&id=1fceb473& ***!
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
  return _c(
    "div",
    { staticClass: "sales-tab-menu" },
    [
      _c(
        "ui-tabs",
        {
          staticClass: "not-fullwidth background-white",
          attrs: { fullwidth: false, indicatorColor: "primary" }
        },
        _vm._l(_vm.tabs, function(tab) {
          return _c(
            "ui-tab",
            {
              key: tab.title,
              attrs: { selected: tab.title === "Sales Call", title: tab.title },
              on: {
                select: function($event) {
                  return _vm.onTabSelect($event, tab)
                }
              }
            },
            [
              _c("div", { attrs: { slot: "icon" }, slot: "icon" }, [
                _c("i", { staticClass: "voyager-receipts" })
              ]),
              _vm._v(" "),
              _c(
                "keep-alive",
                [
                  _c(tab.component, {
                    tag: "component",
                    staticClass: "tab",
                    attrs: { id: _vm.id }
                  })
                ],
                1
              )
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/DraggableList.vue?vue&type=template&id=4a8c4144&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/DraggableList.vue?vue&type=template&id=4a8c4144& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "widget" },
    [
      _c(
        "draggable",
        {
          staticClass: "list-group",
          attrs: {
            id: _vm.name,
            list: _vm.options,
            "ghost-class": "ghost",
            handle: ".handle"
          },
          on: {
            start: function($event) {
              _vm.dragging = true
            },
            end: _vm.onDragEnd
          }
        },
        _vm._l(_vm.options, function(item, index) {
          return _c(
            "li",
            {
              key: item.id,
              staticClass: "list-group-item cursor-pointer flex",
              class: { active: item.id == _vm.selected.id },
              attrs: { "data-id": item.id },
              on: {
                click: function($event) {
                  return _vm.selectItem(item)
                },
                mouseover: function($event) {
                  _vm.hoveredIndex = index
                },
                mouseleave: function($event) {
                  _vm.hoveredIndex = null
                  _vm.actionMenuIndex = null
                }
              }
            },
            [
              _c("span", { staticClass: "material-icons handle" }, [
                _vm._v("drag_handle")
              ]),
              _vm._v(" "),
              _vm.editOnIndex == index
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: item.name,
                        expression: "item.name"
                      }
                    ],
                    ref: "focusInput",
                    refInFor: true,
                    staticClass: "inline-input-editor",
                    attrs: { type: "text", autofocus: "" },
                    domProps: { value: item.name },
                    on: {
                      input: [
                        function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(item, "name", $event.target.value)
                        },
                        function($event) {
                          return _vm.autoSaveInput($event, item)
                        }
                      ]
                    }
                  })
                : _c(
                    "span",
                    {
                      staticClass: "item-title flex-grow-1",
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          return _vm.editItem(item, index)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                " +
                          _vm._s(item.name) +
                          "\n            "
                      )
                    ]
                  ),
              _vm._v(" "),
              _vm.hoveredIndex == index
                ? _c("div", { staticClass: "context-menu-wrapper" }, [
                    _c(
                      "span",
                      {
                        staticClass: "material-icons icon-more-vertical",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.openActionMenu(item, index)
                          }
                        }
                      },
                      [_vm._v("more_vert")]
                    ),
                    _vm._v(" "),
                    _vm.actionMenuIndex == index
                      ? _c("div", { staticClass: "context-menu" }, [
                          _c("ul", [
                            _c(
                              "li",
                              {
                                on: {
                                  click: function($event) {
                                    $event.stopPropagation()
                                    return _vm.duplicateItem(item, index)
                                  }
                                }
                              },
                              [_vm._v("Duplicate")]
                            ),
                            _vm._v(" "),
                            _c(
                              "li",
                              {
                                on: {
                                  click: function($event) {
                                    $event.stopPropagation()
                                    return _vm.deleteItem(item, index)
                                  }
                                }
                              },
                              [_vm._v("Delete")]
                            )
                          ])
                        ])
                      : _vm._e()
                  ])
                : _vm._e()
            ]
          )
        }),
        0
      ),
      _vm._v(" "),
      _c("modal-confirm", {
        ref: "refConfirmDelete",
        attrs: { name: "deleteModal" },
        on: { confirm: _vm.onConfirmDelete }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=template&id=106149a8&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=template&id=106149a8& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
    [
      _vm.showAlert
        ? _c("ui-alert", { on: { dismiss: _vm.dismissAlert } }, [
            _vm._v(
              "\n        When you enter numbers here, the project’s total time & cost get automatically updated on Timeline & Costs section. \n        The Estimates section will not be included when you generate the proposal.\n    "
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "table",
        {
          staticClass:
            "table table-hover table-bordered no-footer editable-table estimates-table"
        },
        [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "tbody",
            [
              _vm.loading
                ? _c("tr", [
                    _c(
                      "td",
                      { attrs: { colspan: "8" } },
                      [_c("content-loader")],
                      1
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.rows, function(row, idx) {
                return _c("row", {
                  key: row.id,
                  attrs: { item: row, index: idx, projectId: _vm.projectId }
                })
              }),
              _vm._v(" "),
              _c("tr", { staticClass: "footer-totals" }, [
                _c("td", { staticClass: "dark-bg" }, [_vm._v("Total Hours")]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg" }),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg" }),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalHours.ba_hours || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalHours.dev_hours || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalHours.qa_hours || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalHours.pm_hours || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalHours.grand_total || "-"))
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("tr", { staticClass: "footer-totals" }, [
                _c("td", { staticClass: "dark-bg" }, [
                  _vm._v("MVP Total Hours")
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg" }),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg" }),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalMvpHours.ba_hours || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalMvpHours.dev_hours || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalMvpHours.qa_hours || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalMvpHours.pm_hours || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(_vm._s(_vm.totalMvpHours.grand_total || "-"))
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("tr", { staticClass: "footer-totals" }, [
                _c("td", { attrs: { colspan: "3" } }, [
                  _vm._v("Rate per Hour")
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-right" }, [
                  _vm.editOnRate == "ba_rate"
                    ? _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model.number",
                            value: _vm.rates.ba_rate,
                            expression: "rates.ba_rate",
                            modifiers: { number: true }
                          }
                        ],
                        ref: "focusRateInput",
                        staticClass: "inline-input-editor text-right",
                        attrs: {
                          type: "number",
                          autofocus: "",
                          min: "0",
                          max: "1000"
                        },
                        domProps: { value: _vm.rates.ba_rate },
                        on: {
                          input: [
                            function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.rates,
                                "ba_rate",
                                _vm._n($event.target.value)
                              )
                            },
                            _vm.autoSaveRate
                          ],
                          blur: function($event) {
                            return _vm.$forceUpdate()
                          }
                        }
                      })
                    : _c(
                        "span",
                        {
                          staticClass: "clickable-span number",
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.editOnRate = "ba_rate"
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s("$ " + _vm.rates.ba_rate || false) +
                              "\n                    "
                          )
                        ]
                      )
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-right" }, [
                  _vm.editOnRate == "dev_rate"
                    ? _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model.number",
                            value: _vm.rates.dev_rate,
                            expression: "rates.dev_rate",
                            modifiers: { number: true }
                          }
                        ],
                        ref: "focusRateInput",
                        staticClass: "inline-input-editor text-right",
                        attrs: {
                          type: "number",
                          autofocus: "",
                          min: "0",
                          max: "1000"
                        },
                        domProps: { value: _vm.rates.dev_rate },
                        on: {
                          input: [
                            function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.rates,
                                "dev_rate",
                                _vm._n($event.target.value)
                              )
                            },
                            _vm.autoSaveRate
                          ],
                          blur: function($event) {
                            return _vm.$forceUpdate()
                          }
                        }
                      })
                    : _c(
                        "span",
                        {
                          staticClass: "clickable-span number",
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.editOnRate = "dev_rate"
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s("$ " + _vm.rates.dev_rate || false) +
                              "\n                    "
                          )
                        ]
                      )
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-right" }, [
                  _vm.editOnRate == "qa_rate"
                    ? _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model.number",
                            value: _vm.rates.qa_rate,
                            expression: "rates.qa_rate",
                            modifiers: { number: true }
                          }
                        ],
                        ref: "focusRateInput",
                        staticClass: "inline-input-editor text-right",
                        attrs: {
                          type: "number",
                          autofocus: "",
                          min: "0",
                          max: "1000"
                        },
                        domProps: { value: _vm.rates.qa_rate },
                        on: {
                          input: [
                            function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.rates,
                                "qa_rate",
                                _vm._n($event.target.value)
                              )
                            },
                            _vm.autoSaveRate
                          ],
                          blur: function($event) {
                            return _vm.$forceUpdate()
                          }
                        }
                      })
                    : _c(
                        "span",
                        {
                          staticClass: "clickable-span number",
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.editOnRate = "qa_rate"
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s("$ " + _vm.rates.qa_rate || false) +
                              "\n                    "
                          )
                        ]
                      )
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-right" }, [
                  _vm.editOnRate == "pm_rate"
                    ? _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model.number",
                            value: _vm.rates.pm_rate,
                            expression: "rates.pm_rate",
                            modifiers: { number: true }
                          }
                        ],
                        ref: "focusRateInput",
                        staticClass: "inline-input-editor text-right",
                        attrs: {
                          type: "number",
                          autofocus: "",
                          min: "0",
                          max: "1000"
                        },
                        domProps: { value: _vm.rates.pm_rate },
                        on: {
                          input: [
                            function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.rates,
                                "pm_rate",
                                _vm._n($event.target.value)
                              )
                            },
                            _vm.autoSaveRate
                          ],
                          blur: function($event) {
                            return _vm.$forceUpdate()
                          }
                        }
                      })
                    : _c(
                        "span",
                        {
                          staticClass: "clickable-span number",
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.editOnRate = "pm_rate"
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s("$ " + _vm.rates.pm_rate || false) +
                              "\n                    "
                          )
                        ]
                      )
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg" })
              ]),
              _vm._v(" "),
              _c("tr", { staticClass: "footer-totals" }, [
                _c("td", { staticClass: "dark-bg", attrs: { colspan: "3" } }, [
                  _vm._v("Total Amount")
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v("$" + _vm._s(_vm.totalAmount.ba || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v("$" + _vm._s(_vm.totalAmount.dev || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v("$" + _vm._s(_vm.totalAmount.qa || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v("$" + _vm._s(_vm.totalAmount.pm || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg" })
              ]),
              _vm._v(" "),
              _c("tr", { staticClass: "footer-totals" }, [
                _c("td", { staticClass: "dark-bg", attrs: { colspan: "3" } }, [
                  _vm._v("MVP Total Amount")
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v("$" + _vm._s(_vm.totalMvpAmount.ba || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v("$" + _vm._s(_vm.totalMvpAmount.dev || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v("$" + _vm._s(_vm.totalMvpAmount.qa || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg text-right" }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v("$" + _vm._s(_vm.totalMvpAmount.pm || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg" })
              ]),
              _vm._v(" "),
              _vm._m(1),
              _vm._v(" "),
              _c("tr", { staticClass: "footer-totals" }, [
                _c("td", { staticClass: "dark-bg", attrs: { colspan: "3" } }, [
                  _vm._v("Project Total Amount")
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg", attrs: { colspan: "2" } }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(
                      " $" + _vm._s(_vm.totalAmount.grand_total || 0) + " "
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("tr", { staticClass: "footer-totals" }, [
                _c("td", { staticClass: "dark-bg", attrs: { colspan: "3" } }, [
                  _vm._v("MVP Project Total Amount")
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "dark-bg", attrs: { colspan: "2" } }, [
                  _c("span", { staticClass: "number" }, [
                    _vm._v(
                      " $" + _vm._s(_vm.totalMvpAmount.grand_total || 0) + " "
                    )
                  ])
                ])
              ])
            ],
            2
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", { attrs: { width: "40%" } }, [_vm._v("Component")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center", attrs: { width: "60px" } }, [
        _vm._v("Internal Notes")
      ]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("Scope Status")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("BA Hours")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("Dev Hours")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("QA Hours")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("PM Hours")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("Total")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", { staticClass: "footer-totals" }, [
      _c("td", { attrs: { colspan: "8" } }, [
        _vm._v("\n                     \n                ")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=template&id=6ac47f66&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=template&id=6ac47f66&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "nested-draggable" },
    [
      _c(
        "draggable",
        {
          staticClass: "list-group dragArea",
          attrs: {
            tag: "ul",
            handle: ".handle",
            "ghost-class": "ghost",
            group: "ucnested",
            list: _vm.options,
            "data-level": _vm.level,
            move: _vm.onDragMove
          },
          on: { start: _vm.onDragStart, end: _vm.onDragEnd }
        },
        _vm._l(_vm.options, function(item, index) {
          return _c(
            "li",
            {
              key: "uc" + item.id,
              staticClass: "list-group-item cursor-pointer not-flex p0",
              class: { "has-children": item.children_recursive.length },
              attrs: { id: "uc" + item.id, "data-id": item.id },
              on: {
                mouseover: function($event) {
                  _vm.hoveredIndex = index
                },
                mouseleave: function($event) {
                  _vm.hoveredIndex = null
                  _vm.actionMenuIndex = null
                }
              }
            },
            [
              _c("div", { staticClass: "flex" }, [
                _c("span", { staticClass: "material-icons handle" }, [
                  _vm._v("drag_handle")
                ]),
                _vm._v(" "),
                _vm.editOnIndex == index
                  ? _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: item.name,
                          expression: "item.name"
                        }
                      ],
                      ref: "focusNestedInput",
                      refInFor: true,
                      staticClass: "inline-input-editor",
                      attrs: { type: "text", autofocus: "" },
                      domProps: { value: item.name },
                      on: {
                        input: [
                          function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(item, "name", $event.target.value)
                          },
                          function($event) {
                            return _vm.autoSaveInput($event, item)
                          }
                        ]
                      }
                    })
                  : _c(
                      "span",
                      {
                        staticClass: "item-title flex-grow-1",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.editItem(item, index)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(item.name) +
                            "\n            "
                        )
                      ]
                    ),
                _vm._v(" "),
                _vm.hoveredIndex == index
                  ? _c("div", { staticClass: "context-menu-wrapper" }, [
                      _c(
                        "span",
                        {
                          staticClass: "material-icons icon-more-vertical",
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              return _vm.openActionMenu(item, index)
                            }
                          }
                        },
                        [_vm._v("more_vert")]
                      ),
                      _vm._v(" "),
                      _vm.actionMenuIndex == index
                        ? _c("div", { staticClass: "context-menu" }, [
                            _c("ul", [
                              _c(
                                "li",
                                {
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      return _vm.duplicateItem(item, index)
                                    }
                                  }
                                },
                                [_vm._v("Duplicate")]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      return _vm.deleteItem(item, index)
                                    }
                                  }
                                },
                                [_vm._v("Delete")]
                              )
                            ])
                          ])
                        : _vm._e()
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm.level < _vm.maxLevel
                ? _c("nested-draggable-list", {
                    class: { sublevel: item.children_recursive.length },
                    attrs: {
                      options: item.children_recursive,
                      level: _vm.level + 1,
                      "data-parent": item.id,
                      "data-index": index
                    }
                  })
                : _vm._e()
            ],
            1
          )
        }),
        0
      ),
      _vm._v(" "),
      _c("modal-confirm", {
        ref: "refConfirmDelete",
        attrs: { name: "deleteModal" },
        on: { confirm: _vm.onConfirmDelete }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=template&id=432afc8a&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=template&id=432afc8a& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "col-sm-12 col-md-8 col-md-offset-2" },
    [
      _c(
        "a",
        {
          staticClass: "btn btn-danger-outlined pull-right",
          attrs: { href: "javascript:;" },
          on: {
            click: function($event) {
              $event.stopPropagation()
              return _vm.deleteTable($event)
            }
          }
        },
        [
          _c("span", { staticClass: "material-icons" }, [_vm._v("cancel")]),
          _vm._v(" Delete this table")
        ]
      ),
      _vm._v(" "),
      _c(
        "table",
        {
          staticClass:
            "table table-hover table-bordered no-footer editable-table"
        },
        [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.items, function(item, index) {
              return _c("tr", { key: index }, [
                _c("td", [_c("span", [_vm._v(_vm._s(item.name))])]),
                _vm._v(" "),
                _c("td", { staticClass: "text-center" }, [
                  _vm.editOnIndex == index
                    ? _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model.number",
                            value: item.score,
                            expression: "item.score",
                            modifiers: { number: true }
                          }
                        ],
                        ref: "focusInput",
                        refInFor: true,
                        staticClass: "inline-input-editor text-center",
                        attrs: {
                          type: "number",
                          autofocus: "",
                          min: "0",
                          max: "10"
                        },
                        domProps: { value: item.score },
                        on: {
                          input: [
                            function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                item,
                                "score",
                                _vm._n($event.target.value)
                              )
                            },
                            function($event) {
                              return _vm.validateScore(item, index)
                            }
                          ],
                          blur: function($event) {
                            return _vm.$forceUpdate()
                          }
                        }
                      })
                    : _c(
                        "span",
                        {
                          staticClass: "clickable-span",
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              return _vm.editItem(item, index)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(item.score > 0 ? item.score : " ") +
                              "\n                    "
                          )
                        ]
                      )
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-center" }, [
                  _c(
                    "div",
                    {
                      staticClass: "note-icon",
                      class: { "with-red-dot": item.notes }
                    },
                    [
                      _c(
                        "span",
                        {
                          staticClass: "material-icons",
                          on: {
                            click: function($event) {
                              return _vm.addNote(item, index)
                            }
                          }
                        },
                        [_vm._v("chat")]
                      ),
                      _vm._v(" "),
                      _c("span", { staticClass: "note-red-dot" })
                    ]
                  ),
                  _vm._v(" "),
                  _vm.addNoteOnIndex == index
                    ? _c("div", { staticClass: "context-menu-wrapper" }, [
                        _c("div", { staticClass: "context-menu" }, [
                          _c(
                            "div",
                            { staticClass: "flex column" },
                            [
                              _c("ui-textbox", {
                                ref: "focusInput2",
                                refInFor: true,
                                attrs: {
                                  "multi-line": true,
                                  placeholder: "Write something..."
                                },
                                on: { input: _vm.autoSaveInput },
                                model: {
                                  value: item.notes,
                                  callback: function($$v) {
                                    _vm.$set(item, "notes", $$v)
                                  },
                                  expression: "item.notes"
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-xs btn-default pull-right",
                                  on: {
                                    click: function($event) {
                                      _vm.addNoteOnIndex = null
                                    }
                                  }
                                },
                                [_vm._v("Close")]
                              )
                            ],
                            1
                          )
                        ])
                      ])
                    : _vm._e()
                ])
              ])
            }),
            0
          )
        ]
      ),
      _vm._v(" "),
      _c("modal-confirm", {
        ref: "refConfirmDelete",
        attrs: { name: "deleteModal" },
        on: { confirm: _vm.onConfirmDelete }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th"),
      _vm._v(" "),
      _c("th", { staticClass: "text-center", attrs: { width: "100px" } }, [
        _vm._v("Score")
      ]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center", attrs: { width: "60px" } }, [
        _vm._v("Notes")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=template&id=a7270456&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=template&id=a7270456& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "row mt-2" },
    [
      _c("div", { staticClass: "col-sm-12" }, [
        _c("h4", [_vm._v("Signatures")]),
        _vm._v(" "),
        _c(
          "table",
          {
            staticClass: "table table-striped table-bordered theme1",
            attrs: { cellpadding: "1" }
          },
          [
            _vm._m(0),
            _vm._v(" "),
            _c(
              "draggable",
              {
                attrs: { tag: "tbody", handle: ".handle" },
                on: {
                  start: function($event) {
                    _vm.dragging = true
                  },
                  end: _vm.onDragEnd
                },
                model: {
                  value: _vm.items,
                  callback: function($$v) {
                    _vm.items = $$v
                  },
                  expression: "items"
                }
              },
              _vm._l(_vm.items, function(item, index) {
                return _c("tr", { key: index }, [
                  _c(
                    "td",
                    { staticClass: "text-center", attrs: { scope: "row" } },
                    [
                      _c("span", { staticClass: "material-icons handle" }, [
                        _vm._v("drag_handle")
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("td", { attrs: { scope: "row" } }, [
                    _vm._v(_vm._s(item.name))
                  ]),
                  _vm._v(" "),
                  _c("td", { attrs: { scope: "row" } }, [
                    _vm._v(_vm._s(item.organization))
                  ]),
                  _vm._v(" "),
                  _c("td", { attrs: { scope: "row" } }, [
                    _vm._v(_vm._s(item.email))
                  ]),
                  _vm._v(" "),
                  _c(
                    "td",
                    { staticClass: "text-center", attrs: { scope: "row" } },
                    [
                      _c("i", {
                        staticClass: "voyager-trash",
                        on: {
                          click: function($event) {
                            return _vm.deleteItem(index)
                          }
                        }
                      })
                    ]
                  )
                ])
              }),
              0
            ),
            _vm._v(" "),
            _vm.items.length == 0 ? _c("tr", [_vm._m(1)]) : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "btn btn-default", on: { click: _vm.add } },
          [
            _c("span", { staticClass: "material-icons" }, [_vm._v("add_box")]),
            _vm._v(" Add Signature")
          ]
        )
      ]),
      _vm._v(" "),
      _c("modal-form", {
        ref: "refModalAdd",
        attrs: { name: "addModal" },
        on: { save: _vm.onSave }
      }),
      _vm._v(" "),
      _c("modal-confirm", {
        ref: "refConfirmDelete",
        attrs: { name: "deleteModal" },
        on: { confirm: _vm.onConfirmDelete }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Organization")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Email")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { attrs: { colspan: "5" } }, [
      _c("div", { staticClass: "text-empty-result" }, [_vm._v("No data")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=template&id=10efb96c&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=template&id=10efb96c& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    "tr",
    {
      class: _vm.item.class,
      attrs: { id: _vm.rowId, "parent-id": _vm.item.component_id },
      on: {
        mouseleave: function($event) {
          _vm.editOnIndex = null
        }
      }
    },
    [
      _c("td", { staticClass: "title" }, [
        _c("div", [
          _vm.isComponent && _vm.item.expanded
            ? _c(
                "span",
                {
                  staticClass: "material-icons icon-expanded",
                  on: {
                    click: function($event) {
                      return _vm.expandRow(false)
                    }
                  }
                },
                [_vm._v("remove")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.isComponent && !_vm.item.expanded
            ? _c(
                "span",
                {
                  staticClass: "material-icons icon-collapsed",
                  on: {
                    click: function($event) {
                      return _vm.expandRow(true)
                    }
                  }
                },
                [_vm._v("add")]
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.isComponent
            ? _c("span", { staticClass: "icon-child-link" }, [_c("hr")])
            : _vm._e(),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.item.name))])
        ])
      ]),
      _vm._v(" "),
      _c("td", { staticClass: "text-center" }, [
        _c(
          "div",
          {
            staticClass: "note-icon",
            class: { "with-red-dot": _vm.item.notes }
          },
          [
            _c(
              "span",
              {
                staticClass: "material-icons",
                on: {
                  click: function($event) {
                    return _vm.addNote()
                  }
                }
              },
              [_vm._v("chat")]
            ),
            _vm._v(" "),
            _c("span", { staticClass: "note-red-dot" })
          ]
        ),
        _vm._v(" "),
        _vm.addNoteOnIndex == _vm.index
          ? _c("div", { staticClass: "context-menu-wrapper" }, [
              _c("div", { staticClass: "context-menu" }, [
                _c(
                  "div",
                  { staticClass: "flex column" },
                  [
                    _c("ui-textbox", {
                      ref: "focusInput2",
                      attrs: {
                        "multi-line": true,
                        placeholder: "Write something..."
                      },
                      on: { input: _vm.autoSaveInput },
                      model: {
                        value: _vm.item.notes,
                        callback: function($$v) {
                          _vm.$set(_vm.item, "notes", $$v)
                        },
                        expression: "item.notes"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-xs btn-default pull-right",
                        on: {
                          click: function($event) {
                            _vm.addNoteOnIndex = null
                          }
                        }
                      },
                      [_vm._v("Close")]
                    )
                  ],
                  1
                )
              ])
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("td", { staticClass: "text-center" }, [
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.item.scope,
                expression: "item.scope"
              }
            ],
            attrs: { name: "estimate-scope" },
            on: {
              change: [
                function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.$set(
                    _vm.item,
                    "scope",
                    $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                  )
                },
                _vm.autoSaveInput
              ]
            }
          },
          [
            _c("option", { attrs: { value: "mvp" } }, [_vm._v("MVP")]),
            _vm._v(" "),
            _c("option", { attrs: { value: "optional" } }, [
              _vm._v("Optional")
            ]),
            _vm._v(" "),
            _c("option", { attrs: { value: "out_of_scope" } }, [
              _vm._v("Out of Scope")
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "td",
        { staticClass: "text-right" },
        [
          !_vm.isComponent
            ? [
                _vm.editOnIndex == _vm.index
                  ? _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model.number",
                          value: _vm.item.ba_hours,
                          expression: "item.ba_hours",
                          modifiers: { number: true }
                        }
                      ],
                      ref: "focusInput",
                      staticClass: "inline-input-editor text-right",
                      attrs: {
                        type: "number",
                        autofocus: "",
                        min: "0",
                        max: "1000"
                      },
                      domProps: { value: _vm.item.ba_hours },
                      on: {
                        input: [
                          function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.item,
                              "ba_hours",
                              _vm._n($event.target.value)
                            )
                          },
                          _vm.autoSaveInput
                        ],
                        blur: function($event) {
                          return _vm.$forceUpdate()
                        }
                      }
                    })
                  : _c(
                      "span",
                      {
                        staticClass: "clickable-span number",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.editItem()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(parseFloat(_vm.item.ba_hours) || " ") +
                            "\n            "
                        )
                      ]
                    )
              ]
            : _vm.isComponentCollapsed
            ? [
                _c("span", { staticClass: "number" }, [
                  _vm._v(_vm._s(parseFloat(_vm.item.ba_hours) || " "))
                ])
              ]
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "td",
        { staticClass: "text-right" },
        [
          !_vm.isComponent
            ? [
                _vm.editOnIndex == _vm.index
                  ? _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model.number",
                          value: _vm.item.dev_hours,
                          expression: "item.dev_hours",
                          modifiers: { number: true }
                        }
                      ],
                      ref: "focusInput",
                      staticClass: "inline-input-editor text-right",
                      attrs: {
                        type: "number",
                        autofocus: "",
                        min: "0",
                        max: "1000"
                      },
                      domProps: { value: _vm.item.dev_hours },
                      on: {
                        input: [
                          function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.item,
                              "dev_hours",
                              _vm._n($event.target.value)
                            )
                          },
                          _vm.autoSaveInput
                        ],
                        blur: function($event) {
                          return _vm.$forceUpdate()
                        }
                      }
                    })
                  : _c(
                      "span",
                      {
                        staticClass: "clickable-span number",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.editItem()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(parseFloat(_vm.item.dev_hours) || " ") +
                            "\n            "
                        )
                      ]
                    )
              ]
            : _vm.isComponentCollapsed
            ? [
                _c("span", { staticClass: "number" }, [
                  _vm._v(_vm._s(parseFloat(_vm.item.dev_hours) || " "))
                ])
              ]
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "td",
        { staticClass: "text-right" },
        [
          !_vm.isComponent
            ? [
                _vm.editOnIndex == _vm.index
                  ? _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model.number",
                          value: _vm.item.qa_hours,
                          expression: "item.qa_hours",
                          modifiers: { number: true }
                        }
                      ],
                      ref: "focusInput",
                      staticClass: "inline-input-editor text-right",
                      attrs: {
                        type: "number",
                        autofocus: "",
                        min: "0",
                        max: "1000"
                      },
                      domProps: { value: _vm.item.qa_hours },
                      on: {
                        input: [
                          function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.item,
                              "qa_hours",
                              _vm._n($event.target.value)
                            )
                          },
                          _vm.autoSaveInput
                        ],
                        blur: function($event) {
                          return _vm.$forceUpdate()
                        }
                      }
                    })
                  : _c(
                      "span",
                      {
                        staticClass: "clickable-span number",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.editItem()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(parseFloat(_vm.item.qa_hours) || " ") +
                            "\n            "
                        )
                      ]
                    )
              ]
            : _vm.isComponentCollapsed
            ? [
                _c("span", { staticClass: "number" }, [
                  _vm._v(_vm._s(parseFloat(_vm.item.qa_hours) || " "))
                ])
              ]
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "td",
        { staticClass: "text-right" },
        [
          !_vm.isComponent
            ? [
                _vm.editOnIndex == _vm.index
                  ? _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model.number",
                          value: _vm.item.pm_hours,
                          expression: "item.pm_hours",
                          modifiers: { number: true }
                        }
                      ],
                      ref: "focusInput",
                      staticClass: "inline-input-editor text-right",
                      attrs: {
                        type: "number",
                        autofocus: "",
                        min: "0",
                        max: "1000"
                      },
                      domProps: { value: _vm.item.pm_hours },
                      on: {
                        input: [
                          function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.item,
                              "pm_hours",
                              _vm._n($event.target.value)
                            )
                          },
                          _vm.autoSaveInput
                        ],
                        blur: function($event) {
                          return _vm.$forceUpdate()
                        }
                      }
                    })
                  : _c(
                      "span",
                      {
                        staticClass: "clickable-span number",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.editItem()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(parseFloat(_vm.item.pm_hours) || " ") +
                            "\n            "
                        )
                      ]
                    )
              ]
            : _vm.isComponentCollapsed
            ? [
                _c("span", { staticClass: "number" }, [
                  _vm._v(_vm._s(parseFloat(_vm.item.pm_hours) || " "))
                ])
              ]
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "td",
        { staticClass: "text-right dark-bg" },
        [
          !_vm.isComponent || _vm.isComponentCollapsed
            ? [
                _c("span", { staticClass: "number" }, [
                  _vm._v(_vm._s(parseFloat(_vm.colTotal) || " "))
                ])
              ]
            : _vm._e()
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=template&id=4e315e1a&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=template&id=4e315e1a& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    "tr",
    {
      on: {
        mouseleave: function($event) {
          _vm.editOnIndex = null
        }
      }
    },
    [
      _c("td", [_vm._v(_vm._s(_vm.item.name))]),
      _vm._v(" "),
      _c("td", { staticClass: "text-right" }, [
        _vm.editOnIndex == _vm.index
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model.number",
                  value: _vm.item.total_hours,
                  expression: "item.total_hours",
                  modifiers: { number: true }
                }
              ],
              ref: "focusInput",
              staticClass: "inline-input-editor text-right",
              attrs: { type: "number", autofocus: "", min: "0", max: "100000" },
              domProps: { value: _vm.item.total_hours },
              on: {
                input: [
                  function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.item,
                      "total_hours",
                      _vm._n($event.target.value)
                    )
                  },
                  _vm.autoSaveInput
                ],
                blur: function($event) {
                  return _vm.$forceUpdate()
                }
              }
            })
          : _c(
              "span",
              {
                staticClass: "clickable-span number",
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    return _vm.editItem()
                  }
                }
              },
              [
                _vm._v(
                  "\n            " +
                    _vm._s(parseFloat(_vm.item.total_hours) || " ") +
                    "\n        "
                )
              ]
            )
      ]),
      _vm._v(" "),
      _c("td", { staticClass: "text-right" }, [
        _vm.editOnIndex == _vm.index
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model.number",
                  value: _vm.item.total_days,
                  expression: "item.total_days",
                  modifiers: { number: true }
                }
              ],
              ref: "focusInput",
              staticClass: "inline-input-editor text-right",
              attrs: { type: "number", autofocus: "", min: "0", max: "100000" },
              domProps: { value: _vm.item.total_days },
              on: {
                input: [
                  function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.item,
                      "total_days",
                      _vm._n($event.target.value)
                    )
                  },
                  _vm.autoSaveInput
                ],
                blur: function($event) {
                  return _vm.$forceUpdate()
                }
              }
            })
          : _c(
              "span",
              {
                staticClass: "clickable-span number",
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    return _vm.editItem()
                  }
                }
              },
              [
                _vm._v(
                  "\n            " + _vm._s(_vm.dayCount || " ") + "\n        "
                )
              ]
            )
      ]),
      _vm._v(" "),
      _c("td", { staticClass: "text-right" }, [
        _vm.editOnIndex == _vm.index
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model.number",
                  value: _vm.item.total_cost,
                  expression: "item.total_cost",
                  modifiers: { number: true }
                }
              ],
              ref: "focusInput",
              staticClass: "inline-input-editor text-right",
              attrs: { type: "number", autofocus: "", min: "0", max: "100000" },
              domProps: { value: _vm.item.total_cost },
              on: {
                input: [
                  function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.item,
                      "total_cost",
                      _vm._n($event.target.value)
                    )
                  },
                  _vm.autoSaveInput
                ],
                blur: function($event) {
                  return _vm.$forceUpdate()
                }
              }
            })
          : _c(
              "span",
              {
                staticClass: "clickable-span number",
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    return _vm.editItem()
                  }
                }
              },
              [
                _vm._v(
                  "\n           $ " +
                    _vm._s(parseFloat(_vm.item.total_cost).toLocaleString()) +
                    "\n        "
                )
              ]
            )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TextEditor.vue?vue&type=template&id=1fb48dd1&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TextEditor.vue?vue&type=template&id=1fb48dd1& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "editor" } }, [
      _c("p", [_vm._v("Here goes the initial content of the editor.")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=template&id=ba4dbb16&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=template&id=ba4dbb16& ***!
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
  return _c(
    "div",
    { staticClass: "timeline-cost-section mt-2" },
    [
      _c("div", { staticClass: "flex flex-end" }, [
        _c(
          "a",
          {
            staticClass: "btn btn-danger-outlined pull-right",
            attrs: { href: "javascript:;" },
            on: {
              click: function($event) {
                $event.stopPropagation()
                return _vm.deleteTable($event)
              }
            }
          },
          [
            _c("span", { staticClass: "material-icons" }, [_vm._v("cancel")]),
            _vm._v(" Delete this table\n        ")
          ]
        ),
        _vm._v("   \n\n        "),
        _c(
          "button",
          {
            staticClass: "btn btn-primary",
            on: {
              click: function($event) {
                $event.stopPropagation()
                return _vm.resetTable($event)
              }
            }
          },
          [
            _c("span", { staticClass: "material-icons" }, [
              _vm._v("settings_backup_restore")
            ]),
            _vm._v(" Reset all to default values")
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "table",
        {
          staticClass:
            "table table-hover table-bordered no-footer padded-table editable-table estimates-table"
        },
        [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "tbody",
            [
              _vm._l(_vm.rows, function(group, key) {
                return [
                  _c("tr", { key: "g" + key }, [
                    _c("td", { staticClass: "dark-bg text-dark" }, [
                      _vm._v(_vm._s(_vm.headerLabels[key]))
                    ]),
                    _vm._v(" "),
                    _c("td", { staticClass: "dark-bg" }),
                    _vm._v(" "),
                    _c("td", { staticClass: "dark-bg" }),
                    _vm._v(" "),
                    _c("td", { staticClass: "dark-bg" })
                  ]),
                  _vm._v(" "),
                  _vm.loading
                    ? _c("tr", { key: "g" + key }, [
                        _c(
                          "td",
                          { attrs: { colspan: "4" } },
                          [_c("content-loader")],
                          1
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._l(group, function(item, idx) {
                    return _c("row", {
                      key: key + idx,
                      attrs: {
                        item: item,
                        index: key + idx,
                        "project-id": _vm.projectId
                      }
                    })
                  }),
                  _vm._v(" "),
                  _c("tr", { key: key, staticClass: "sub-totals" }, [
                    _c("td", [_vm._v("Sub Total")]),
                    _vm._v(" "),
                    _c("td", { staticClass: "text-right" }, [
                      _c("span", { staticClass: "number" }, [
                        _vm._v(_vm._s(_vm.getSubTotal(key).hours))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("td", { staticClass: "text-right" }, [
                      _c("span", { staticClass: "number" }, [
                        _vm._v(_vm._s(_vm.getSubTotal(key).days))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("td", { staticClass: "text-right" }, [
                      _c("span", { staticClass: "number" }, [
                        _vm._v("$ " + _vm._s(_vm.getSubTotal(key).cost))
                      ])
                    ])
                  ])
                ]
              })
            ],
            2
          ),
          _vm._v(" "),
          _c("tfoot", [
            _c("tr", { staticClass: "footer-totals" }, [
              _c("td", { staticClass: "dark-bg" }, [_vm._v("Grand Total")]),
              _vm._v(" "),
              _c("td", { staticClass: "dark-bg text-right" }, [
                _c("span", { staticClass: "number" }, [
                  _vm._v(_vm._s(_vm.grandTotalHours.hours))
                ])
              ]),
              _vm._v(" "),
              _c("td", { staticClass: "dark-bg text-right" }, [
                _c("span", { staticClass: "number" }, [
                  _vm._v(_vm._s(_vm.grandTotalHours.days))
                ])
              ]),
              _vm._v(" "),
              _c("td", { staticClass: "dark-bg text-right" }, [
                _c("span", { staticClass: "number" }, [
                  _vm._v("$ " + _vm._s(_vm.grandTotalHours.cost))
                ])
              ])
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _c("modal-confirm", {
        ref: "refConfirmAction",
        attrs: { name: "actionModal" },
        on: { confirm: _vm.onConfirmAction }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", { staticClass: "text-center", attrs: { width: "60%" } }, [
        _vm._v("Component")
      ]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center", attrs: { width: "10%" } }, [
        _vm._v("Estimated Hours")
      ]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center", attrs: { width: "10%" } }, [
        _vm._v("Timeline (Days)")
      ]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center", attrs: { width: "20%" } }, [
        _vm._v("Costs")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuedraggable/dist/vuedraggable.common.js":
/*!***************************************************************!*\
  !*** ./node_modules/vuedraggable/dist/vuedraggable.common.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a352":
/***/ (function(module, exports) {

module.exports = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.complete.esm.js");

/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c649":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return insertNodeAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return camelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return console; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeNode; });
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);


function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }

  return global.console;
}

var console = getConsole();

function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

var regex = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(regex, function (_, c) {
    return c ? c.toUpperCase() : "";
  });
});

function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function insertNodeAt(fatherNode, node, position) {
  var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "f559":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__("5ca1");
var toLength = __webpack_require__("9def");
var context = __webpack_require__("d2c8");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__("5147")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
var es6_string_starts_with = __webpack_require__("f559");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: external {"commonjs":"sortablejs","commonjs2":"sortablejs","amd":"sortablejs","root":"Sortable"}
var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);

// EXTERNAL MODULE: ./src/util/helper.js
var helper = __webpack_require__("c649");

// CONCATENATED MODULE: ./src/vuedraggable.js












function buildAttribute(object, propName, value) {
  if (value === undefined) {
    return object;
  }

  object = object || {};
  object[propName] = value;
  return object;
}

function computeVmIndex(vnodes, element) {
  return vnodes.map(function (elt) {
    return elt.elm;
  }).indexOf(element);
}

function _computeIndexes(slots, children, isTransition, footerOffset) {
  if (!slots) {
    return [];
  }

  var elmFromNodes = slots.map(function (elt) {
    return elt.elm;
  });
  var footerIndex = children.length - footerOffset;

  var rawIndexes = _toConsumableArray(children).map(function (elt, idx) {
    return idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt);
  });

  return isTransition ? rawIndexes.filter(function (ind) {
    return ind !== -1;
  }) : rawIndexes;
}

function emit(evtName, evtData) {
  var _this = this;

  this.$nextTick(function () {
    return _this.$emit(evtName.toLowerCase(), evtData);
  });
}

function delegateAndEmit(evtName) {
  var _this2 = this;

  return function (evtData) {
    if (_this2.realList !== null) {
      _this2["onDrag" + evtName](evtData);
    }

    emit.call(_this2, evtName, evtData);
  };
}

function isTransitionName(name) {
  return ["transition-group", "TransitionGroup"].includes(name);
}

function vuedraggable_isTransition(slots) {
  if (!slots || slots.length !== 1) {
    return false;
  }

  var _slots = _slicedToArray(slots, 1),
      componentOptions = _slots[0].componentOptions;

  if (!componentOptions) {
    return false;
  }

  return isTransitionName(componentOptions.tag);
}

function getSlot(slot, scopedSlot, key) {
  return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : undefined);
}

function computeChildrenAndOffsets(children, slot, scopedSlot) {
  var headerOffset = 0;
  var footerOffset = 0;
  var header = getSlot(slot, scopedSlot, "header");

  if (header) {
    headerOffset = header.length;
    children = children ? [].concat(_toConsumableArray(header), _toConsumableArray(children)) : _toConsumableArray(header);
  }

  var footer = getSlot(slot, scopedSlot, "footer");

  if (footer) {
    footerOffset = footer.length;
    children = children ? [].concat(_toConsumableArray(children), _toConsumableArray(footer)) : _toConsumableArray(footer);
  }

  return {
    children: children,
    headerOffset: headerOffset,
    footerOffset: footerOffset
  };
}

function getComponentAttributes($attrs, componentData) {
  var attributes = null;

  var update = function update(name, value) {
    attributes = buildAttribute(attributes, name, value);
  };

  var attrs = Object.keys($attrs).filter(function (key) {
    return key === "id" || key.startsWith("data-");
  }).reduce(function (res, key) {
    res[key] = $attrs[key];
    return res;
  }, {});
  update("attrs", attrs);

  if (!componentData) {
    return attributes;
  }

  var on = componentData.on,
      props = componentData.props,
      componentDataAttrs = componentData.attrs;
  update("on", on);
  update("props", props);
  Object.assign(attributes.attrs, componentDataAttrs);
  return attributes;
}

var eventsListened = ["Start", "Add", "Remove", "Update", "End"];
var eventsToEmit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
var readonlyProperties = ["Move"].concat(eventsListened, eventsToEmit).map(function (evt) {
  return "on" + evt;
});
var draggingElement = null;
var props = {
  options: Object,
  list: {
    type: Array,
    required: false,
    default: null
  },
  value: {
    type: Array,
    required: false,
    default: null
  },
  noTransitionOnDrag: {
    type: Boolean,
    default: false
  },
  clone: {
    type: Function,
    default: function _default(original) {
      return original;
    }
  },
  element: {
    type: String,
    default: "div"
  },
  tag: {
    type: String,
    default: null
  },
  move: {
    type: Function,
    default: null
  },
  componentData: {
    type: Object,
    required: false,
    default: null
  }
};
var draggableComponent = {
  name: "draggable",
  inheritAttrs: false,
  props: props,
  data: function data() {
    return {
      transitionMode: false,
      noneFunctionalComponentMode: false
    };
  },
  render: function render(h) {
    var slots = this.$slots.default;
    this.transitionMode = vuedraggable_isTransition(slots);

    var _computeChildrenAndOf = computeChildrenAndOffsets(slots, this.$slots, this.$scopedSlots),
        children = _computeChildrenAndOf.children,
        headerOffset = _computeChildrenAndOf.headerOffset,
        footerOffset = _computeChildrenAndOf.footerOffset;

    this.headerOffset = headerOffset;
    this.footerOffset = footerOffset;
    var attributes = getComponentAttributes(this.$attrs, this.componentData);
    return h(this.getTag(), attributes, children);
  },
  created: function created() {
    if (this.list !== null && this.value !== null) {
      helper["b" /* console */].error("Value and list props are mutually exclusive! Please set one or another.");
    }

    if (this.element !== "div") {
      helper["b" /* console */].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props");
    }

    if (this.options !== undefined) {
      helper["b" /* console */].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() && !this.getIsFunctional();

    if (this.noneFunctionalComponentMode && this.transitionMode) {
      throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
    }

    var optionsAdded = {};
    eventsListened.forEach(function (elt) {
      optionsAdded["on" + elt] = delegateAndEmit.call(_this3, elt);
    });
    eventsToEmit.forEach(function (elt) {
      optionsAdded["on" + elt] = emit.bind(_this3, elt);
    });
    var attributes = Object.keys(this.$attrs).reduce(function (res, key) {
      res[Object(helper["a" /* camelize */])(key)] = _this3.$attrs[key];
      return res;
    }, {});
    var options = Object.assign({}, this.options, attributes, optionsAdded, {
      onMove: function onMove(evt, originalEvent) {
        return _this3.onDragMove(evt, originalEvent);
      }
    });
    !("draggable" in options) && (options.draggable = ">*");
    this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(this.rootContainer, options);
    this.computeIndexes();
  },
  beforeDestroy: function beforeDestroy() {
    if (this._sortable !== undefined) this._sortable.destroy();
  },
  computed: {
    rootContainer: function rootContainer() {
      return this.transitionMode ? this.$el.children[0] : this.$el;
    },
    realList: function realList() {
      return this.list ? this.list : this.value;
    }
  },
  watch: {
    options: {
      handler: function handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    $attrs: {
      handler: function handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    realList: function realList() {
      this.computeIndexes();
    }
  },
  methods: {
    getIsFunctional: function getIsFunctional() {
      var fnOptions = this._vnode.fnOptions;
      return fnOptions && fnOptions.functional;
    },
    getTag: function getTag() {
      return this.tag || this.element;
    },
    updateOptions: function updateOptions(newOptionValue) {
      for (var property in newOptionValue) {
        var value = Object(helper["a" /* camelize */])(property);

        if (readonlyProperties.indexOf(value) === -1) {
          this._sortable.option(value, newOptionValue[property]);
        }
      }
    },
    getChildrenNodes: function getChildrenNodes() {
      if (this.noneFunctionalComponentMode) {
        return this.$children[0].$slots.default;
      }

      var rawNodes = this.$slots.default;
      return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
    },
    computeIndexes: function computeIndexes() {
      var _this4 = this;

      this.$nextTick(function () {
        _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode, _this4.footerOffset);
      });
    },
    getUnderlyingVm: function getUnderlyingVm(htmlElt) {
      var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);

      if (index === -1) {
        //Edge case during move callback: related element might be
        //an element different from collection
        return null;
      }

      var element = this.realList[index];
      return {
        index: index,
        element: element
      };
    },
    getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
      var vue = _ref.__vue__;

      if (!vue || !vue.$options || !isTransitionName(vue.$options._componentTag)) {
        if (!("realList" in vue) && vue.$children.length === 1 && "realList" in vue.$children[0]) return vue.$children[0];
        return vue;
      }

      return vue.$parent;
    },
    emitChanges: function emitChanges(evt) {
      var _this5 = this;

      this.$nextTick(function () {
        _this5.$emit("change", evt);
      });
    },
    alterList: function alterList(onList) {
      if (this.list) {
        onList(this.list);
        return;
      }

      var newList = _toConsumableArray(this.value);

      onList(newList);
      this.$emit("input", newList);
    },
    spliceList: function spliceList() {
      var _arguments = arguments;

      var spliceList = function spliceList(list) {
        return list.splice.apply(list, _toConsumableArray(_arguments));
      };

      this.alterList(spliceList);
    },
    updatePosition: function updatePosition(oldIndex, newIndex) {
      var updatePosition = function updatePosition(list) {
        return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      };

      this.alterList(updatePosition);
    },
    getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
      var to = _ref2.to,
          related = _ref2.related;
      var component = this.getUnderlyingPotencialDraggableComponent(to);

      if (!component) {
        return {
          component: component
        };
      }

      var list = component.realList;
      var context = {
        list: list,
        component: component
      };

      if (to !== related && list && component.getUnderlyingVm) {
        var destination = component.getUnderlyingVm(related);

        if (destination) {
          return Object.assign(destination, context);
        }
      }

      return context;
    },
    getVmIndex: function getVmIndex(domIndex) {
      var indexes = this.visibleIndexes;
      var numberIndexes = indexes.length;
      return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
    },
    getComponent: function getComponent() {
      return this.$slots.default[0].componentInstance;
    },
    resetTransitionData: function resetTransitionData(index) {
      if (!this.noTransitionOnDrag || !this.transitionMode) {
        return;
      }

      var nodes = this.getChildrenNodes();
      nodes[index].data = null;
      var transitionContainer = this.getComponent();
      transitionContainer.children = [];
      transitionContainer.kept = undefined;
    },
    onDragStart: function onDragStart(evt) {
      this.context = this.getUnderlyingVm(evt.item);
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
    },
    onDragAdd: function onDragAdd(evt) {
      var element = evt.item._underlying_vm_;

      if (element === undefined) {
        return;
      }

      Object(helper["d" /* removeNode */])(evt.item);
      var newIndex = this.getVmIndex(evt.newIndex);
      this.spliceList(newIndex, 0, element);
      this.computeIndexes();
      var added = {
        element: element,
        newIndex: newIndex
      };
      this.emitChanges({
        added: added
      });
    },
    onDragRemove: function onDragRemove(evt) {
      Object(helper["c" /* insertNodeAt */])(this.rootContainer, evt.item, evt.oldIndex);

      if (evt.pullMode === "clone") {
        Object(helper["d" /* removeNode */])(evt.clone);
        return;
      }

      var oldIndex = this.context.index;
      this.spliceList(oldIndex, 1);
      var removed = {
        element: this.context.element,
        oldIndex: oldIndex
      };
      this.resetTransitionData(oldIndex);
      this.emitChanges({
        removed: removed
      });
    },
    onDragUpdate: function onDragUpdate(evt) {
      Object(helper["d" /* removeNode */])(evt.item);
      Object(helper["c" /* insertNodeAt */])(evt.from, evt.item, evt.oldIndex);
      var oldIndex = this.context.index;
      var newIndex = this.getVmIndex(evt.newIndex);
      this.updatePosition(oldIndex, newIndex);
      var moved = {
        element: this.context.element,
        oldIndex: oldIndex,
        newIndex: newIndex
      };
      this.emitChanges({
        moved: moved
      });
    },
    updateProperty: function updateProperty(evt, propertyName) {
      evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
    },
    computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
      if (!relatedContext.element) {
        return 0;
      }

      var domChildren = _toConsumableArray(evt.to.children).filter(function (el) {
        return el.style["display"] !== "none";
      });

      var currentDOMIndex = domChildren.indexOf(evt.related);
      var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
      var draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
    },
    onDragMove: function onDragMove(evt, originalEvent) {
      var onMove = this.move;

      if (!onMove || !this.realList) {
        return true;
      }

      var relatedContext = this.getRelatedContextFromMoveEvent(evt);
      var draggedContext = this.context;
      var futureIndex = this.computeFutureIndex(relatedContext, evt);
      Object.assign(draggedContext, {
        futureIndex: futureIndex
      });
      var sendEvt = Object.assign({}, evt, {
        relatedContext: relatedContext,
        draggedContext: draggedContext
      });
      return onMove(sendEvt, originalEvent);
    },
    onDragEnd: function onDragEnd() {
      this.computeIndexes();
      draggingElement = null;
    }
  }
};

if (typeof window !== "undefined" && "Vue" in window) {
  window.Vue.component("draggable", draggableComponent);
}

/* harmony default export */ var vuedraggable = (draggableComponent);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vuedraggable);



/***/ })

/******/ })["default"];
//# sourceMappingURL=vuedraggable.common.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/assets/js/api/Client.js":
/*!*******************************************!*\
  !*** ./resources/assets/js/api/Client.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  all: function all() {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('Client.all'));
  }
});

/***/ }),

/***/ "./resources/assets/js/api/Component.js":
/*!**********************************************!*\
  !*** ./resources/assets/js/api/Component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  all: function all(project_id, include) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('Component.all', {
      project_id: project_id,
      include: include || ''
    }));
  },
  sort: function sort(id, sort_order) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Component.sort', id), {
      sort_order: sort_order
    });
  },
  add: function add(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Component.store'), data);
  },
  "delete": function _delete(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"](route('Component.delete', id));
  },
  duplicate: function duplicate(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Component.duplicate'), data);
  },
  update: function update(id, data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Component.update', id), data);
  }
});

/***/ }),

/***/ "./resources/assets/js/api/Estimate.js":
/*!*********************************************!*\
  !*** ./resources/assets/js/api/Estimate.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  save: function save(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Estimate.save'), data);
  },
  getTimeAndCost: function getTimeAndCost(project_id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('Estimate.timeAndCost', {
      project_id: project_id
    }));
  },
  saveTimeAndCost: function saveTimeAndCost(project_id, data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Estimate.saveTimeAndCost'), {
      project_id: project_id,
      item: data
    });
  },
  resetTimeAndCost: function resetTimeAndCost(project_id) {
    /** it resets the values by removing the data from table */
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"](route('Estimate.resetTimeAndCost'), {
      params: {
        project_id: project_id
      }
    });
  }
});

/***/ }),

/***/ "./resources/assets/js/api/Helper.js":
/*!*******************************************!*\
  !*** ./resources/assets/js/api/Helper.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  deleteRows: function deleteRows(slug, ids) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"]("/app/".concat(slug), {
      params: {
        ids: ids
      }
    });
  },
  archiveRows: function archiveRows(slug, ids) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/app/".concat(slug, "/archive"), {
      ids: ids
    });
  },
  restoreRow: function restoreRow(slug, id, state) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.patch("/app/".concat(slug, "/").concat(id, "/restore"), {
      state: state
    });
  },
  getQuestions: function getQuestions(project_id, section) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('Question.all', {
      project_id: project_id,
      section: section
    }));
  },
  saveAnswer: function saveAnswer(project_id, data) {
    data.project_id = project_id;
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Answer.save'), data);
  },
  saveSort: function saveSort(list, model) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Helper.sort'), {
      list: list,
      model: model
    });
  }
});

/***/ }),

/***/ "./resources/assets/js/api/MediaManager.js":
/*!*************************************************!*\
  !*** ./resources/assets/js/api/MediaManager.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  saveDirectory: function saveDirectory(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('MediaManager.saveDirectory'), data);
  },
  "delete": function _delete(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"](route('MediaManager.delete'), {
      params: data
    });
  },
  getFilesByProject: function getFilesByProject(project_id, path, is_dir) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('MediaManager.byProject', {
      project_id: project_id,
      path: path ? path : '',
      is_dir: is_dir
    }));
  },
  upload: function upload(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('MediaManager.store'), data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  },
  uploadMultiple: function uploadMultiple(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('MediaManager.storeMultiple'), data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  },
  update: function update(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('MediaManager.update'), data);
  }
});

/***/ }),

/***/ "./resources/assets/js/api/Project.js":
/*!********************************************!*\
  !*** ./resources/assets/js/api/Project.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  all: function all(params) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('Project.all', params));
  },
  getTargetGroups: function getTargetGroups(project_id, qwidget_id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('Sales.TargetGroup.all', {
      id: project_id,
      qwidget_id: qwidget_id
    }));
  },
  saveTargetGroup: function saveTargetGroup(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Sales.TargetGroup.save', data.project_id), data);
  },
  getTypes: function getTypes() {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('Project.Types'));
  },
  get: function get(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('Project.get', {
      id: id
    }));
  },
  save: function save(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Project.save'), data);
  },
  saveRates: function saveRates(id, data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Project.saveRates'), {
      id: id,
      rates: data
    });
  }
});

/***/ }),

/***/ "./resources/assets/js/api/Question.js":
/*!*********************************************!*\
  !*** ./resources/assets/js/api/Question.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  update: function update(id, data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Question.update', id), data);
  },
  "delete": function _delete(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"](route('Question.delete', id));
  },
  duplicate: function duplicate(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Question.duplicate'), data);
  },
  add: function add(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('Question.store'), data);
  }
});

/***/ }),

/***/ "./resources/assets/js/api/UseCase.js":
/*!********************************************!*\
  !*** ./resources/assets/js/api/UseCase.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  all: function all(component_id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(route('UseCase.all', {
      component_id: component_id
    }));
  },
  add: function add(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('UseCase.store'), data);
  },
  sort: function sort(id, data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('UseCase.sort', id), data);
  },
  "delete": function _delete(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"](route('UseCase.delete', id));
  },
  duplicate: function duplicate(data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('UseCase.duplicate'), data);
  },
  update: function update(id, data) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(route('UseCase.update', id), data);
  }
});

/***/ }),

/***/ "./resources/assets/js/api/index.js":
/*!******************************************!*\
  !*** ./resources/assets/js/api/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ "./resources/assets/js/api/Helper.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./resources/assets/js/api/Project.js");
/* harmony import */ var _Client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Client */ "./resources/assets/js/api/Client.js");
/* harmony import */ var _MediaManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MediaManager */ "./resources/assets/js/api/MediaManager.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Component */ "./resources/assets/js/api/Component.js");
/* harmony import */ var _UseCase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UseCase */ "./resources/assets/js/api/UseCase.js");
/* harmony import */ var _Question__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Question */ "./resources/assets/js/api/Question.js");
/* harmony import */ var _Estimate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Estimate */ "./resources/assets/js/api/Estimate.js");








/* harmony default export */ __webpack_exports__["default"] = ({
  Helper: _Helper__WEBPACK_IMPORTED_MODULE_0__["default"],
  Client: _Client__WEBPACK_IMPORTED_MODULE_2__["default"],
  Project: _Project__WEBPACK_IMPORTED_MODULE_1__["default"],
  MediaManager: _MediaManager__WEBPACK_IMPORTED_MODULE_3__["default"],
  Component: _Component__WEBPACK_IMPORTED_MODULE_4__["default"],
  UseCase: _UseCase__WEBPACK_IMPORTED_MODULE_5__["default"],
  Question: _Question__WEBPACK_IMPORTED_MODULE_6__["default"],
  Estimate: _Estimate__WEBPACK_IMPORTED_MODULE_7__["default"]
});

/***/ }),

/***/ "./resources/assets/js/bootstrap.js":
/*!******************************************!*\
  !*** ./resources/assets/js/bootstrap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
// try {
//     window.$ = window.jQuery = require('jquery');
//     require('bootstrap-sass');
// } catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/***/ }),

/***/ "./resources/assets/js/components.js":
/*!*******************************************!*\
  !*** ./resources/assets/js/components.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var keen_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! keen-ui */ "./node_modules/keen-ui/dist/keen-ui.js");
/* harmony import */ var keen_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(keen_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dynamic_forms_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dynamic_forms.js */ "./resources/assets/js/dynamic_forms.js");
/* harmony import */ var _api_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/index */ "./resources/assets/js/api/index.js");
/* harmony import */ var _services_EventDispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/EventDispatcher */ "./resources/assets/js/services/EventDispatcher.js");
/* harmony import */ var _services_Notify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/Notify */ "./resources/assets/js/services/Notify.js");
/* harmony import */ var vue_content_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-content-loader */ "./node_modules/vue-content-loader/dist/vue-content-loader.es.js");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives */ "./resources/assets/js/directives.js");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_directives__WEBPACK_IMPORTED_MODULE_6__);
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
__webpack_require__(/*! ./bootstrap */ "./resources/assets/js/bootstrap.js");

window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");







Vue.prototype.$API = _api_index__WEBPACK_IMPORTED_MODULE_2__["default"];
Vue.prototype.$EventDispatcher = new _services_EventDispatcher__WEBPACK_IMPORTED_MODULE_3__["default"]();
Vue.prototype.$DynamicForm = _dynamic_forms_js__WEBPACK_IMPORTED_MODULE_1__["default"];
Vue.prototype.$notify = new _services_Notify__WEBPACK_IMPORTED_MODULE_4__["default"]();
/**
 * Reusable components
 */

Vue.component('content-loader', vue_content_loader__WEBPACK_IMPORTED_MODULE_5__["ContentLoader"]);
Vue.component('bullet-list-loader', vue_content_loader__WEBPACK_IMPORTED_MODULE_5__["BulletListLoader"]);
Vue.component('list-loader', vue_content_loader__WEBPACK_IMPORTED_MODULE_5__["ListLoader"]);
Vue.component('bulk-delete', __webpack_require__(/*! ./components/helpers/BulkDelete.vue */ "./resources/assets/js/components/helpers/BulkDelete.vue")["default"]);
Vue.component('bulk-archive', __webpack_require__(/*! ./components/helpers/BulkArchive.vue */ "./resources/assets/js/components/helpers/BulkArchive.vue")["default"]);
Vue.component('button-restore', __webpack_require__(/*! ./components/helpers/ButtonRestore.vue */ "./resources/assets/js/components/helpers/ButtonRestore.vue")["default"]);
Vue.component('draggable-list', __webpack_require__(/*! ./components/widgets/DraggableList.vue */ "./resources/assets/js/components/widgets/DraggableList.vue")["default"]);
Vue.component('nested-draggable-list', __webpack_require__(/*! ./components/widgets/NestedDraggableList.vue */ "./resources/assets/js/components/widgets/NestedDraggableList.vue")["default"]);
Vue.component('text-area', Vue.prototype.$DynamicForm.textArea);
Vue.component('text-input', Vue.prototype.$DynamicForm.textInput);
Vue.component('selection', Vue.prototype.$DynamicForm.selection);
Vue.component('radio-group', Vue.prototype.$DynamicForm.radioGroup);
Vue.component('check-group', Vue.prototype.$DynamicForm.checkGroup);
Vue.component('text-editor', __webpack_require__(/*! ./components/widgets/TextEditor.vue */ "./resources/assets/js/components/widgets/TextEditor.vue")["default"]);
Vue.component('button-to-input', __webpack_require__(/*! ./components/helpers/ButtonToInput.vue */ "./resources/assets/js/components/helpers/ButtonToInput.vue")["default"]);
Vue.component('personality-table-widget', __webpack_require__(/*! ./components/widgets/PersonalityTableWidget.vue */ "./resources/assets/js/components/widgets/PersonalityTableWidget.vue")["default"]);
Vue.component('signature-widget', __webpack_require__(/*! ./components/widgets/SignatureWidget.vue */ "./resources/assets/js/components/widgets/SignatureWidget.vue")["default"]);
Vue.component('estimates-widget', __webpack_require__(/*! ./components/widgets/EstimatesWidget.vue */ "./resources/assets/js/components/widgets/EstimatesWidget.vue")["default"]);
Vue.component('time-cost-widget', __webpack_require__(/*! ./components/widgets/TimeCostWidget.vue */ "./resources/assets/js/components/widgets/TimeCostWidget.vue")["default"]);
Vue.component('project-form', __webpack_require__(/*! ./components/projects/Form.vue */ "./resources/assets/js/components/projects/Form.vue")["default"]);
Vue.component('project-page', __webpack_require__(/*! ./components/projects/TabMenu.vue */ "./resources/assets/js/components/projects/TabMenu.vue")["default"]);
/** Heavy component will be compiled to another bundle */

Vue.component('project-list', function () {
  return Promise.all(/*! import() | js/project-list */[__webpack_require__.e("vendors~js/project-list"), __webpack_require__.e("js/project-list")]).then(__webpack_require__.bind(null, /*! ./components/projects/List.vue */ "./resources/assets/js/components/projects/List.vue"));
});
Vue.use(keen_ui__WEBPACK_IMPORTED_MODULE_0___default.a, {
  UiButton: {
    disableRipple: true
  },
  UiTooltip: {
    position: 'top'
  },
  UiSelect: {
    keys: function keys() {
      return {
        value: 'id',
        label: 'name'
      };
    }
  },
  UiTabs: {
    disableRipple: true
  },
  UiTab: {
    disableRipple: true
  }
});
var app = new Vue({
  el: '#vue-app'
});

/***/ }),

/***/ "./resources/assets/js/components/helpers/AutoSaveIndicator.vue":
/*!**********************************************************************!*\
  !*** ./resources/assets/js/components/helpers/AutoSaveIndicator.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AutoSaveIndicator_vue_vue_type_template_id_52cf081c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoSaveIndicator.vue?vue&type=template&id=52cf081c& */ "./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=template&id=52cf081c&");
/* harmony import */ var _AutoSaveIndicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoSaveIndicator.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AutoSaveIndicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AutoSaveIndicator_vue_vue_type_template_id_52cf081c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AutoSaveIndicator_vue_vue_type_template_id_52cf081c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/helpers/AutoSaveIndicator.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoSaveIndicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AutoSaveIndicator.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoSaveIndicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=template&id=52cf081c&":
/*!*****************************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=template&id=52cf081c& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoSaveIndicator_vue_vue_type_template_id_52cf081c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AutoSaveIndicator.vue?vue&type=template&id=52cf081c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/AutoSaveIndicator.vue?vue&type=template&id=52cf081c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoSaveIndicator_vue_vue_type_template_id_52cf081c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoSaveIndicator_vue_vue_type_template_id_52cf081c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/helpers/BulkArchive.vue":
/*!****************************************************************!*\
  !*** ./resources/assets/js/components/helpers/BulkArchive.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BulkArchive_vue_vue_type_template_id_39dbc25f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BulkArchive.vue?vue&type=template&id=39dbc25f& */ "./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=template&id=39dbc25f&");
/* harmony import */ var _BulkArchive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BulkArchive.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BulkArchive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BulkArchive_vue_vue_type_template_id_39dbc25f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BulkArchive_vue_vue_type_template_id_39dbc25f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/helpers/BulkArchive.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkArchive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BulkArchive.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkArchive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=template&id=39dbc25f&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=template&id=39dbc25f& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkArchive_vue_vue_type_template_id_39dbc25f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BulkArchive.vue?vue&type=template&id=39dbc25f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/BulkArchive.vue?vue&type=template&id=39dbc25f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkArchive_vue_vue_type_template_id_39dbc25f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkArchive_vue_vue_type_template_id_39dbc25f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/helpers/BulkDelete.vue":
/*!***************************************************************!*\
  !*** ./resources/assets/js/components/helpers/BulkDelete.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BulkDelete_vue_vue_type_template_id_165f761e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BulkDelete.vue?vue&type=template&id=165f761e& */ "./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=template&id=165f761e&");
/* harmony import */ var _BulkDelete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BulkDelete.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BulkDelete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BulkDelete_vue_vue_type_template_id_165f761e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BulkDelete_vue_vue_type_template_id_165f761e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/helpers/BulkDelete.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkDelete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BulkDelete.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkDelete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=template&id=165f761e&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=template&id=165f761e& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkDelete_vue_vue_type_template_id_165f761e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BulkDelete.vue?vue&type=template&id=165f761e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/BulkDelete.vue?vue&type=template&id=165f761e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkDelete_vue_vue_type_template_id_165f761e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkDelete_vue_vue_type_template_id_165f761e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/helpers/ButtonRestore.vue":
/*!******************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ButtonRestore.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ButtonRestore_vue_vue_type_template_id_6d36c24b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ButtonRestore.vue?vue&type=template&id=6d36c24b& */ "./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=template&id=6d36c24b&");
/* harmony import */ var _ButtonRestore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ButtonRestore.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ButtonRestore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ButtonRestore_vue_vue_type_template_id_6d36c24b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ButtonRestore_vue_vue_type_template_id_6d36c24b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/helpers/ButtonRestore.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonRestore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ButtonRestore.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonRestore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=template&id=6d36c24b&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=template&id=6d36c24b& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonRestore_vue_vue_type_template_id_6d36c24b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ButtonRestore.vue?vue&type=template&id=6d36c24b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ButtonRestore.vue?vue&type=template&id=6d36c24b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonRestore_vue_vue_type_template_id_6d36c24b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonRestore_vue_vue_type_template_id_6d36c24b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/helpers/ButtonToInput.vue":
/*!******************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ButtonToInput.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ButtonToInput_vue_vue_type_template_id_cb951568___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ButtonToInput.vue?vue&type=template&id=cb951568& */ "./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=template&id=cb951568&");
/* harmony import */ var _ButtonToInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ButtonToInput.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ButtonToInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ButtonToInput_vue_vue_type_template_id_cb951568___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ButtonToInput_vue_vue_type_template_id_cb951568___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/helpers/ButtonToInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonToInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ButtonToInput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonToInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=template&id=cb951568&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=template&id=cb951568& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonToInput_vue_vue_type_template_id_cb951568___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ButtonToInput.vue?vue&type=template&id=cb951568& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ButtonToInput.vue?vue&type=template&id=cb951568&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonToInput_vue_vue_type_template_id_cb951568___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonToInput_vue_vue_type_template_id_cb951568___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/helpers/ModalConfirm.vue":
/*!*****************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ModalConfirm.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalConfirm_vue_vue_type_template_id_4bc76ed4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalConfirm.vue?vue&type=template&id=4bc76ed4& */ "./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=template&id=4bc76ed4&");
/* harmony import */ var _ModalConfirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalConfirm.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalConfirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalConfirm_vue_vue_type_template_id_4bc76ed4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalConfirm_vue_vue_type_template_id_4bc76ed4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/helpers/ModalConfirm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalConfirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalConfirm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalConfirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=template&id=4bc76ed4&":
/*!************************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=template&id=4bc76ed4& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalConfirm_vue_vue_type_template_id_4bc76ed4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalConfirm.vue?vue&type=template&id=4bc76ed4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ModalConfirm.vue?vue&type=template&id=4bc76ed4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalConfirm_vue_vue_type_template_id_4bc76ed4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalConfirm_vue_vue_type_template_id_4bc76ed4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/helpers/ModalForm.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ModalForm.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalForm_vue_vue_type_template_id_01b5d960___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalForm.vue?vue&type=template&id=01b5d960& */ "./resources/assets/js/components/helpers/ModalForm.vue?vue&type=template&id=01b5d960&");
/* harmony import */ var _ModalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalForm.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/helpers/ModalForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalForm_vue_vue_type_template_id_01b5d960___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalForm_vue_vue_type_template_id_01b5d960___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/helpers/ModalForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/helpers/ModalForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ModalForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ModalForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/helpers/ModalForm.vue?vue&type=template&id=01b5d960&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/helpers/ModalForm.vue?vue&type=template&id=01b5d960& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalForm_vue_vue_type_template_id_01b5d960___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalForm.vue?vue&type=template&id=01b5d960& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/helpers/ModalForm.vue?vue&type=template&id=01b5d960&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalForm_vue_vue_type_template_id_01b5d960___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalForm_vue_vue_type_template_id_01b5d960___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/projects/Form.vue":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/projects/Form.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_ad08cf5c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=ad08cf5c& */ "./resources/assets/js/components/projects/Form.vue?vue&type=template&id=ad08cf5c&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_ad08cf5c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_ad08cf5c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/Form.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/projects/Form.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/Form.vue?vue&type=template&id=ad08cf5c&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/Form.vue?vue&type=template&id=ad08cf5c& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_ad08cf5c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=ad08cf5c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/Form.vue?vue&type=template&id=ad08cf5c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_ad08cf5c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_ad08cf5c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/projects/TabMenu.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/projects/TabMenu.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TabMenu_vue_vue_type_template_id_84a70f14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabMenu.vue?vue&type=template&id=84a70f14& */ "./resources/assets/js/components/projects/TabMenu.vue?vue&type=template&id=84a70f14&");
/* harmony import */ var _TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabMenu.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/TabMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TabMenu_vue_vue_type_template_id_84a70f14___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TabMenu_vue_vue_type_template_id_84a70f14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/TabMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/TabMenu.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/TabMenu.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TabMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/TabMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/TabMenu.vue?vue&type=template&id=84a70f14&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/TabMenu.vue?vue&type=template&id=84a70f14& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_84a70f14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TabMenu.vue?vue&type=template&id=84a70f14& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/TabMenu.vue?vue&type=template&id=84a70f14&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_84a70f14___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_84a70f14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/TabMenu.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/TabMenu.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TabMenu_vue_vue_type_template_id_44c922e3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabMenu.vue?vue&type=template&id=44c922e3& */ "./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=template&id=44c922e3&");
/* harmony import */ var _TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabMenu.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TabMenu_vue_vue_type_template_id_44c922e3___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TabMenu_vue_vue_type_template_id_44c922e3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/requirements/TabMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TabMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=template&id=44c922e3&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=template&id=44c922e3& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_44c922e3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TabMenu.vue?vue&type=template&id=44c922e3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/requirements/TabMenu.vue?vue&type=template&id=44c922e3&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_44c922e3___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_44c922e3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/projects/sales/TabMenu.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/TabMenu.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TabMenu_vue_vue_type_template_id_1fceb473___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabMenu.vue?vue&type=template&id=1fceb473& */ "./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=template&id=1fceb473&");
/* harmony import */ var _TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabMenu.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TabMenu_vue_vue_type_template_id_1fceb473___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TabMenu_vue_vue_type_template_id_1fceb473___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/sales/TabMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TabMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=template&id=1fceb473&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=template&id=1fceb473& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_1fceb473___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TabMenu.vue?vue&type=template&id=1fceb473& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/TabMenu.vue?vue&type=template&id=1fceb473&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_1fceb473___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TabMenu_vue_vue_type_template_id_1fceb473___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/DraggableList.vue":
/*!******************************************************************!*\
  !*** ./resources/assets/js/components/widgets/DraggableList.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DraggableList_vue_vue_type_template_id_4a8c4144___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DraggableList.vue?vue&type=template&id=4a8c4144& */ "./resources/assets/js/components/widgets/DraggableList.vue?vue&type=template&id=4a8c4144&");
/* harmony import */ var _DraggableList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DraggableList.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/DraggableList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DraggableList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DraggableList_vue_vue_type_template_id_4a8c4144___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DraggableList_vue_vue_type_template_id_4a8c4144___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/DraggableList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/DraggableList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/DraggableList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DraggableList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DraggableList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/DraggableList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DraggableList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/DraggableList.vue?vue&type=template&id=4a8c4144&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/DraggableList.vue?vue&type=template&id=4a8c4144& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DraggableList_vue_vue_type_template_id_4a8c4144___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DraggableList.vue?vue&type=template&id=4a8c4144& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/DraggableList.vue?vue&type=template&id=4a8c4144&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DraggableList_vue_vue_type_template_id_4a8c4144___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DraggableList_vue_vue_type_template_id_4a8c4144___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/EstimatesWidget.vue":
/*!********************************************************************!*\
  !*** ./resources/assets/js/components/widgets/EstimatesWidget.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EstimatesWidget_vue_vue_type_template_id_106149a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EstimatesWidget.vue?vue&type=template&id=106149a8& */ "./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=template&id=106149a8&");
/* harmony import */ var _EstimatesWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EstimatesWidget.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EstimatesWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EstimatesWidget_vue_vue_type_template_id_106149a8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EstimatesWidget_vue_vue_type_template_id_106149a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/EstimatesWidget.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimatesWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EstimatesWidget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimatesWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=template&id=106149a8&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=template&id=106149a8& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimatesWidget_vue_vue_type_template_id_106149a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EstimatesWidget.vue?vue&type=template&id=106149a8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/EstimatesWidget.vue?vue&type=template&id=106149a8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimatesWidget_vue_vue_type_template_id_106149a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimatesWidget_vue_vue_type_template_id_106149a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/NestedDraggableList.vue":
/*!************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/NestedDraggableList.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NestedDraggableList_vue_vue_type_template_id_6ac47f66_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NestedDraggableList.vue?vue&type=template&id=6ac47f66&scoped=true& */ "./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=template&id=6ac47f66&scoped=true&");
/* harmony import */ var _NestedDraggableList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NestedDraggableList.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _NestedDraggableList_vue_vue_type_style_index_0_id_6ac47f66_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css& */ "./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NestedDraggableList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NestedDraggableList_vue_vue_type_template_id_6ac47f66_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NestedDraggableList_vue_vue_type_template_id_6ac47f66_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6ac47f66",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/NestedDraggableList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NestedDraggableList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css&":
/*!*********************************************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_style_index_0_id_6ac47f66_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--5-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--5-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=style&index=0&id=6ac47f66&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_style_index_0_id_6ac47f66_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_style_index_0_id_6ac47f66_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_style_index_0_id_6ac47f66_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_style_index_0_id_6ac47f66_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_style_index_0_id_6ac47f66_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=template&id=6ac47f66&scoped=true&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=template&id=6ac47f66&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_template_id_6ac47f66_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NestedDraggableList.vue?vue&type=template&id=6ac47f66&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/NestedDraggableList.vue?vue&type=template&id=6ac47f66&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_template_id_6ac47f66_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NestedDraggableList_vue_vue_type_template_id_6ac47f66_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/PersonalityTableWidget.vue":
/*!***************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/PersonalityTableWidget.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PersonalityTableWidget_vue_vue_type_template_id_432afc8a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PersonalityTableWidget.vue?vue&type=template&id=432afc8a& */ "./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=template&id=432afc8a&");
/* harmony import */ var _PersonalityTableWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PersonalityTableWidget.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PersonalityTableWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PersonalityTableWidget_vue_vue_type_template_id_432afc8a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PersonalityTableWidget_vue_vue_type_template_id_432afc8a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/PersonalityTableWidget.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonalityTableWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PersonalityTableWidget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonalityTableWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=template&id=432afc8a&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=template&id=432afc8a& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonalityTableWidget_vue_vue_type_template_id_432afc8a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PersonalityTableWidget.vue?vue&type=template&id=432afc8a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/PersonalityTableWidget.vue?vue&type=template&id=432afc8a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonalityTableWidget_vue_vue_type_template_id_432afc8a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonalityTableWidget_vue_vue_type_template_id_432afc8a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/SignatureWidget.vue":
/*!********************************************************************!*\
  !*** ./resources/assets/js/components/widgets/SignatureWidget.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignatureWidget_vue_vue_type_template_id_a7270456___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignatureWidget.vue?vue&type=template&id=a7270456& */ "./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=template&id=a7270456&");
/* harmony import */ var _SignatureWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SignatureWidget.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SignatureWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SignatureWidget_vue_vue_type_template_id_a7270456___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SignatureWidget_vue_vue_type_template_id_a7270456___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/SignatureWidget.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignatureWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SignatureWidget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignatureWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=template&id=a7270456&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=template&id=a7270456& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SignatureWidget_vue_vue_type_template_id_a7270456___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SignatureWidget.vue?vue&type=template&id=a7270456& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/SignatureWidget.vue?vue&type=template&id=a7270456&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SignatureWidget_vue_vue_type_template_id_a7270456___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SignatureWidget_vue_vue_type_template_id_a7270456___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/TableParts/EstimateRow.vue":
/*!***************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TableParts/EstimateRow.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EstimateRow_vue_vue_type_template_id_10efb96c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EstimateRow.vue?vue&type=template&id=10efb96c& */ "./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=template&id=10efb96c&");
/* harmony import */ var _EstimateRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EstimateRow.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EstimateRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EstimateRow_vue_vue_type_template_id_10efb96c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EstimateRow_vue_vue_type_template_id_10efb96c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/TableParts/EstimateRow.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EstimateRow.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=template&id=10efb96c&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=template&id=10efb96c& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateRow_vue_vue_type_template_id_10efb96c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EstimateRow.vue?vue&type=template&id=10efb96c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TableParts/EstimateRow.vue?vue&type=template&id=10efb96c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateRow_vue_vue_type_template_id_10efb96c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateRow_vue_vue_type_template_id_10efb96c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue":
/*!***************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimeCostRow_vue_vue_type_template_id_4e315e1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeCostRow.vue?vue&type=template&id=4e315e1a& */ "./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=template&id=4e315e1a&");
/* harmony import */ var _TimeCostRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimeCostRow.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TimeCostRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TimeCostRow_vue_vue_type_template_id_4e315e1a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TimeCostRow_vue_vue_type_template_id_4e315e1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/TableParts/TimeCostRow.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TimeCostRow.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=template&id=4e315e1a&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=template&id=4e315e1a& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostRow_vue_vue_type_template_id_4e315e1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TimeCostRow.vue?vue&type=template&id=4e315e1a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TableParts/TimeCostRow.vue?vue&type=template&id=4e315e1a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostRow_vue_vue_type_template_id_4e315e1a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostRow_vue_vue_type_template_id_4e315e1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/TextEditor.vue":
/*!***************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TextEditor.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TextEditor_vue_vue_type_template_id_1fb48dd1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextEditor.vue?vue&type=template&id=1fb48dd1& */ "./resources/assets/js/components/widgets/TextEditor.vue?vue&type=template&id=1fb48dd1&");
/* harmony import */ var _TextEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextEditor.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/TextEditor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TextEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TextEditor_vue_vue_type_template_id_1fb48dd1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TextEditor_vue_vue_type_template_id_1fb48dd1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/TextEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/TextEditor.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TextEditor.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TextEditor.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TextEditor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/TextEditor.vue?vue&type=template&id=1fb48dd1&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TextEditor.vue?vue&type=template&id=1fb48dd1& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_template_id_1fb48dd1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TextEditor.vue?vue&type=template&id=1fb48dd1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TextEditor.vue?vue&type=template&id=1fb48dd1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_template_id_1fb48dd1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_template_id_1fb48dd1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/TimeCostWidget.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TimeCostWidget.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimeCostWidget_vue_vue_type_template_id_ba4dbb16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeCostWidget.vue?vue&type=template&id=ba4dbb16& */ "./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=template&id=ba4dbb16&");
/* harmony import */ var _TimeCostWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimeCostWidget.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TimeCostWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TimeCostWidget_vue_vue_type_template_id_ba4dbb16___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TimeCostWidget_vue_vue_type_template_id_ba4dbb16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/TimeCostWidget.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TimeCostWidget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=template&id=ba4dbb16&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=template&id=ba4dbb16& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostWidget_vue_vue_type_template_id_ba4dbb16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TimeCostWidget.vue?vue&type=template&id=ba4dbb16& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TimeCostWidget.vue?vue&type=template&id=ba4dbb16&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostWidget_vue_vue_type_template_id_ba4dbb16___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeCostWidget_vue_vue_type_template_id_ba4dbb16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/directives.js":
/*!*******************************************!*\
  !*** ./resources/assets/js/directives.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// import Vue from 'vue'
// Vue.directive('deep-model', {
//     bind(el, binding, vnode) {
//         el.addEventListener('input', e => {
//             new Function('obj', 'v', `obj.${binding.value} = v`)(vnode.context.$data, e.target.value);
//         });
//     },
//     unbind(el) {
//         el.removeEventListener('input');
//     },
//     inserted(el, binding, vnode) {
//         el.value = new Function('obj', `return obj.${binding.value}`)(vnode.context.$data);
//     },
//     update(el, binding, vnode) {
//         el.value = new Function('obj', `return obj.${binding.value}`)(vnode.context.$data);
//     }
// });

/***/ }),

/***/ "./resources/assets/js/dynamic_forms.js":
/*!**********************************************!*\
  !*** ./resources/assets/js/dynamic_forms.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Text input field component
var textInput = {
  props: {
    keyId: {
      required: true
    },
    label: {
      required: true
    },
    value: {
      required: true
    },
    placeholder: {
      required: false
    },
    autoSave: {
      required: false,
      "default": true
    }
  },
  data: function data() {
    return {
      getLabel: this.label,
      getValue: this.value
    };
  },
  created: function created() {
    var _this = this;

    this.debounceFn = _.debounce(function () {
      if (_this.autoSave) {
        _this.$EventDispatcher.fire('onAutoSave', {
          key: _this.keyId,
          label: _this.getLabel,
          value: _this.getValue,
          layout: 'text-input'
        });
      }
    }, 1000);
  },
  watch: {
    getValue: function getValue(newv, oldv) {
      if (oldv !== null) {
        this.debounceFn();
      }
    }
  },
  methods: {},
  template: "\n  <div class=\"form-group\">\n    <label class=\"text-label\">{{ getLabel }}</label>\n    <ui-textbox v-model=\"getValue\" :placeholder=\"placeholder\"></ui-textbox>\n  </div>\n  "
}; // Text input field component

var textArea = {
  props: {
    keyId: {
      required: true
    },
    label: {
      required: true
    },
    value: {
      required: true
    },
    placeholder: {
      required: false
    },
    autoSave: {
      required: false,
      "default": true
    }
  },
  data: function data() {
    return {
      getLabel: this.label,
      getValue: this.value
    };
  },
  created: function created() {
    var _this2 = this;

    this.debounceFn = _.debounce(function () {
      _this2.$EventDispatcher.fire('onAutoSave', {
        key: _this2.keyId,
        label: _this2.getLabel,
        value: _this2.getValue,
        layout: 'text-area'
      });
    }, 1000);
  },
  watch: {
    getValue: function getValue(newv, oldv) {
      if (oldv !== null) {
        this.debounceFn();
      }
    }
  },
  template: "\n  <div class=\"form-group\">\n    <label class=\"text-label\">{{ getLabel }}</label>\n    <ui-textbox :multi-line=\"true\" v-model=\"getValue\" :placeholder=\"placeholder\"></ui-textbox>\n  </div>\n  "
}; // Select input field component

var selection = {
  props: {
    keyId: {
      required: true
    },
    label: {
      required: true
    },
    value: {
      required: true
    },
    row: {
      type: Object,
      required: false
    },
    placeholder: {
      required: false
    },
    autoSave: {
      required: false,
      "default": true
    },
    customClass: {
      required: false,
      "default": 'col-md-4'
    }
  },
  data: function data() {
    return {
      getLabel: this.label,
      getValue: this.value || '',
      getOptions: this.row ? this.row.options : [],
      getClass: this.customClass || ''
    };
  },
  created: function created() {
    var _this3 = this;

    this.debounceFn = _.debounce(function () {
      _this3.$EventDispatcher.fire('onAutoSave', {
        key: _this3.keyId,
        label: _this3.getLabel,
        value: _this3.getValue,
        layout: 'selection'
      });
    }, 1000);
  },
  mounted: function mounted() {
    this.fireTriggerWidget();
  },
  watch: {
    getValue: function getValue(newv, oldv) {
      if (oldv !== null) {
        this.debounceFn();
        this.fireTriggerWidget();
      }
    }
  },
  methods: {
    fireTriggerWidget: function fireTriggerWidget() {
      // if this row has widget to trigger, emit the event
      if (this.row.trigger_widget) {
        this.$emit('triggerwidget', {
          key: this.keyId,
          value: this.getValue,
          widget: this.row.trigger_widget
        });
      }
    }
  },
  template: "\n  <div class=\"form-group\">\n    <label class=\"text-label\">{{ getLabel }}</label>\n    <div class=\"row col-sm-12\" :class=\"getClass\">\n      <ui-select\n          :options=\"getOptions\"\n          v-model=\"getValue\"\n          :placeholder=\"placeholder\"\n      ></ui-select>\n    </div>\n  </div>\n  "
};
var radioGroup = {
  props: {
    keyId: {
      required: true
    },
    label: {
      required: true
    },
    value: {
      required: true
    },
    row: {
      type: Object,
      required: false
    },
    placeholder: {
      required: false
    },
    name: {
      required: false
    },
    autoSave: {
      required: false,
      "default": true
    }
  },
  data: function data() {
    return {
      getLabel: this.label,
      getName: this.name || 'group-' + Math.random().toString(36).substring(7),
      getValue: this.value || '',
      getOptions: this.row ? this.row.options : []
    };
  },
  created: function created() {
    var _this4 = this;

    this.debounceFn = _.debounce(function () {
      _this4.$EventDispatcher.fire('onAutoSave', {
        key: _this4.keyId,
        name: _this4.getName,
        label: _this4.getLabel,
        value: _this4.getValue,
        layout: 'radio-group'
      });
    }, 1000);
  },
  mounted: function mounted() {
    this.fireTriggerWidget();
  },
  watch: {
    getValue: function getValue(newv, oldv) {
      if (oldv !== null) {
        this.debounceFn();
        this.fireTriggerWidget();
      }
    }
  },
  methods: {
    fireTriggerWidget: function fireTriggerWidget() {
      // if this row has widget to trigger, emit the event
      if (this.row.trigger_widget) {
        this.$emit('triggerwidget', {
          key: this.keyId,
          value: this.getValue,
          widget: this.row.trigger_widget
        });
      }
    }
  },
  template: "\n  <div class=\"form-group\">\n    <label class=\"text-label\">{{ getLabel }}</label>\n    <ui-radio-group\n      vertical\n      name=\"getName\"\n      :options=\"getOptions\"\n      v-model=\"getValue\"\n      class=\"col-sm-12\"\n    >\n    </ui-radio-group>\n  </div>\n  "
};
var checkGroup = {
  props: {
    keyId: {
      required: true
    },
    label: {
      required: true
    },
    value: {
      required: true,
      "default": []
    },
    row: {
      type: Object,
      required: false
    },
    //row.options is required
    autoSave: {
      required: false,
      "default": true
    }
  },
  data: function data() {
    var json_parsed = [];

    try {
      json_parsed = this.value ? JSON.parse(this.value) : [];
    } catch (e) {
      json_parsed = [];
    }

    return {
      getLabel: this.label,
      getValue: json_parsed && Array.isArray(json_parsed.checked_items) ? json_parsed.checked_items : [],
      getOptions: this.row ? this.row.options : []
    };
  },
  created: function created() {
    var _this5 = this;

    this.debounceFn = _.debounce(function () {
      var json_string = JSON.stringify({
        checked_items: _this5.getValue
      });

      _this5.$EventDispatcher.fire('onAutoSave', {
        key: _this5.keyId,
        label: _this5.getLabel,
        value: json_string,
        layout: 'check-group'
      });
    }, 1000);
  },
  mounted: function mounted() {
    this.fireTriggerWidget();
  },
  watch: {
    getValue: function getValue(newv, oldv) {
      if (oldv !== null) {
        this.debounceFn();
        this.fireTriggerWidget();
      }
    }
  },
  methods: {
    fireTriggerWidget: function fireTriggerWidget() {
      // if this row has widget to trigger, emit the event
      if (this.row.trigger_widget) {
        var json_string = JSON.stringify({
          checked_items: this.getValue
        });
        this.$emit('triggerwidget', {
          key: this.keyId,
          value: json_string,
          widget: this.row.trigger_widget
        });
      }
    }
  },
  template: "\n  <div class=\"form-group indent\">\n    <label class=\"text-label\">{{ getLabel }}</label>\n    <ui-checkbox-group\n        vertical\n        :options=\"getOptions\"\n        v-model=\"getValue\"\n    ></ui-checkbox-group>\n  </div>\n  "
};
/* harmony default export */ __webpack_exports__["default"] = ({
  textInput: textInput,
  textArea: textArea,
  selection: selection,
  radioGroup: radioGroup,
  checkGroup: checkGroup
});

/***/ }),

/***/ "./resources/assets/js/services/EventDispatcher.js":
/*!*********************************************************!*\
  !*** ./resources/assets/js/services/EventDispatcher.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventDispatcher; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);

    this.vue = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();
  }

  _createClass(EventDispatcher, [{
    key: "fire",
    value: function fire(event) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.vue.$emit(event, data);
    }
  }, {
    key: "listen",
    value: function listen(event, callback) {
      this.vue.$on(event, callback);
    }
  }]);

  return EventDispatcher;
}();



/***/ }),

/***/ "./resources/assets/js/services/Notify.js":
/*!************************************************!*\
  !*** ./resources/assets/js/services/Notify.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Notify; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Notify = /*#__PURE__*/function () {
  function Notify() {
    _classCallCheck(this, Notify);

    this.vue = new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
      el: '#vue-app-notices',
      components: {
        'auto-save-indicator': __webpack_require__(/*! ../components/helpers/AutoSaveIndicator.vue */ "./resources/assets/js/components/helpers/AutoSaveIndicator.vue")["default"]
      }
    });
    this.indicator = this.vue.$refs.autoSaveIndicator;
  }

  _createClass(Notify, [{
    key: "message",
    value: function message(_message) {
      this.indicator.message(_message);
    }
  }, {
    key: "success",
    value: function success(message) {
      this.indicator.success(message);
    }
  }, {
    key: "error",
    value: function error(message) {
      this.indicator.error(message);
    }
  }, {
    key: "errors",
    value: function errors(_errors) {
      this.indicator.error(_errors.join(", "));
    }
  }, {
    key: "clear",
    value: function clear() {
      this.indicator.clear();
    }
  }, {
    key: "responseError",
    value: function responseError(resp) {
      if (resp && resp.data) {
        var errors = resp.data.errors;
        var errorBag = [];
        Object.keys(errors).forEach(function (key) {
          errorBag.push(errors[key]);
        });
        this.indicator.error(errorBag.join(", "));
      }
    }
  }]);

  return Notify;
}();



/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./resources/assets/js/components.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/vagrant/Code/rgt-website/resources/assets/js/components.js */"./resources/assets/js/components.js");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);