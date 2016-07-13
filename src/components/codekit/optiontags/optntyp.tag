import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'

<optntyp>


  <div id="opttypdef" onclick={ def }></div>
  <div id="opttypname" onclick={ name }></div>

  <div id="optdotup" onclick={ up } class="optdot"></div>
  <div id="optdotdown" onclick={ down } class="optdot"></div>
  <div id="optdotleft" onclick={ left } class="optdot"></div>
  <div id="optdotright" onclick={ right } class="optdot"></div>
  <div id="optdotx" onclick={ nodot }></div>


  <script>

    this.def = () => codeDo({ action: 'typeDef' })
    this.name = () => toolbarDo({ action: 'typekitVisible' })

    this.up = () => codeDo({ action: 'dotPoints', data: 3 })
    this.down = () => codeDo({ action: 'dotPoints', data: 1 })
    this.left = () => codeDo({ action: 'dotPoints', data: 2 })
    this.right = () => codeDo({ action: 'dotPoints', data: 0 })
    this.nodot = () => codeDo({ action: 'noDot' })

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }

    #opttypdef {
      left: 2vh;
      top: 2vh;
      width: 7vh;
      height: 7vh;
      position: absolute;
      background-image: url('assets/img/options/opttypnew.svg');
      background-size: 100% 100%;
    }

    #opttypname {
      left: 2vh;
      top: 14vh;
      width: 5vh;
      height: 5vh;
      position: absolute;
      background-image: url('assets/img/options/optname.svg');
      background-size: 100% 100%;
    }
    #optfuncpar {
      position: absolute;
      left: 14.7vh;
      top: 14.5vh;
      background: #163461;
      width: 2.6vh;
      height: 1vh;
    }

    .optdot {
      width: 4vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparup.svg');
      background-size: 100% 100%;
    }
    #optdotup {
      left: 14vh;
      top: 10.2vh;
    }
    #optdotdown {
      left: 14vh;
      top: 15.8vh;
      transform: rotate(180deg);
    }
    #optdotleft {
      left: 9.8vh;
      top: 13.1vh;
      transform: rotate(-90deg);
    }
    #optdotright {
      left: 18.4vh;
      top: 13.1vh;
      transform: rotate(90deg);
    }
    #optdotx {
      width: 3vh;
      height: 3vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparx.svg');
      background-size: 100% 100%;
      left: 18.7vh;
      top: 9.5vh;
    }
  </style>


</optntyp>
