import { codeState, codeUtil } from './codeStore.js'


var toolbarStoreClass = function() {

  this.state = {

    toolkit: [
      { id: 94 },
      { id: 1 },
      { id: 2 },

      { id: 90 },
      { id: 91 },
      { id: 92 },

      { id: 10 },
      { id: 40 },
      { id: 18 },

      { id: 30 },
      { id: 31 },
      { id: 32 },

      { id: 20 },
      { id: 21 },
      { id: 22 },

      { id: 0 },
      { id: 95 },
      { id: 96 },

    ],

    datakit: [
      { id: 3 },
      { id: 4 },
      { id: 5 },

      { id: 6 },
      { id: 7 },
      { id: 70 },
    ],

    utilkit: [
      { id: 0 },
      { id: 1 },
    ],

    varkit: {
      visible: false
    },
    obkit: {
      visible: false
    },
    numkit: {
      visible: false
    },
    textkit: {
      visible: false
    },
    opkit: {
      visible: false
    },
  }

  var state = this.state

  this.signal = riot.observable()
  var signal = this.signal

  this.mutations = {

    inputKitVisible() {
      var group = codeUtil.cursorToken().group
      if ( group == 'var' || group == 'array' || group == 'function' || group == 'type' ) this.varkitVisible()
      else if ( group == 'object' ) this.obkitVisible()
      else if ( group == 'number' ) this.numkitVisible()
      else if ( group == 'text' || group == 'comment' ) this.textkitVisible()
      else if ( group == 'operator' ) this.opkitVisible()
    },

    openInputKit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'var' || group == 'object' || group == 'array' || group == 'function' || group == 'type' ) this.openVarkit()
      else if ( group == 'object' ) this.openObkit()
      else if ( group == 'number' ) this.openNumkit()
      else if ( group == 'text' || group == 'comment' ) this.openTextkit()
      else if ( group == 'operator' ) this.openOpkit()
    },

    varkitVisible() {
      if ( ! state.varkit.visible ) this.openVarkit()
      else this.closeVarkit()
    },

    openVarkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'var' || group == 'array' || group == 'function' || group == 'type' ) {
        state.varkit.visible = true
        signal.trigger('varkitVisible')
      }
    },

    closeVarkit() {
      state.varkit.visible = false
      signal.trigger('varkitVisible')
    },

    obkitVisible() {
      if ( ! state.obkit.visible ) this.openObkit()
      else this.closeObkit()
    },

    openObkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'object' ) {
        state.obkit.visible = true
        signal.trigger('obkitVisible')
      }
    },

    closeObkit() {
      state.obkit.visible = false
      signal.trigger('obkitVisible')
    },


    numkitVisible() {
      if ( ! state.numkit.visible ) this.openNumkit()
      else this.closeNumkit()
    },

    openNumkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'number' ) {
        state.numkit.visible = true
        signal.trigger('numkitVisible')
      }
    },

    closeNumkit() {
      state.numkit.visible = false
      signal.trigger('numkitVisible')
    },


    textkitVisible() {
      if ( ! state.textkit.visible ) this.openTextkit()
      else this.closeTextkit()
    },

    openTextkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'text' || group == 'comment' ) {
        state.textkit.visible = true
        signal.trigger('textkitVisible')
      }
    },

    closeTextkit() {
      state.textkit.visible = false
      signal.trigger('textkitVisible')
    },


    opkitVisible() {
      if ( ! state.opkit.visible ) this.openOpkit()
      else this.closeOpkit()
    },

    openOpkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'operator' ) {
        state.opkit.visible = true
        signal.trigger('opkitVisible')
      }
    },

    closeOpkit() {
      state.opkit.visible = false
      signal.trigger('opkitVisible')
    },


  }

  this.do = ( action ) => {
    if ( this.mutations[ action.action ] ) this.mutations[ action.action ]( action.data )
  }

}

var toolbarStore = new toolbarStoreClass()

var toolbarState = toolbarStore.state
var toolbarDo = toolbarStore.do
var toolbarSignal = toolbarStore.signal

export { toolbarState, toolbarDo, toolbarSignal }
