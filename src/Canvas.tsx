import React from 'react'

import { Point } from './util'

type CanvasProps = {
  contextAvailable: (ctx: CanvasRenderingContext2D) => void
  onClick: (p: Point) => void
  onMove: (p: Point) => void
  width?: number
  height?: number
}

export default class Canvas extends React.Component<CanvasProps> {
  private _offsetLeft: number
  private _offsetTop: number

  constructor (props: CanvasProps) {
    super(props)
  }

  render () {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={node => {
          if (!node) return
          const logoNode = document.getElementById('logo')

          if (!this.props.width) node.width = logoNode.offsetWidth
          if (!this.props.height) node.height = logoNode.offsetHeight

          this._offsetLeft = node.offsetLeft
          this._offsetTop = node.offsetTop
          this.props.contextAvailable(node.getContext('2d'))
        }}
        onClick={e => {
          this.props.onClick({
            x: e.pageX - this._offsetLeft,
            y: e.pageY - this._offsetTop
          })
        }}
        onMouseMove={e => {
          this.props.onMove({
            x: e.pageX - this._offsetLeft,
            y: e.pageY - this._offsetTop
          })
        }}
      />
    )
  }
}
