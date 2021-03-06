import { toolbarSignal } from '../../../stores/toolbarStore.js'
import '../../tokens/tknvar.tag'
import '../../tokens/tknob.tag'



<varkitextern>


  <div id="vkob">Extern</div>


  <script>

    toolbarSignal.on('varkitVisible', () => {

    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      display: block;
      top: .5vw;
      right: 55.5vw;
      left: .5vw;
      height: 48vh;
      background-color: #1d212d;
    }
    #vkob {
      position: absolute;
      left: 1vw;
      top: .5vw;
    }

    tknvar,tknob {
      font-size: 2.3vw;
      top: 0vw;
      left: 1vw;
      width: 13vw;
      height: 13vw;
    }
  </style>


</varkitextern>
