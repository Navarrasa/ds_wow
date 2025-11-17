import { useRef, useState, useEffect } from "react";

export function Camera() {
    const videoRef = useRef(null);
    const canvasRed = useRef(null);
    const [foto, setFoto] = useState(null)

    // Inicia . câmera
    useEffect(() => {
        IniciarCamera();
    }, []);

    const IniciarCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Erro ao acessar a câmera: ", error);
        }
    };

    const tirarFoto = () => {
        const largura = videoRef.current.videoWidth;
        const altura = videoRef.current.videoHeight;
        const ctx = canvasRed.current.getContext("2d");

        // Define o tamanho do canvas igual ao do vídeo
        canvasRed.current.width = largura;
        canvasRed.current.height = altura;
        
        // Captura o frame atual do vídeo
        ctx.drawImage(videoRef.current, 0, 0, largura, altura);

        // Salva a foto em base64
        const imagemDataUrl = canvasRed.current.toDataURL("image/png");
        setFoto(imagemDataUrl);
    };

    const reiniciarCamera = () => {
        setFoto(null);
        IniciarCamera();
    };

    return (
        <section className="camera-box">
            <h2>Captura de Imagem</h2>

            <div className="preview">
                {!foto ? (
                    <video ref={videoRef} autoPlay playsInline aria-label="Visualização da câmera"></video>
                ) : (
                    <img src={foto} alt="Foto capturada" />
                )}
            </div>

            <div className="botoes">
                {!foto ? (
                    <button onClick={tirarFoto} aria-label="Tirar foto" className="tirar-foto-btn">Tirar Foto</button>
                ) : (
                    <button onClick={reiniciarCamera} aria-label="Reiniciar câmera" className="tirar-foto-btn">Nova foto</button>
                )}
            </div>

            <canvas ref={canvasRed} style={{display: "none"}}></canvas>
        </section>
    );
};