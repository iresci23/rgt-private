<template>
    <div id="editor">
      <p>Here goes the initial content of the editor.</p>
   </div>
</template>

<script>
export default {

  props: {
    keyId: { required: true },
    value: { required: true },
    autoSave: { required: false, default: true }
  },

  data () {
      return {
        getValue: this.value || ''
      }
  },

  created() {

    this.debounceFn = _.debounce( () => {

      if ( this.autoSave ) {
        this.$emit('onAutoSave', {
          key: this.keyId,
          value: this.getValue,
          layout: 'text-editor'
        });
      }

    }, 1000)

  },

  mounted() {

    console.log("mounted text-editor")

    if ( window.editor && window.editor.state == 'ready' ) {

        window.editor.destroy()
        .catch( error => {
            console.log( error );
        });
    }
    
    let self = this 

    let csrfToken = document.head.querySelector('meta[name="csrf-token"]');

    ClassicEditor
      .create( document.querySelector( '#editor' ), {
        
        toolbar: {
            items: [
                'undo',
                'redo',
                'heading',
                'fontFamily',
               // 'fontSize',
                '|',
                'bold',
                'italic',
                'underline',
                'alignment',
                '|',
                'bulletedList',
                'numberedList',
                'indent',
                'outdent',
                'imageUpload',
                '|',
                'fontColor',
                'fontBackgroundColor',
                'link',
                'blockQuote',
                'insertTable',
                'removeFormat'
            ]
        },
        indentBlock: {
            offset: 1,
            unit: 'em'
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
                'imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
        licenseKey: '',
        simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: '/app/media-mngr/upload',

            // Enable the XMLHttpRequest.withCredentials property.
            // withCredentials: true,

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
                'X-CSRF-TOKEN': csrfToken.content,
                // Authorization: 'Bearer <JSON Web Token>'
            }
        }
        
    } )
    .then( editor => {

        window.editor = editor

        editor.setData( self.getValue );

        editor.model.document.on( 'change:data', () => {

          self.getValue = editor.getData();

          self.debounceFn()

        } );

    } )
    .catch( error => {
        console.error( 'Oops, something went wrong!' );
        console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
        console.warn( 'Build id: ol34o81w67i-fxa2jjcxjrqu' );
        console.error( error );
    } );
  },

}
</script>