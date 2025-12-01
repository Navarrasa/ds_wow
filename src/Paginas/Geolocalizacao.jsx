import { useRef, useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export function GeolocalizacaoMapa() {
    const mapaRef = useRef(null);
    const rotaRef = useRef(null);

    const [form, setForm] = useState({
        lat1: '',
        lon1: '',
        lat2: '',
        lon2: ''
    });

    const [erro, setErros] = useState({});

    useEffect(() => {
        if (mapaRef.current) return;

        const mapa = L.map('mapa').setView([-23.55, -46.63], 13);
        mapaRef.current = mapa;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapa);
    }, []);
    
    function validarFormulario() {
        let temp = {};

        if (!form.lat1) temp.lat1 = 'Latitude de origem é obrigatória.';
        if (!form.lon1) temp.lon1 = 'Longitude de origem é obrigatória.';
        if (!form.lat2) temp.lat2 = 'Latitude de destino é obrigatória.';
        if (!form.lon2) temp.lon2 = 'Longitude de destino é obrigatória.';

        setErros(temp);
        return Object.keys(temp).length === 0;
    }

    function gerarRota(e) {
        e.preventDefault();
        if (!validarFormulario()) return;

        const p1 = L.latLng(parseFloat(form.lat1), parseFloat(form.lon1));
        const p2 = L.latLng(parseFloat(form.lat2), parseFloat(form.lon2));

        if (rotaRef.current) rotaRef.current.remove();

        rotaRef.current = L.Routing.control({
            waypoints: [p1, p2],
            show: false,
            addWaypoints: false,
            routeWhileDragging: false,
            lineOptions: { addWaypoints: false }
        }).addTo(mapaRef.current);

        mapaRef.current.setView(p1,15);
    
    }


    function pegarLocalizacaoOrigem() {
        navigator.geolocation.getCurrentPosition((pos) => {
            setForm({
                ...form,
                lat1: pos.coords.latitude.toFixed(6),
                lon1: pos.coords.longitude.toFixed(6)
            });
        });
    }

    function pegarLocalizacaoDestino() {
        navigator.geolocation.getCurrentPosition((pos) => {
            setForm({
                ...form,
                lat2: pos.coords.latitude.toFixed(6),
                lon2: pos.coords.longitude.toFixed(6)
            });
        });
    }


    return (
        <div className="sessao-mapa">
            <form className="form-mapa" onSubmit={gerarRota}>
            <h2>Gerar Rota</h2>

            {/* ORIGEM */}
            <fieldset>
                <legend>Origem</legend>

                <label>Latitude</label>
                <input
                type="number"
                name="lat1"
                step="any"
                value={form.lat1}
                onChange={(e) => setForm({ ...form, lat1: e.target.value })}
                className="caixaTexto"
                />
                {erro.lat1 && <p className="error">{erro.lat1}</p>}

                <label>Longitude</label>
                <input
                type="number"
                name="lng1"
                step="any"
                value={form.lng1}
                onChange={(e) => setForm({ ...form, lng1: e.target.value })}
                className="caixaTexto"
                />
                {erro.lng1 && <p className="error">{erro.lng1}</p>}

                <button type="button" className="btnLocal" onClick={pegarLocalizacaoOrigem}>
                Usar minha localização atual
                </button>
            </fieldset>

            {/* DESTINO */}
            <fieldset>
                <legend>Destino</legend>

                <label>Latitude</label>
                <input
                type="number"
                name="lat2"
                step="any"
                value={form.lat2}
                onChange={(e) => setForm({ ...form, lat2: e.target.value })}
                className="caixaTexto"
                />
                {erro.lat2 && <p className="error">{erro.lat2}</p>}

                <label>Longitude</label>
                <input
                type="number"
                name="lng2"
                step="any"
                value={form.lng2}
                onChange={(e) => setForm({ ...form, lng2: e.target.value })}
                className="caixaTexto"
                />
                {erro.lng2 && <p className="error">{erro.lng2}</p>}

                <button type="button" className="btnLocal" onClick={pegarLocalizacaoDestino}>
                Usar minha localização atual
                </button>
            </fieldset>

            <button type="submit" className="btnGerar">
                Gerar Rota
            </button>
            </form>

            <div id="mapa" className="mapa-container"></div>
        </div>
    );
}