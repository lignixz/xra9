import { lines, scopes, floats, varList, typeList } from '../sampleData/sampleCodeData.js'
import { scopeClass, lineClass, tokenClass, stepClass, floatClass, floatTokenClass } from '../stores/codeClasses.js'
import { toolbarDo } from './toolbarStore.js'



var codeStoreClass = function() {

  this.state = {
    lines: [],
    floats: [],
    scopes: [],
    vars: {},
    cursor: { x: 0, y: 0 },
  }

  var state = this.state
  var util = null
  this.signal = riot.observable()
  var signal = this.signal

  this.mutations = {
    setData( lines, scopes, floats, vars, types ) {
      state.lines = lines
      state.scopes = scopes
      state.floats = floats
      state.vars = vars,
      state.types = types
    },

    setToken( data ) {
      var token = state.lines[ state.cursor.y ].tokens[ state.cursor.x ] = new tokenClass( data.id, data.name )
      signal.trigger( 'updateLines', [ state.cursor.y ] )
      signal.trigger( 'updateOptionkit' )
    },

    grabToken( loc ) {
      var tokenData = state.lines[ loc.y ].tokens[ loc.x ]
      state.lines[ loc.y ].tokens[ loc.x ] = new tokenClass()
      return tokenData
    },

    putToken( loc, tokenData ) {
      state.lines[ loc.y ].tokens[ loc.x ] = tokenData
    },

    moveToken( moveData ) {
      if ( state.lines[ moveData.to.y ].tokens[ moveData.to.x ].id == 0 ) {
        this.putToken( moveData.to, this.grabToken( moveData.from ) )
        // updateToken don't work here, suspected related to
        // e.preventUpdate on the dragEnd handler
        signal.trigger( 'forceUpdateToken', moveData.from )
        signal.trigger( 'forceUpdateToken', moveData.to )
      }
    },

    moveCursor( loc ) {
      state.cursor.x = loc.x
      state.cursor.y = loc.y
      signal.trigger( 'updateCursor' )
    },

    moveCursorUp() {
      if ( state.cursor.y > 0 ) {
        state.cursor.y--
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorDown() {
      if ( state.cursor.y < state.lines.length - 1 ) {
        state.cursor.y++
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorLeft() {
      if ( state.cursor.x > 0 ) {
        state.cursor.x--
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorRight() {
      if ( state.cursor.x < state.lines[0].tokens.length - 1 ) {
        state.cursor.x++
        signal.trigger( 'updateCursor' )
      }
    },

    util( data ) {
      if ( data.id == 0 ) {// save
        var stateString = JSON.stringify( state )
        console.log( stateString )
        download('code.json', stateString)
        //var uriContent = "data:text/plain," + encodeURIComponent( stateString )
        //newWindow = window.open(uriContent, 'save file')
      }
    },

    tokenPoints( data ) {
      var token = util.cursorToken()
      if ( token.group == 'function' || token.group == 'arrow' || token.group == 'operator' || token.group == 'pin' || token.group == 'flag' ) {
        token.options.points = data
        signal.trigger('updateCursorToken')
      }
    },

    tokenColor( data ) {
      var token = util.cursorToken()
      if ( token.group == 'pin' || token.group == 'flag' ) {
        token.options.color = data
        signal.trigger('updateCursorToken')
      }
    },

    functionBubble() {
      var token = util.cursorToken()
      if ( token.group == 'function' ) {
        token.options.bubble = ! token.options.bubble
        if ( token.options.bubble ) {
          token.options.parLen = 0
        }
        signal.trigger('updateCursorToken')
      }
    },

    functionParPoints( data ) {
      var token = util.cursorToken()
      if ( token.group == 'function' && !token.options.bubble || token.group == 'operator' || token.group == 'loop' ) {

        if ( token.options.parPoints === data ) token.options.parLen++
        else {
          token.options.parPoints = data
          token.options.parLen = 1
        }
        signal.trigger('updateCursorToken')
      }
    },

    functionParX() {
      var token = util.cursorToken()
      if ( token.group == 'function' || token.group == 'operator' || token.group == 'loop' ) {
        token.options.parLen = 0
        signal.trigger('updateCursorToken')
      }
    },

    dotPoints( data ) {
      var token = util.cursorToken()
      if ( token.group == 'object' || token.group == 'type' ) {
        token.options.points = data
        token.options.dot = true
        signal.trigger('updateCursorToken')
      }
    },

    noDot() {
      var token = util.cursorToken()
      if ( token.group == 'object' || token.group == 'type' ) {
        token.options.dot = false
        signal.trigger('updateCursorToken')
      }
    },

    tokenBubble() {
      var token = util.cursorToken()
      if ( token.group == 'var' || token.group == 'object' || token.group == 'array' || token.group == 'pin' ) {
        token.options.bubble = ! token.options.bubble
        signal.trigger('updateCursorToken')
      }
    },

    commWidth( data ) {
      var token = util.cursorToken()
      if ( token.group == 'comment' ) {
        token.options.width += data
        if ( token.options.width < 1 ) token.options.width = 1
        if ( token.options.width > 8 ) token.options.width = 8
        signal.trigger('updateCursorToken')
      }
    },

    opDef() {
      var token = util.cursorToken()
      if ( token.group == 'operator' ) {
        token.options.def = !token.options.def
        signal.trigger('updateCursorToken')
      }
    },

    setOp( id ) {
      var token = util.cursorToken()
      if ( token.group == 'operator' ) {
        token.options.id = id
        signal.trigger('updateCursorToken')
      }
    },

    flagColor( color ) {
      util.cursorToken().options.flag = color
      signal.trigger('updateCursorToken')
      toolbarDo({ action: 'flagkitVisible' })
    },

    ifRotate( data ) {
      var token = util.cursorToken()
      if ( token.group == 'if' ) {
        var freeSlot = 0, opt = token.options

        if ( opt.cond != 0 && opt.o != 0 && opt.x != 0 ) freeSlot = 0
        else if ( opt.cond != 1 && opt.o != 1 && opt.x != 1 ) freeSlot = 1
        else if ( opt.cond != 2 && opt.o != 2 && opt.x != 2 ) freeSlot = 2
        else if ( opt.cond != 3 && opt.o != 3 && opt.x != 3 ) freeSlot = 3

        if ( data == 'cond' ) opt.cond = freeSlot
        else if ( data == 'o' ) opt.o = freeSlot
        else if ( data == 'x' ) opt.x = freeSlot

        signal.trigger('updateCursorToken')
      }
    },

  }

  this.util = {
    cursorToken() {
      return state.lines[ state.cursor.y ].tokens[ state.cursor.x ]
    }
  }
  util = this.util

  this.do = ( action ) => {
    if ( this.mutations[ action.action ] ) this.mutations[ action.action ]( action.data )
  }
}



function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}



var codeStore = new codeStoreClass()

codeStore.mutations.setData( lines, scopes, floats, varList, typeList )

var codeState = codeStore.state
var codeDo = codeStore.do
var signal = codeStore.signal
var codeUtil = codeStore.util
export { codeState, codeDo, signal, codeUtil }
