import React from 'react'
import { RingLoader } from 'react-spinners';

type Props = {}

const Loader = (props: Props) => {
  return (
    <div
    style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000
    }}
    >
        <RingLoader
            color="#36d7b7"
            speedMultiplier={2}
        />
    </div>
  ) 
}

export default Loader;