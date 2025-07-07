import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
    const { progress } = useProgress()
    return (
        <Html
            as="div"
            center
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span className="canvas-loader" />
            <p style={{ fontSize: 14, color: "#fff", fontWeight: 800, marginTop: 40 }}>
                {progress !== 0 ? `${Number(progress).toFixed(0)}%` : `Loading...`}
            </p>
        </Html>
    )
}