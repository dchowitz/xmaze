import React from 'react'

import Canvas from './Canvas'
import { Demo } from './util'

interface DemoControllerProps {
  demoFac: (ctx: CanvasRenderingContext2D) => Demo
}

export default class DemoController extends React.Component<DemoControllerProps> {
  private _ctx: CanvasRenderingContext2D
  private _raf: number
  private _demo: Demo

  constructor (props: DemoControllerProps) {
    super(props)
  }

  animate = () => {
    this._demo.next()
    this._raf = requestAnimationFrame(this.animate)
  }

  startAnimation () {
    this._demo = this.props.demoFac(this._ctx)
    this._raf = requestAnimationFrame(this.animate)
  }

  componentDidUpdate () {
    this.startAnimation()
  }

  componentWillUnmount () {
    cancelAnimationFrame(this._raf)
  }

  render () {
    return (
      <Canvas
        contextAvailable={ctx => {
          this._ctx = ctx
          this.startAnimation()
        }}
        onClick={p => this._demo && this._demo.mouseClick(p)}
        onMove={p => this._demo && this._demo.mouseMove(p)}
      />
    )
  }
}
