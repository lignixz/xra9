import { lines, scopes, floats } from '../sampleData/sampleCodeData.js'
import { scopeClass, lineClass, tokenClass, stepClass, floatClass, floatTokenClass } from '../stores/codeClasses.js'


var codeStoreClass = function() {

  this.state = {
    lines: [],
    floats: [],
    scopes: [],
  }

  var state = this.state

  this.signal = riot.observable()
  var signal = this.signal

  this.mutations = {
    setData( lines, scopes, floats ) {
      state.lines = lines
      state.scopes = scopes
      state.floats = floats
    },

    startDrag( loc ) {
      var tokenData = state.lines[ loc.y ].tokens[ loc.x ]
      var float = new floatClass( loc.x*56, loc.y*56, 1, 1,
          [
            new floatTokenClass( new tokenClass( tokenData.id, tokenData.name ), 0 ,0 )
          ]
        )
      state.floats.push(float)
      state.lines[ loc.y ].tokens[ loc.x ] = new tokenClass( 0, '' )
      signal.trigger('floatsUpdate')
    }
  }

  this.do = ( action ) => {
    if ( this.mutations[ action.action ] ) this.mutations[ action.action ]( action.data )
  }
}

var codeStore = new codeStoreClass()

codeStore.mutations.setData( lines, scopes, floats )

var codeState = codeStore.state
var codeDo = codeStore.do
var signal = codeStore.signal

export { codeState, codeDo, signal }
