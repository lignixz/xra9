import { codeUtil, codeState, signal } from '../../stores/codeStore.js'
import { toolbarSignal } from '../../stores/toolbarStore.js'
import '../tokens/tkntext.tag'



<textkit>

  <div id="varnameform">
    <textarea id="varname1" oninput={ change }/>

    <tkntext></tkntext>
  </div>



  <script>

    this.tags.tkntext.id = 0

    this.change = ( e ) => {
      codeUtil.cursorToken().options.value = varname1.value
      //signal.trigger('updateLines', [ codeState.cursor.y ])
      signal.trigger( 'updateCursorToken' )
    }

    this.on('update', () => {
      Object.assign( this.tags.tkntext, codeUtil.cursorToken() )
    })

    var token
    toolbarSignal.on('textkitVisible', () => {
      this.varname1.value = codeUtil.cursorToken().options.value
      this.varname1.focus()
    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 24vh;
      top: 3vh;
      height: 40vh;
      width: 60vh;
      background: #151821;
      border: .4vh solid #1d2233;
      z-index: 200;
    }
    #varnameform {
      position: absolute;
      top: 4vh;
      right: 4vh;
    }
    #varname1 {
      width: 50vh;
      height: 12vh;
      border: 1px solid #0064f1;
      background: #0d1b26;
      color: #6e84b6;
      font-size: 2vh;

    }
    tkntext {
      font: 10.6px "ubuntu mono";
      left: 6vh;
      top: 18vh;
    }
  </style>


</textkit>
