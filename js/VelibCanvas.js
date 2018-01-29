var VelibCanvas = {
    clearCanvas: function(){
        $("#deleteCanvas").click(function () {
            VelibCanvas.ctx.clearRect(0, 0, VelibCanvas.width, VelibCanvas.height);
        });
    },
    createCanvas: function (marker) {
        var block = '<div id="divCanvas">' +
            '<canvas id="canvas" height="290" width="300"></canvas>' +
            '<div id="blockSubmit"><button class="btn" id="valider"><span class="span_btn">Valider la réservation</span> <i class="material-icons">check_circle</i></button></div><br>' +
            '<div id="blockCancel"><button id="deleteCanvas" class="btn waves-effect waves-light red darken-2"><span class="span_btn">Effacer la signature</span> <i class="material-icons">cancel</i></button></div><br>' +
            '<div id="backToMap2"><button class="blue darken-1 waves-effect waves-light btn" id="btnback2"><span class="span_btn">Retour à la carte</span> <i class="material-icons">map</i></button></div>' +
            '</div>';
        $(block).appendTo('#reservation');
        this.move();
        this.init();
        VelibReservation.validate(marker);
    },
    draw: function(){
        VelibCanvas.ctx.beginPath();
        VelibCanvas.ctx.moveTo(VelibCanvas.prevX,VelibCanvas.prevY);
        VelibCanvas.ctx.lineTo(VelibCanvas.currX,VelibCanvas.currY);
        VelibCanvas.ctx.strokeStyle = 'black';
        VelibCanvas.ctx.lineWidth = 5;
        VelibCanvas.ctx.stroke();
        VelibCanvas.ctx.closePath();

    },
    events: function(){
        if (this.responsive() <= 768){
            VelibCanvas.canvas.addEventListener("touchmove", function (e){ VelibCanvas.launch('move',e); }, false);
            VelibCanvas.canvas.addEventListener("touchstart", function (e){ VelibCanvas.launch('down',e); }, false);
            VelibCanvas.canvas.addEventListener("touchend", function (e){ VelibCanvas.launch('up',e); }, false);
        }
        else {
            VelibCanvas.canvas.addEventListener("mousemove", function (e){ VelibCanvas.launch('move',e); }, false);
            VelibCanvas.canvas.addEventListener("mousedown", function (e){ VelibCanvas.launch('down',e); }, false);
            VelibCanvas.canvas.addEventListener("mouseup", function (e){ VelibCanvas.launch('up',e); }, false);
            VelibCanvas.canvas.addEventListener("mouseout", function (e){ VelibCanvas.launch('out',e); }, false);
        }
    },
    init: function(){
        VelibCanvas.initCanvas();
        VelibCanvas.events();
        VelibCanvas.clearCanvas();
    },
    initCanvas: function(){
        VelibCanvas.canvas = document.querySelector('#canvas');
        VelibCanvas.ctx = VelibCanvas.canvas.getContext('2d');
        VelibCanvas.height = VelibCanvas.canvas.height;
        VelibCanvas.width = VelibCanvas.canvas.width;
        VelibCanvas.currX, VelibCanvas.currY, VelibCanvas.prevX, VelibCanvas.prevY= 0;
        VelibCanvas.flag, VelibCanvas.dot_flag = false;
    },
    launch: function(action,e){
        if (this.responsive() <= 768){
            e.preventDefault();
            var eX = e.changedTouches[0].pageX - VelibCanvas.canvas.offsetLeft;
            var eY = e.changedTouches[0].pageY - VelibCanvas.canvas.offsetTop;
        }
        else {
            var eX = e.pageX - VelibCanvas.canvas.offsetLeft;
            var eY = e.pageY - VelibCanvas.canvas.offsetTop;
        }
        if (action == 'down'){
            VelibCanvas.prevX = VelibCanvas.currX;
            VelibCanvas.prevY = VelibCanvas.currY;
            VelibCanvas.currX = eX;
            VelibCanvas.currY = eY;
            VelibCanvas.flag = true;
            VelibCanvas.dot_flag = true;
            if (VelibCanvas.dot_flag){
                VelibCanvas.ctx.beginPath();
                VelibCanvas.ctx.fillStyle = 'black';
                VelibCanvas.ctx.fillRect(VelibCanvas.currX,VelibCanvas.currY,2,2);
                VelibCanvas.ctx.closePath();
                VelibCanvas.dot_flag = false;
            }
        }
        if (action == 'up' || action == "out") {
            VelibCanvas.flag = false;
        }
        if (action == 'move'){
            if (VelibCanvas.flag) {
                VelibCanvas.prevX = VelibCanvas.currX;
                VelibCanvas.prevY = VelibCanvas.currY;
                VelibCanvas.currX = eX;
                VelibCanvas.currY = eY;
                VelibCanvas.draw();
            }
        }
    },
    move: function () {
        $('#btnback2').click(function () {
            var elem = $('#map');
            $('html, body').animate({
                scrollTop: elem.offset().top
            }, 1000 );
        });
    },
    responsive: function () {
        var width = $(window).width();
        return width;
    },
};