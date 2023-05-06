import { useEffect, useRef, useState} from "react";
import {
    styled
  } from '@mui/material';

const CanvasContainer = styled('canvas')({
    height:500,
    width:500,
    borderBlockColor:"#000",
    position:"absolute"
  });  

const ImageContainer = styled('div')({
    height:250,
    width:250,
    marginRight:150,
    position:"relative"
})

const DrawingCanvas =() =>{
    const canvasRef= useRef(null)
    const contextRef= useRef(null) as any;

    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() =>{
        const canvas:any= canvasRef.current
        canvas.width=500
        canvas.height=500

        const context: any = canvas.getContext("2d")
        context.lineCap ="round"
        context.strokeStyle="black"
        context.lineWidth=5
        contextRef.current=context
    },[]);

    const startDrawing = ({nativeEvent} : any) =>{
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX,offsetY)
        contextRef.current.lineTo(offsetX,offsetY)
        contextRef.current.stroke()
        setIsDrawing(true)
        nativeEvent.preventDefault()
    }

    const draw = ({nativeEvent} : any) =>{
        if(!isDrawing){
            return
        }
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.lineTo(offsetX,offsetY)
        contextRef.current.stroke()
        nativeEvent.preventDefault()
    }

    const stopDrawing = () =>{
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    return(
        <>
        <ImageContainer>
        <img height={250} src="/static/images/location/backdoor.png"/>
        </ImageContainer>
        <CanvasContainer ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing}>
        </CanvasContainer>
        </>
    )
}

export default DrawingCanvas;