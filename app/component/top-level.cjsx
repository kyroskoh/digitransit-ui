React  = require 'react'
Helmet = require 'react-helmet'
meta   = require('../meta').default
configureMoment = require '../util/configure-moment'

class TopLevel extends React.Component
  @contextTypes:
    getStore: React.PropTypes.func.isRequired

  @childContextTypes:
    location: React.PropTypes.object

  getChildContext: () ->
    location: @props.location

  render: ->
    preferencesStore = @context.getStore('PreferencesStore')
    language = preferencesStore.getLanguage()
    configureMoment(language)

    metadata = meta language
    <div className="fullscreen">
      <Helmet {...metadata}/>
      {@props.children}
    </div>


module.exports = TopLevel
