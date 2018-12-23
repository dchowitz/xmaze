import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import xmas from './merry-xmas.png'
import DemoController from './DemoController'
import demoMask from './demoMaskedMaze'

class App extends React.Component {
  constructor () {
    super()
    this.footer = React.createRef()
  }

  render () {
    return (
      <div id="logo">
        <div className="canvas">
          <DemoController
            demoFac={ctx =>
              demoMask(ctx, xmas, () => {
                this.footer.current.style.visibility = 'visible'
              })
            }
          />
        </div>
        <footer ref={this.footer}>
          <div>
            ...&nbsp;from&nbsp;<a href="https://github.com/dchowitz/xmaze">dchowitz</a> (aka foobar (fka prensen))
          </div>
        </footer>
        <style jsx>{`
          #logo {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 100vh;
          }
          img {
            width: 100%;
            image-rendering: crisp-edges;
          }
          .canvas {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }
          footer {
            visibility: hidden;
            display: flex;
            justify-content: center;
            width: 100%;
            position: absolute;
            bottom: 2em;
            font-family: monospace;
            z-index: 200;
          }
        `}</style>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

if (process.env.NODE_ENV === 'development') {
  module.hot.accept()
}
