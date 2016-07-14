import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'



<tknblok>


  <div id="bar"></div>
  <div id="block"></div>



  <script>


    this.on("update", () => {
      if ( this.id != 13 ) return
      this.bar.style.height = 100 * this.options.h + '%'
      this.block.style.width = 100 * this.options.w + '%'
      this.block.style.height = 100 * this.options.h + '%'
      switch ( this.options.lvl ) {
        case 1:
          this.block.style.backgroundColor = '#0d121b'
          this.block.style.zIndex = 1
          break
        case 2:
          this.block.style.backgroundColor = '#151c27'
          this.block.style.zIndex = 1
          break
        case 3:
          this.block.style.backgroundColor = '#1b2331'
          this.block.style.zIndex = 1
          break
        case 4:
          this.block.style.backgroundColor = '#212b3b'
          this.block.style.zIndex = 1
          break
      }
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      display: block;
      z-index: 10;
    }
    #bar {
      position: absolute;
      left: 37.5%;
      top: 0;
      width: 25%;
      height: 100%;
      background-color: #0c1d37;
    }
    #block {
      position: absolute;
      left: 100%;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #0c1018;
    }
  </style>


</tknblok>
