import Reservation from './Reservation';
import SignaturePad from 'signature_pad';

export default class Canvas extends HTMLElement {
    /**
     * @type {null|SignaturePad}
     */
    signaturePad = null;

    /**
     * Constructor
     * @return void
     */
    constructor() {
        super();
    }

    clearCanvas(){
        const self = this;
        document.getElementById('clearCanvas').addEventListener('click', function () {
            self.signaturePad.clear();
        });
    }

    createCanvas(googleMapsMarker) {
        const reservationComponents = document.getElementsByTagName('reservation-component');
        const canvasComponent = document.createElement('canvas-component');
        canvasComponent.innerHTML = this.template();
        const reservationComponent = reservationComponents[0];
        reservationComponent.after(canvasComponent);
        this.move();
        this.init();

        const reservation = new Reservation();
        reservation.validate(googleMapsMarker);
    }

    init(){
        const canvas = document.querySelector('#canvas');
        this.signaturePad = new SignaturePad(canvas);
        this.clearCanvas();
    }

    move() {
        document.getElementById('btnback2').addEventListener('click', function () {
            const map = document.getElementById('map');
            const mapOffsetTop = map.offsetTop;
            const scrollOptions = {
                behavior: 'smooth',
                top: mapOffsetTop
            };
            window.scrollTo(scrollOptions);
        });
    }

    /**
     * Template
     * @returns {string}
     */
    template() {
        return `
            <div id="divCanvas">
                <canvas id="canvas" height="290" width="300"></canvas>
                <div id="blockSubmit">
                    <button class="btn" id="valider">
                        <span class="span_btn">Valider la réservation</span> <i class="material-icons">check_circle</i>
                    </button>
                </div>
                <br>
                <div id="blockCancel">
                    <button id="clearCanvas" class="btn waves-effect waves-light red darken-2">
                        <span class="span_btn">Effacer la signature</span> <i class="material-icons">cancel</i>
                    </button>
                </div>
                <br>
                <div id="backToMap2">
                    <button class="blue darken-1 waves-effect waves-light btn" id="btnback2">
                        <span class="span_btn">Retour à la carte</span> <i class="material-icons">map</i>
                    </button>
                </div>
            </div>';
        `;
    }
};
