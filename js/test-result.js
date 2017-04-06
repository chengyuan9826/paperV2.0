/**
 * Created by Administrator on 2016/8/2.
 */
$(function(){
    canvasRate(23.0);
});
function canvasRate(rate) {
    var can = document.getElementById('canvas'),
        spanProcent = document.getElementById('procent'),
        c = can.getContext('2d'),
        canWrap = document.getElementById('canvas-wrap'),
        ofHeight = canWrap.clientHeight,
        ofWidth = canWrap.clientWidth;
        can.width = ofHeight*2;
        can.height = ofWidth*2;
    var posX = can.width / 2,
        posY = can.height / 2,
        fps = 1000 / 200,
        procent = 0,
        oneProcent = 360 / 100,
        result = oneProcent * rate;
    c.lineCap = 'round';
    arcMove();
    function arcMove() {
        var deegres = 0;
        var acrInterval = setInterval(function () {
            deegres += 1;
            c.clearRect(0, 0, can.width, can.height);
            procent = deegres / oneProcent;
            spanProcent.innerHTML = procent.toFixed();
            c.beginPath();
            c.arc(posX, posY, posX - 12, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
            c.strokeStyle = '#0062db';
            c.lineWidth = '10';
            c.stroke();
            c.beginPath();
            c.arc(posX, posY, posX - 7, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
            c.strokeStyle = 'rgba(0,0,0,0.4)';
            c.lineWidth = '2';
            c.stroke();
            c.beginPath();
            c.arc(posX, posY, posX - 17, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
            c.strokeStyle = 'rgba(255,255,255,0.4)';
            c.lineWidth = '2';
            c.stroke();
            c.beginPath();
            c.strokeStyle = '#3ed55c';
            c.lineWidth = '10';
            c.arc(posX, posY, posX - 11, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + deegres));
            c.stroke();
            if (deegres >= result) clearInterval(acrInterval);
        }, fps);
    }
}
