(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/sales-bundle"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id'],
  data: function data() {
    return {
      questions: [],
      project_id: this.id,
      test_value: null,
      show_widget: false
    };
  },
  created: function created() {
    var _this = this;

    this.$EventDispatcher.listen('onBACallTabLoad', function () {
      _this.getQuestions();
    });
  },
  components: {
    'target-group-widget': __webpack_require__(/*! ../../widgets/TargetGroupWidget.vue */ "./resources/assets/js/components/widgets/TargetGroupWidget.vue")["default"],
    'monetize-list-widget': __webpack_require__(/*! ../../widgets/MonetizeListWidget.vue */ "./resources/assets/js/components/widgets/MonetizeListWidget.vue")["default"]
  },
  methods: {
    getQuestions: function getQuestions() {
      var _this2 = this;

      this.$API.Helper.getQuestions(this.project_id, 'ba-call').then(function (res) {
        _this2.questions = res.data;
      });
    },
    onWidgetTrigger: function onWidgetTrigger(data) {
      this.show_widget = false;

      if (data) {
        if (data.widget == 'target-group-widget') {
          /**
           * string.includes() is introduced in es6 and old browsers does not support it
           * to make it work, we can add a polyfill
           * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes 
           *
           */
          var value = data.value ? data.value.toLowerCase().trim() : "";

          if (value.includes('customer')) {
            this.show_widget = true;
          }
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=script&lang=js& ***!
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
var downloader = __webpack_require__(/*! downloadjs */ "./node_modules/downloadjs/download.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id'],
  data: function data() {
    return {
      fileList: [],
      backPath: {
        path: '',
        name: ''
      },
      projectPath: "public/projects/".concat(this.id),
      currentPath: this.projectPath,
      uploadList: [],
      contextMenu: [{
        key: 'rename',
        name: 'Rename'
      }, {
        key: 'delete',
        name: 'Delete'
      }],
      sortDir: '',
      loading: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$EventDispatcher.listen('onDocTabLoad', function () {
      _this.getFilesByProject('', true, 'forward');
    });
  },
  methods: {
    // New Folder will create a new folder on top of the list 
    newFolder: function newFolder() {
      var _this2 = this;

      var data = {
        name: 'New Folder',
        path: this.currentPath
      };
      this.$API.MediaManager.saveDirectory(data).then(function (res2) {
        _this2.$notify.success('Folder created!');

        _this2.getFilesByProject(data.path, true);
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    goBack: function goBack(path) {
      /* Only limit backward to the project dir */
      if (path == 'public/projects' || path == this.projectPath) {
        alert("You are already in the root directory.");
        return false;
      }

      this.getFilesByProject(path, true, 'backward');
    },
    getFilesByProject: function getFilesByProject(path, is_dir) {
      var _this3 = this;

      var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'forward';

      if (direction == 'backward') {
        path = this.backPath.path;
      }

      this.loading = true;
      this.$API.MediaManager.getFilesByProject(this.id, path, is_dir).then(function (res) {
        var result = res.data;

        if (result.success) {
          _this3.fileList = result.data.folders;
          _this3.currentPath = result.data.path;
          _this3.backPath.path = result.data.parent_path;
          _this3.projectPath = result.data.project_path;
          Array.prototype.push.apply(_this3.fileList, result.data.files);
        } else {
          /* Downloads the file directly from the browser */
          downloader(path);
        }
      })["catch"](function (error) {
        console.log(error.response);
      }).then(function () {
        _this3.sortDir = '';
        _this3.loading = false;
      });
    },
    sort: function sort() {
      var sort = this.sortDir || 'asc',
          self = this;
      this.fileList.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        var returnValue = 0;

        if (sort == 'asc') {
          returnValue = textA < textB ? -1 : textA > textB ? 1 : 0;
          self.sortDir = 'desc';
        } else {
          returnValue = textB < textA ? -1 : textB > textA ? 1 : 0;
          self.sortDir = 'asc';
        }

        return returnValue;
      });
    },

    /**
     *
     * Handle upload functions
     *
     */
    handleFileUpload: function handleFileUpload(files, event) {
      var _this4 = this;

      var file,
          self = this;
      this.$notify.message('Uploading...'); // loop through files

      for (var i = 0; i < files.length; i++) {
        // get item
        file = files.item(i);
        var form = new FormData();
        form.append('file', file);
        form.append('current_path', this.currentPath);
        this.$API.MediaManager.upload(form).then(function (res) {
          if (res.status == 200) {
            _this4.getFilesByProject(self.currentPath, true);

            _this4.uploadList = [];

            _this4.$refs.refFileUploader.clear();
          }
        });
      }
    },
    showConfirm: function showConfirm(ref, file) {
      var html = file.is_dir ? "Are you sure you want to permanently delete this folder and all the files contained in it?" : "Are you sure you want to permanently delete this file?";
      this.$refs[ref].set({
        title: "Delete ".concat(file.is_dir ? 'Folder' : 'File', "?"),
        html: html,
        confirmButtonText: 'Delete'
      }, file).open();
    },
    onConfirmDelete: function onConfirmDelete(file) {
      var self = this;
      self.$API.MediaManager["delete"](file).then(function (res) {
        var success = res.data.success;

        if (success) {
          self.getFilesByProject(self.currentPath, true);
        } else {
          self.$notify.error('Something went wrong!');
        }
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    showEdit: function showEdit(ref, file) {
      var dir_path = file.is_dir ? file.parent_path : file.dir_path;
      /**
       * Note: This uses ModalForm.vue, a component accepting dynamic fields
       * @params options for Modal options such as Title
       * @params form for Modal form containing the field info
       */

      this.$refs[ref].set({
        title: "Rename ".concat(file.is_dir ? 'Folder' : 'File'),
        html: '',
        confirmButtonText: 'Save'
      }, [{
        field: 'name',
        layout: 'text-input',
        label: 'Name',
        value: file.name,
        hidden: false,
        required: true
      }, {
        field: 'original',
        layout: 'text-input',
        label: 'Original',
        value: file.name,
        hidden: true,
        required: true
      }, {
        field: 'dir_path',
        layout: 'text-input',
        label: 'Path',
        value: dir_path,
        hidden: true,
        required: true
      }, {
        field: 'is_dir',
        layout: 'text-input',
        label: 'Type',
        value: file.is_dir.toString(),
        hidden: true,
        required: true
      }]).open();
    },
    onRename: function onRename(file) {
      var _this5 = this;

      var self = this;

      if (!file.name) {
        this.$notify.error('Invalid name');
        return;
      }

      this.$notify.message('Renaming...');
      self.$API.MediaManager.update(file).then(function (res) {
        var success = res.data.success;

        if (success) {
          self.getFilesByProject(self.currentPath, true);
          self.$notify.success('Renamed!');
        } else {
          self.$notify.error(res.data.message);
        }
      })["catch"](function (error) {
        console.log(error.response);

        _this5.$notify.error(error.response);
      });
    }
  },
  components: {
    'modal-confirm': __webpack_require__(/*! ../../helpers/ModalConfirm.vue */ "./resources/assets/js/components/helpers/ModalConfirm.vue")["default"],
    'modal-form': __webpack_require__(/*! ../../helpers/ModalForm.vue */ "./resources/assets/js/components/helpers/ModalForm.vue")["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id'],
  data: function data() {
    return {
      questions: [],
      answers: [],
      project_id: this.id,
      other_note_field: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (route().current('Project.sales')) {
      this.getQuestions();
    }

    this.$EventDispatcher.listen('onSalesTabLoad', function () {
      if (route().current('Project.sales')) {
        _this.getQuestions();
      } else {
        location.href = route('Project.sales', _this.project_id);
      }
    });
    this.$EventDispatcher.listen('onSalesTabLoad', function (data) {
      _this.getQuestions();
    });
    this.$EventDispatcher.listen('onAutoSave', function (data) {
      _this.saveAnswer(data);
    });
  },
  methods: {
    getQuestions: function getQuestions() {
      var _this2 = this;

      this.$API.Helper.getQuestions(this.project_id, 'sales-call').then(function (res) {
        _this2.questions = res.data;
        _this2.other_note_field = _.find(res.data, {
          'trigger_widget': 'field_other_note'
        });
      });
    },
    saveAnswer: function saveAnswer(data) {
      var _this3 = this;

      this.$notify.message('Saving...');
      this.$API.Helper.saveAnswer(this.project_id, data).then(function (res) {
        _this3.$notify.success('All changes are saved!');
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    projectId: {
      required: true
    },
    keyId: {
      required: true
    },
    value: {
      required: true,
      "default": ''
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
      options: [{
        label: 'Ad revenue',
        value: 'Ad revenue',
        radio_options: []
      }, {
        label: 'Subscription fee',
        value: 'Subscription fee',
        radio_field: 'subscription_radio',
        radio_options: ['Monthly', 'Annual', 'Both monthly and annual']
      }, {
        label: 'One-time fee',
        value: 'One-time fee',
        radio_options: []
      }, {
        label: 'Fee per transaction',
        value: 'Fee per transactione',
        radio_options: []
      }],

      /* Structure to handle dynamic radio v-model binding */
      selected_radio: {
        subscription_radio: json_parsed ? json_parsed.selected_radio.subscription_radio : '' // fee_radio: json_parsed ? json_parsed.selected_radio.fee_radio : '',

      },

      /* Holder of selected check items */
      checked_items: json_parsed && json_parsed.checked_items ? json_parsed.checked_items : [],

      /* On the fly adding of check items */
      customlist: json_parsed && json_parsed.customlist ? json_parsed.customlist : [],
      custominput: ''
    };
  },
  watch: {
    'checked_items': function checked_items(newv, oldv) {
      this.save();
    },
    'selected_radio.subscription_radio': function selected_radioSubscription_radio(newv, oldv) {
      if (oldv !== null && !_.isEqual(newv, oldv)) {
        this.save();
      }
    }
  },
  methods: {
    add: function add(validate) {
      if (!this.custominput && validate) {
        this.$notify.error("Input value is required");
        return;
      } else if (!this.custominput) {
        return;
      }
      /* push to render */


      this.customlist.push(this.custominput);
      /* clear input box */

      this.custominput = '';
      this.save();
    },
    onCustomChange: function onCustomChange(value) {
      if (!value) {
        //if unchecked, remove from list
        this.customlist = _.compact(this.customlist); //removes empty, false, null, undefined

        this.save();
      }
    },
    save: function save() {
      var _this = this;

      var json_string = JSON.stringify({
        checked_items: this.checked_items,
        selected_radio: this.selected_radio,
        customlist: this.customlist
      });
      var data = {
        key: this.keyId,
        value: json_string,
        layout: 'monetize-list-widget'
      };
      this.$notify.message('Saving...');
      this.$API.Helper.saveAnswer(this.projectId, data).then(function (res) {
        _this.$notify.success('Saved!');
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    projectId: {
      required: true
    },
    qWidgetId: {
      required: true
    }
  },
  data: function data() {
    return {
      groups: [],
      selectedGroup: {},
      emptyForm: {
        id: null,
        name: null,
        user_able_to_do: null,
        user_access_to: null,
        user_main_actions: null,
        demographics: {
          age: null,
          location: null,
          gender: null,
          income_level: null,
          occupation: null,
          education_level: null
        },
        psychographics: {
          personality: null,
          interest: null
        }
      },
      dragging: false
    };
  },
  created: function created() {
    this.selectedGroup = this.emptyForm;
  },
  mounted: function mounted() {
    var _this = this;

    this.$API.Project.getTargetGroups(this.projectId, this.qWidgetId).then(function (res) {
      _this.groups = res.data;
    });
  },
  methods: {
    selectGroup: function selectGroup(group) {
      this.selectedGroup = group;
    },
    save: function save() {
      var _this2 = this;

      if (!this.selectedGroup.name) return toastr.error('Target group name is required'); // return this.$message.error('Target group name is required')

      this.$notify.message('Saving...');
      this.selectedGroup.project_id = this.projectId;
      this.selectedGroup.question_widget_id = this.qWidgetId;
      this.$API.Project.saveTargetGroup(this.selectedGroup).then(function (res) {
        var result = res.data;
        var record = result.record;

        if (result.is_new) {
          _this2.groups.push(record);

          _this2.$notify.success('Created!');
        } else {
          _this2.$notify.success('Saved!');
        }

        _this2.selectedGroup = record;
      });
    },
    // execute newinput event from ButtonToInput.vue component
    onNewInput: function onNewInput(data) {
      // reset the form
      this.selectedGroup = this.emptyForm; // set the name

      this.selectedGroup.name = data.value; // call save to database

      this.save();
    },
    onDragEnd: function onDragEnd(e) {
      var _this3 = this;

      this.dragging = false;
      this.$notify.message('Saving...'); // get the ids with new order indexes

      var ids = [];
      $('li.list-group-item').each(function () {
        ids.push($(this).attr('data-id'));
      });

      if (ids) {
        this.$API.Helper.saveSort(ids, 'TargetGroup').then(function (res) {
          _this3.$notify.success('Saved!');
        });
      }
    }
  },
  components: {
    'button-to-input': __webpack_require__(/*! ../helpers/ButtonToInput.vue */ "./resources/assets/js/components/helpers/ButtonToInput.vue")["default"],
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_0___default.a
  }
});

/***/ }),

/***/ "./node_modules/downloadjs/download.js":
/*!*********************************************!*\
  !*** ./node_modules/downloadjs/download.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}else{//not data url, is it a string with special needs?
			if(/([\x80-\xff])/.test(payload)){			  
				var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
				for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
			 	payload=new myBlob([tempUiArr], {type: mimeType});
			}		  
		}
		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode && /^data:/.test(url)){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=template&id=7bcfd957&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=template&id=7bcfd957& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "ba-call" }, [
    _c(
      "div",
      { staticClass: "row" },
      [
        _vm._l(_vm.questions, function(row, index) {
          return [
            _c(
              "div",
              { key: index, staticClass: "dynamic-form col-sm-12" },
              [
                row.layout != "widget"
                  ? _c(
                      "div",
                      { staticClass: "col-sm-12" },
                      [
                        _c(row.layout, {
                          ref: "questionRow" + row.id,
                          refInFor: true,
                          tag: "component",
                          attrs: {
                            label: row.question,
                            "key-id": row.id,
                            value: row.answer.answer,
                            row: row
                          },
                          on: {
                            "update:value": function($event) {
                              return _vm.$set(row.answer, "answer", $event)
                            },
                            triggerwidget: _vm.onWidgetTrigger
                          }
                        })
                      ],
                      1
                    )
                  : _c("div", { staticClass: "col-sm-12" }, [
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", { staticClass: "text-label" }, [
                          _vm._v(_vm._s(row.question))
                        ])
                      ])
                    ]),
                _vm._v(" "),
                _c("div", { staticClass: "clearfix" }),
                _vm._v(" "),
                _vm._l(row.widgets, function(widget) {
                  return [
                    !widget.trigger_code
                      ? _c(
                          "div",
                          { key: "w" + widget.id },
                          [
                            _c(widget.widget_name, {
                              ref: "questionWidget" + widget.id,
                              refInFor: true,
                              tag: "component",
                              attrs: {
                                "project-id": _vm.id,
                                "key-id": row.id,
                                value: row.answer.answer,
                                "q-widget-id": widget.id
                              },
                              on: {
                                "update:value": function($event) {
                                  return _vm.$set(row.answer, "answer", $event)
                                }
                              }
                            })
                          ],
                          1
                        )
                      : _c(
                          "div",
                          { key: "w" + widget.id },
                          [
                            _c(widget.widget_name, {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.show_widget,
                                  expression: "show_widget"
                                }
                              ],
                              ref: "questionWidget" + widget.id,
                              refInFor: true,
                              tag: "component",
                              attrs: {
                                "project-id": _vm.id,
                                "key-id": row.id,
                                value: row.answer.answer,
                                "q-widget-id": widget.id
                              },
                              on: {
                                "update:value": function($event) {
                                  return _vm.$set(row.answer, "answer", $event)
                                }
                              }
                            })
                          ],
                          1
                        )
                  ]
                })
              ],
              2
            )
          ]
        })
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=template&id=e9c341ae&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=template&id=e9c341ae& ***!
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
    { staticClass: "media-manager" },
    [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-sm-12" }, [
          _c(
            "div",
            { staticClass: "flex" },
            [
              _c(
                "ui-fileupload",
                {
                  ref: "refFileUploader",
                  attrs: { multiple: "", name: "media" },
                  on: { change: _vm.handleFileUpload }
                },
                [_vm._v("+ Upload Files")]
              ),
              _vm._v(" "),
              _c(
                "ui-button",
                { staticClass: "ml-1", on: { click: _vm.newFolder } },
                [_vm._v("+ New Folder")]
              )
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-6" }, [
          _c(
            "ul",
            { staticClass: "list-group" },
            [
              _c("li", { staticClass: "list-group-item list-header active" }, [
                _c(
                  "div",
                  { staticClass: "flex w100" },
                  [
                    _c(
                      "h5",
                      {
                        staticClass: "flex-grow-1 cursor-pointer",
                        on: { click: _vm.sort }
                      },
                      [
                        _vm._v("Name "),
                        _c("i", {
                          class: {
                            "voyager-angle-down": _vm.sortDir == "asc",
                            "voyager-angle-up": _vm.sortDir == "desc"
                          }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "ui-button",
                      {
                        staticClass: "pull-right",
                        attrs: {
                          icon: "arrow_back",
                          disabled: _vm.currentPath == _vm.projectPath
                        },
                        on: {
                          click: function($event) {
                            return _vm.goBack(_vm.backPath.path)
                          }
                        }
                      },
                      [_vm._v("Back")]
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _vm.fileList.length <= 0
                ? _c(
                    "li",
                    { staticClass: "list-group-item" },
                    [
                      _vm.loading
                        ? _c("ui-progress-circular", {
                            attrs: { color: "multi-color" }
                          })
                        : _c("span", [_vm._v("No Files")])
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.fileList, function(file, idx) {
                return [
                  _c(
                    "li",
                    {
                      key: idx,
                      staticClass: "list-group-item cursor-pointer",
                      attrs: { id: "file-item-" + idx }
                    },
                    [
                      _c("div", { staticClass: "flex w100" }, [
                        _c(
                          "div",
                          {
                            staticClass: "flex flex-grow-1",
                            on: {
                              click: function($event) {
                                return _vm.getFilesByProject(
                                  file.path,
                                  file.is_dir
                                )
                              }
                            }
                          },
                          [
                            file.is_dir
                              ? _c("i", { staticClass: "voyager-folder" })
                              : _vm._e(),
                            _vm._v(" "),
                            _c("span", { staticClass: "text-label" }, [
                              _vm._v(_vm._s(file.name))
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "material-icons",
                            on: {
                              click: function($event) {
                                return _vm.showEdit("refModalEdit", file)
                              }
                            }
                          },
                          [_vm._v("edit")]
                        ),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "material-icons",
                            on: {
                              click: function($event) {
                                return _vm.showConfirm("refConfirmDelete", file)
                              }
                            }
                          },
                          [_vm._v("delete")]
                        )
                      ])
                    ]
                  )
                ]
              })
            ],
            2
          )
        ])
      ]),
      _vm._v(" "),
      _c("modal-confirm", {
        ref: "refConfirmDelete",
        attrs: { name: "deleteModal" },
        on: { confirm: _vm.onConfirmDelete }
      }),
      _vm._v(" "),
      _c("modal-form", {
        ref: "refModalEdit",
        attrs: { name: "editModal" },
        on: { save: _vm.onRename }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=template&id=2531b5dc&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=template&id=2531b5dc& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "sales-call" }, [
    _c("div", { staticClass: "row" }, [
      _c(
        "div",
        { staticClass: "col-sm-12 col-md-8" },
        [
          _vm.questions && !_vm.questions.length
            ? _c("ui-progress-circular", { attrs: { color: "multi-color" } })
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.questions, function(row) {
            return [
              row.trigger_widget != "field_other_note"
                ? _c(
                    "div",
                    { key: row.id, staticClass: "dynamic-form" },
                    [
                      _c(row.layout, {
                        ref: "questionRow" + row.id,
                        refInFor: true,
                        tag: "component",
                        attrs: {
                          label: row.question,
                          "key-id": row.id,
                          value: row.answer.answer,
                          row: row
                        },
                        on: {
                          "update:value": function($event) {
                            return _vm.$set(row.answer, "answer", $event)
                          }
                        }
                      })
                    ],
                    1
                  )
                : _vm._e()
            ]
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm.other_note_field
        ? _c("div", { staticClass: "col-sm-12 col-md-4" }, [
            _c(
              "div",
              { key: _vm.other_note_field.id, staticClass: "dynamic-form" },
              [
                _c(_vm.other_note_field.layout, {
                  ref: "questionRow" + _vm.other_note_field.id,
                  tag: "component",
                  attrs: {
                    label: _vm.other_note_field.question,
                    "key-id": _vm.other_note_field.id,
                    value: _vm.other_note_field.answer.answer,
                    placeholder: "Add other notes here"
                  },
                  on: {
                    "update:value": function($event) {
                      return _vm.$set(
                        _vm.other_note_field.answer,
                        "answer",
                        $event
                      )
                    }
                  }
                })
              ],
              1
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=template&id=349a151c&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=template&id=349a151c& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "col-sm-12 widget monetize-list-widget" }, [
    _c("div", { staticClass: "col-sm-12" }, [
      _c(
        "div",
        { staticClass: "checkbox-group col-sm-12" },
        [
          _vm._l(_vm.options, function(check, index) {
            return [
              _c("div", { key: index, staticClass: "row" }, [
                _c(
                  "div",
                  { key: "mcheckbox" + index, staticClass: "form-group" },
                  [
                    _c(
                      "ui-checkbox",
                      {
                        attrs: { name: "monetize", "true-value": check.label },
                        model: {
                          value: _vm.checked_items[index],
                          callback: function($$v) {
                            _vm.$set(_vm.checked_items, index, $$v)
                          },
                          expression: "checked_items[index]"
                        }
                      },
                      [_vm._v(_vm._s(check.label))]
                    ),
                    _vm._v(" "),
                    check.radio_options && check.radio_options.length
                      ? [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.checked_items[index],
                                  expression: "checked_items[index]"
                                }
                              ],
                              key: "mradio" + index,
                              staticClass: "col-sm-12"
                            },
                            [
                              _c("ui-radio-group", {
                                attrs: {
                                  vertical: "",
                                  name: check.radio_field,
                                  options: check.radio_options
                                },
                                model: {
                                  value: _vm.selected_radio[check.radio_field],
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.selected_radio,
                                      check.radio_field,
                                      $$v
                                    )
                                  },
                                  expression:
                                    "selected_radio[check.radio_field]"
                                }
                              })
                            ],
                            1
                          )
                        ]
                      : _vm._e()
                  ],
                  2
                )
              ])
            ]
          }),
          _vm._v(" "),
          _vm.customlist && _vm.customlist.length
            ? [
                _c(
                  "div",
                  { staticClass: "row" },
                  _vm._l(_vm.customlist, function(item, index) {
                    return _c(
                      "div",
                      { key: "mcustom" + index, staticClass: "form-group" },
                      [
                        _c(
                          "ui-checkbox",
                          {
                            attrs: { name: "monetize", "true-value": item },
                            on: { change: _vm.onCustomChange },
                            model: {
                              value: _vm.customlist[index],
                              callback: function($$v) {
                                _vm.$set(_vm.customlist, index, $$v)
                              },
                              expression: "customlist[index]"
                            }
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(item) +
                                "\n                        "
                            )
                          ]
                        )
                      ],
                      1
                    )
                  }),
                  0
                )
              ]
            : _vm._e()
        ],
        2
      )
    ]),
    _vm._v(" "),
    _vm.custominput
      ? _c("div", { staticClass: "bottom-quick-add-input col-sm-12" }, [
          _c(
            "div",
            { staticClass: "flex" },
            [
              _c("ui-textbox", {
                attrs: { placeholder: "Others", autofocus: true },
                on: {
                  "keydown-enter": function($event) {
                    return _vm.add()
                  }
                },
                model: {
                  value: _vm.custominput,
                  callback: function($$v) {
                    _vm.custominput = $$v
                  },
                  expression: "custominput"
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
                        return _vm.add(true)
                      }
                    }
                  },
                  [
                    _c("span", { staticClass: "material-icons" }, [
                      _vm._v(" + ")
                    ])
                  ]
                )
              ])
            ],
            1
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=template&id=112e466a&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=template&id=112e466a& ***!
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
  return _c("div", { staticClass: "widget target-group-widget" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "col-sm-12" }, [
      _c(
        "div",
        { staticClass: "list col-sm-3 p-0" },
        [
          _c(
            "draggable",
            {
              staticClass: "list-group",
              attrs: {
                list: _vm.groups,
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
            _vm._l(_vm.groups, function(group) {
              return _c(
                "li",
                {
                  key: group.id,
                  staticClass: "list-group-item cursor-pointer",
                  class: { active: group.id == _vm.selectedGroup.id },
                  attrs: { "data-id": group.id },
                  on: {
                    click: function($event) {
                      return _vm.selectGroup(group)
                    }
                  }
                },
                [
                  _c("span", { staticClass: "material-icons handle" }, [
                    _vm._v("drag_handle")
                  ]),
                  _vm._v(" " + _vm._s(group.name) + "\n                ")
                ]
              )
            }),
            0
          ),
          _vm._v(" "),
          _c("button-to-input", {
            attrs: { value: "", label: "Add Another Group" },
            on: { newinput: _vm.onNewInput }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "form col-sm-9" }, [
        _c("div", { staticClass: "form-horizontal" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "control-label col-sm-4" }, [
              _vm._v("Name:")
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-sm-8" },
              [
                _c("ui-textbox", {
                  attrs: {
                    "multi-line": false,
                    placeholder:
                      "Ex. Real Estate Agents, Homeowners, Stay-at-Home Moms"
                  },
                  model: {
                    value: _vm.selectedGroup.name,
                    callback: function($$v) {
                      _vm.$set(_vm.selectedGroup, "name", $$v)
                    },
                    expression: "selectedGroup.name"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "control-label  col-sm-4" }, [
              _vm._v("What should this user be able to do?")
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-sm-8" },
              [
                _c("ui-textbox", {
                  attrs: { "multi-line": true },
                  model: {
                    value: _vm.selectedGroup.user_able_to_do,
                    callback: function($$v) {
                      _vm.$set(_vm.selectedGroup, "user_able_to_do", $$v)
                    },
                    expression: "selectedGroup.user_able_to_do"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "control-label  col-sm-4" }, [
              _vm._v("What should this user not have access to?")
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-sm-8" },
              [
                _c("ui-textbox", {
                  attrs: {
                    "multi-line": true,
                    placeholder:
                      "Ex. Should not be able to access financial reports"
                  },
                  model: {
                    value: _vm.selectedGroup.user_access_to,
                    callback: function($$v) {
                      _vm.$set(_vm.selectedGroup, "user_access_to", $$v)
                    },
                    expression: "selectedGroup.user_access_to"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "control-label  col-sm-4" }, [
              _vm._v(
                "What are the three main actions that this user is supposed to do?"
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-sm-8" },
              [
                _c("ui-textbox", {
                  attrs: { "multi-line": true },
                  model: {
                    value: _vm.selectedGroup.user_main_actions,
                    callback: function($$v) {
                      _vm.$set(_vm.selectedGroup, "user_main_actions", $$v)
                    },
                    expression: "selectedGroup.user_main_actions"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c(
              "div",
              { staticClass: "col-sm-12" },
              [
                _c("ui-collapsible", { attrs: { title: "Demographics" } }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "control-label col-sm-4" }, [
                        _vm._v("Age:")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-sm-12 col-md-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.selectedGroup.demographics.age,
                              expression: "selectedGroup.demographics.age"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: {
                            value: _vm.selectedGroup.demographics.age
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.selectedGroup.demographics,
                                "age",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "control-label col-sm-4" }, [
                        _vm._v("Location:")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-sm-12 col-md-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.selectedGroup.demographics.location,
                              expression: "selectedGroup.demographics.location"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: {
                            value: _vm.selectedGroup.demographics.location
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.selectedGroup.demographics,
                                "location",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "control-label col-sm-4" }, [
                        _vm._v("Gender:")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-sm-12 col-md-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.selectedGroup.demographics.gender,
                              expression: "selectedGroup.demographics.gender"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: {
                            value: _vm.selectedGroup.demographics.gender
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.selectedGroup.demographics,
                                "gender",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "control-label col-sm-4" }, [
                        _vm._v("Income Level:")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-sm-12 col-md-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value:
                                _vm.selectedGroup.demographics.income_level,
                              expression:
                                "selectedGroup.demographics.income_level"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: {
                            value: _vm.selectedGroup.demographics.income_level
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.selectedGroup.demographics,
                                "income_level",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "control-label col-sm-4" }, [
                        _vm._v("Occupation:")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-sm-12 col-md-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.selectedGroup.demographics.occupation,
                              expression:
                                "selectedGroup.demographics.occupation"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: {
                            value: _vm.selectedGroup.demographics.occupation
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.selectedGroup.demographics,
                                "occupation",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "control-label col-sm-4" }, [
                        _vm._v("Education Level:")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-sm-12 col-md-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value:
                                _vm.selectedGroup.demographics.education_level,
                              expression:
                                "selectedGroup.demographics.education_level"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: {
                            value:
                              _vm.selectedGroup.demographics.education_level
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.selectedGroup.demographics,
                                "education_level",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ])
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c(
              "div",
              { staticClass: "col-sm-12" },
              [
                _c("ui-collapsible", { attrs: { title: "Psychographics" } }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "control-label col-sm-4" }, [
                        _vm._v("Personality:")
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-sm-8" },
                        [
                          _c("ui-textbox", {
                            attrs: {
                              "multi-line": true,
                              placeholder:
                                "Examples. Type A vs detail-oriented and methodical, extroverted vs introverted, serious vs. fun, simple vs. complex"
                            },
                            model: {
                              value:
                                _vm.selectedGroup.psychographics.personality,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.selectedGroup.psychographics,
                                  "personality",
                                  $$v
                                )
                              },
                              expression:
                                "selectedGroup.psychographics.personality"
                            }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "control-label col-sm-4" }, [
                        _vm._v("Interest / Hobbies:")
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-sm-8" },
                        [
                          _c("ui-textbox", {
                            attrs: {
                              "multi-line": true,
                              placeholder:
                                "Examples: technology, health and fitness, entrepreneurship"
                            },
                            model: {
                              value: _vm.selectedGroup.psychographics.interest,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.selectedGroup.psychographics,
                                  "interest",
                                  $$v
                                )
                              },
                              expression:
                                "selectedGroup.psychographics.interest"
                            }
                          })
                        ],
                        1
                      )
                    ])
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-sm-12" }, [
            _c(
              "a",
              {
                staticClass: "btn btn-primary",
                attrs: { href: "javascript:;" },
                on: {
                  click: function($event) {
                    return _vm.save()
                  }
                }
              },
              [
                _vm._v(
                  "\n                        Save Changes\n                    "
                )
              ]
            )
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-sm-12" }, [
      _c("label", { staticClass: "text-label" }, [
        _vm._v("User Roles - Who are your customer target groups?")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/components/projects/sales/BACallTab.vue":
/*!*********************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/BACallTab.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BACallTab_vue_vue_type_template_id_7bcfd957___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BACallTab.vue?vue&type=template&id=7bcfd957& */ "./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=template&id=7bcfd957&");
/* harmony import */ var _BACallTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BACallTab.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BACallTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BACallTab_vue_vue_type_template_id_7bcfd957___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BACallTab_vue_vue_type_template_id_7bcfd957___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/sales/BACallTab.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BACallTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./BACallTab.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BACallTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=template&id=7bcfd957&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=template&id=7bcfd957& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BACallTab_vue_vue_type_template_id_7bcfd957___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./BACallTab.vue?vue&type=template&id=7bcfd957& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/BACallTab.vue?vue&type=template&id=7bcfd957&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BACallTab_vue_vue_type_template_id_7bcfd957___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BACallTab_vue_vue_type_template_id_7bcfd957___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/projects/sales/ProjectMediaTab.vue":
/*!***************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/ProjectMediaTab.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProjectMediaTab_vue_vue_type_template_id_e9c341ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectMediaTab.vue?vue&type=template&id=e9c341ae& */ "./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=template&id=e9c341ae&");
/* harmony import */ var _ProjectMediaTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectMediaTab.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProjectMediaTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProjectMediaTab_vue_vue_type_template_id_e9c341ae___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProjectMediaTab_vue_vue_type_template_id_e9c341ae___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/sales/ProjectMediaTab.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectMediaTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProjectMediaTab.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectMediaTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=template&id=e9c341ae&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=template&id=e9c341ae& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectMediaTab_vue_vue_type_template_id_e9c341ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProjectMediaTab.vue?vue&type=template&id=e9c341ae& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/ProjectMediaTab.vue?vue&type=template&id=e9c341ae&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectMediaTab_vue_vue_type_template_id_e9c341ae___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectMediaTab_vue_vue_type_template_id_e9c341ae___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/projects/sales/SalesCallTab.vue":
/*!************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/SalesCallTab.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SalesCallTab_vue_vue_type_template_id_2531b5dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SalesCallTab.vue?vue&type=template&id=2531b5dc& */ "./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=template&id=2531b5dc&");
/* harmony import */ var _SalesCallTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SalesCallTab.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SalesCallTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SalesCallTab_vue_vue_type_template_id_2531b5dc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SalesCallTab_vue_vue_type_template_id_2531b5dc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/projects/sales/SalesCallTab.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCallTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SalesCallTab.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCallTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=template&id=2531b5dc&":
/*!*******************************************************************************************************!*\
  !*** ./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=template&id=2531b5dc& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCallTab_vue_vue_type_template_id_2531b5dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SalesCallTab.vue?vue&type=template&id=2531b5dc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/projects/sales/SalesCallTab.vue?vue&type=template&id=2531b5dc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCallTab_vue_vue_type_template_id_2531b5dc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCallTab_vue_vue_type_template_id_2531b5dc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/MonetizeListWidget.vue":
/*!***********************************************************************!*\
  !*** ./resources/assets/js/components/widgets/MonetizeListWidget.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MonetizeListWidget_vue_vue_type_template_id_349a151c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MonetizeListWidget.vue?vue&type=template&id=349a151c& */ "./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=template&id=349a151c&");
/* harmony import */ var _MonetizeListWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MonetizeListWidget.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MonetizeListWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MonetizeListWidget_vue_vue_type_template_id_349a151c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MonetizeListWidget_vue_vue_type_template_id_349a151c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/MonetizeListWidget.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MonetizeListWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MonetizeListWidget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MonetizeListWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=template&id=349a151c&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=template&id=349a151c& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MonetizeListWidget_vue_vue_type_template_id_349a151c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MonetizeListWidget.vue?vue&type=template&id=349a151c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/MonetizeListWidget.vue?vue&type=template&id=349a151c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MonetizeListWidget_vue_vue_type_template_id_349a151c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MonetizeListWidget_vue_vue_type_template_id_349a151c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/widgets/TargetGroupWidget.vue":
/*!**********************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TargetGroupWidget.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TargetGroupWidget_vue_vue_type_template_id_112e466a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TargetGroupWidget.vue?vue&type=template&id=112e466a& */ "./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=template&id=112e466a&");
/* harmony import */ var _TargetGroupWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TargetGroupWidget.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TargetGroupWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TargetGroupWidget_vue_vue_type_template_id_112e466a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TargetGroupWidget_vue_vue_type_template_id_112e466a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/widgets/TargetGroupWidget.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetGroupWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TargetGroupWidget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetGroupWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=template&id=112e466a&":
/*!*****************************************************************************************************!*\
  !*** ./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=template&id=112e466a& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetGroupWidget_vue_vue_type_template_id_112e466a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TargetGroupWidget.vue?vue&type=template&id=112e466a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/widgets/TargetGroupWidget.vue?vue&type=template&id=112e466a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetGroupWidget_vue_vue_type_template_id_112e466a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetGroupWidget_vue_vue_type_template_id_112e466a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);