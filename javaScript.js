window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var t = Date.now();
    var cWidth = canvas.width;
    var cHeight = canvas.height;

    var colorK = "#17ab00";
    var colorB = "rgb(24, 24, 24)";

    if('ontouchstart' in window){
        var mobile = true;
        //event.preventDefault(); //отключение скролинга сайта и захват ивентов движения пальца
    }else{
        var mobile = false
    }//проверка сайт мобильный или комп

    var Msize = 4;

    var M = [];
    for(i = 0; i < Msize; i++){
        M[i] = []
        for(j = 0; j < Msize; j++){
            M[i][j] = 0;
        }
    }


    var Animation = [];

    class AnimKletka{
        constructor(x, y, v, vek = 0){
            this.x = x;
            this.y = y;
            this.cx = x * sizepx + Xmas;
            this.cy = y * sizepx + Ymas;

            this.v = v;
            this.vekx = 0;
            this.veky = 0;
            this.moved = false;
            this.summed = false;
            this.k = 0;
            this.speed = sizepx * 4;
            if(vek){
                this.move(vek);
            }
        }
        move(vek = 0){
            switch(vek){
                case 0:
                    this.vekx = 0;
                    this.veky = 0;
                    return 0;
                    //break;
                case 1:
                    this.vekx = 1;
                    this.veky = 0;
                    break;
                case 2:
                    this.vekx = 0;
                    this.veky = 1;
                    break;
                case 3:
                    this.vekx = -1;
                    this.veky = 0;
                    break;
                case 4:
                    this.vekx = 0;
                    this.veky = -1;
                    break;}
            this.k = sizepx;
            this.moved = true;
        }
        draw(timePassed){
            if(!this.moved){return 0}
            this.cx += this.speed * timePassed * this.vekx;
            this.cy += this.speed * timePassed * this.veky;
            this.k -= this.speed * timePassed
            if(this.k <= 0){
                this.moved = false;
            }

            drawValue(this.cx, this.cy, this.v)
        }

    }

    function drawValue(cx, cy, v){
        context.beginPath();
        context.fillStyle = colorB;
        context.fillRect(cx + sizepx / 100 * 8, cy + sizepx / 100 * 8, sizepx - sizepx / 100 * 16, sizepx - sizepx / 100 * 16);
        context.beginPath();
        context.strokeStyle = colorK;
        context.lineWidth = sizepx / 100 * 4
        context.strokeRect(cx + sizepx / 100 * 8, cy + sizepx / 100 * 8, sizepx - sizepx / 100 * 16, sizepx - sizepx / 100 * 16);

        var lengthNumper = v + ""
        lengthNumper = lengthNumper.length
        context.beginPath();
        context.font = sizepx / lengthNumper + "px Arial";
        context.fillStyle = colorK;
        context.fillText(v, cx + sizepx / 100 * 23, cy + sizepx / 2 + (sizepx / lengthNumper) / 2.8);
    }

    //var messeg = "mobile " + mobile;
    function canvasConsole(messeg){ //консоль в canvas
        context.beginPath();
        context.font = cWidth / 100 * 50 / 5 + "px Arial";
        context.fillStyle = "#17ab00";
        context.fillText(messeg, 20, cHeight);
    }

    var Xmas = cWidth / 100 * 25;
    var Ymas = cHeight / 100 * 25;

    //отрисовываем сетку и числа в ней
    sizepx = cWidth / 100 * 50 / Msize
    function drawMas(){
        for(i = 0; i < Msize; i++){
            for(j = 0; j < Msize; j++){
                context.beginPath();
                context.lineWidth = sizepx / 100 * 2;
                context.strokeStyle = colorK;
                context.strokeRect(j * sizepx + Xmas, i * sizepx + Ymas, sizepx, sizepx);

                if(M[i][j] != 0){
                    var lengthNumper = M[i][j] + ""
                    lengthNumper = lengthNumper.length
                    /*context.beginPath();
                    context.font = sizepx / lengthNumper + "px Arial";
                    context.fillStyle = colorK;
                    context.fillText(M[i][j], j * sizepx + Xmas + sizepx / 100 * 23, i * sizepx + Ymas + sizepx / 2 + (sizepx / lengthNumper) / 2.8);*/

                    drawValue(j * sizepx + Xmas, i * sizepx + Ymas, M[i][j].v)
                }

            }
        }
    }

    class Value{
        constructor(v){
            this.v = v;
            this.vekx = 0;
            this.veky = 0;
            this.summed = false;
        }
        /*move(vek = 0){
            switch(vek){
                case 0:
                    this.vekx = 0;
                    this.veky = 0;
                    return 0;
                    //break;
                case 1:
                    this.vekx = 1;
                    this.veky = 0;
                    break;
                case 2:
                    this.vekx = 0;
                    this.veky = 1;
                    break;
                case 3:
                    this.vekx = -1;
                    this.veky = 0;
                    break;
                case 4:
                    this.vekx = 0;
                    this.veky = -1;
                    break;
                }
        }*/
    }

    //втыкаем 2 или 4 в сетку
    function randomSpawn(){
        var k = 0; //количество свободных клеток
        for(ri = 0; ri < Msize; ri++){
            for(rj = 0; rj < Msize; rj++){
                if(M[ri][rj] == 0){
                    k++;
                }
            }
        }
        if(k == 0){
            return 0;
        }
        
        while(true){
            var rx = Math.floor(Math.random() * Msize);
            var rt = Math.floor(Math.random() * Msize);
            if(M[rx][rt] == 0){
                if(Math.floor(Math.random() * 10) == 0){
                    M[rx][rt] = new Value(4);
                }else{
                    M[rx][rt] = new Value(2);
                }
                return 1;
            }
        }
    }


    randomSpawn();
    randomSpawn();

    

    //обнаружение свайпа и его направления
    function swipe(evt = 0){
        console.log(M)
        var sizepx = cWidth / 100 * 50 / Msize

        if(mobile){ //обработка свайпа на телефоне

            var swipeDir;
            var startX, startY, distX, distY;
            var threshold = sizepx / 10; // минимальное расстояние, чтобы считать свайп
          
            //canvas.ontouchstart = function(e) {
            //console.log('touchstart')
            var touch = evt.changedTouches[0];
            startX = touch.pageX;
            startY = touch.pageY;
            //console.log(startX + " " + startY)
            
            
            canvas.ontouchend = function(e) {
                var touch = e.changedTouches[0];
                distX = touch.pageX - startX;
                distY = touch.pageY - startY;
                //console.log(startX + " " + startY + " " + distX + " " + distY)

              if(Math.abs(distX) > sizepx / 10 || Math.abs(distY) > sizepx / 10){
                if(Math.abs(distX) > Math.abs(distY)){
                    if(distX > 0){
                        move(1);
                    }else{
                        move(3);
                    }
                }else{
                    if(distY > 0){
                        move(2);
                    }else{
                        move(4);
                    }
                }
            }
            }

        }else{
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            //console.log(mouseX + " " + mouseY);
            canvas.onmouseup = function(){
                if(Math.abs(event.clientX - mouseX) > sizepx / 10 || Math.abs(event.clientY - mouseY) > sizepx / 10){
                    if(Math.abs(event.clientX - mouseX) > Math.abs(event.clientY - mouseY)){
                        if(event.clientX - mouseX > 0){
                            move(1);
                        }else{
                            move(3);
                        }
                    }else{
                        if(event.clientY - mouseY > 0){
                            move(2);
                        }else{
                            move(4);
                        }
                    }
                }
            };
        }

    } //конец функции свайп

    if(mobile){
        canvas.addEventListener('touchstart', swipe, false);
    }else{
        canvas.addEventListener('mousedown', swipe, false);
    }


    //функция перемещения и сложения значений в сетке
    function move(vector){
        switch (vector){
            case 1: //свайп вправо
                var flag = true;
                flagup = false; //флаг изменились ли значения вообще для randomSpawn
                while (flag){
                    flag = false;
                    for(li = 0; li < Msize; li++){
                        for(lj = Msize - 2; lj >= 0; lj -= 1){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li][lj + 1] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li][lj + 1] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li][lj + 1].v == M[li][lj].v){ //если одинаковые значения увеличиваем
                                    if(M[li][lj + 1].summed || M[li][lj].summed){continue}
                                    M[li][lj + 1].v = M[li][lj].v * 2;
                                    M[li][lj + 1].summed = true;
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }
                            }
                        }
                    }
                }
                if(flagup){
                    randomSpawn();
                }
                break;
            case 3: //свайп влево
                var flag = true;
                var flagup = false;
                while (flag){
                    flag = false;
                    for(li = 0; li < Msize; li++){
                        for(lj = 1; lj < Msize; lj++){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li][lj - 1] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li][lj - 1] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li][lj - 1].v == M[li][lj].v){ //если одинаковые значения увеличиваем
                                    if(M[li][lj - 1].summed || M[li][lj].summed){continue}
                                    M[li][lj - 1].v = M[li][lj].v * 2;
                                    M[li][lj - 1].summed = true;
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true
                                }
                            }
                        }
                    }
                }
                if(flagup){
                    randomSpawn();
                }
                break;
            case 2: //свайп вниз
                var flag = true;
                var flagup = false;
                while (flag){
                    flag = false;
                    for(li = Msize - 2; li >= 0; li -= 1){
                        for(lj = 0; lj < Msize; lj++){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li + 1][lj] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li + 1][lj] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li + 1][lj].v == M[li][lj].v){ //если одинаковые значения увеличиваем
                                    if(M[li + 1][lj].summed || M[li][lj].summed){continue}
                                    M[li + 1][lj].v = M[li][lj].v * 2;
                                    M[li + 1][lj].summed = true;
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }
                            }
                        }
                    }
                }
                if(flagup){
                    randomSpawn();
                }
                break;
            case 4: //свайп вверх
                var flag = true;
                var flagup = false;
                while (flag){
                    flag = false;
                    for(li = 0 + 1; li < Msize; li++){
                        for(lj = 0; lj < Msize; lj++){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li - 1][lj] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li - 1][lj] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li - 1][lj].v == M[li][lj].v){ //если одинаковые значения увеличиваем
                                    if(M[li - 1][lj].summed || M[li][lj].summed){continue}
                                    M[li - 1][lj].summed = true;
                                    M[li - 1][lj].v = M[li][lj].v * 2;
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }
                            }
                        }
                    }
                }
                if(flagup){
                    randomSpawn();
                }
                break;
        }
        for(pi = 0; pi < Msize; pi++){
            for(pj = 0; pj < Msize; pj++){
                if(M[pj][pi] != 0){
                    M[pj][pi].summed = false;
                }
            }
        }
    }


    Animation.push(new AnimKletka(1, 1, 2, 1))


    //функция отрисоки и обновления
    function draw(){
        //подсчет и отрисовка fps
        var timePassed = (Date.now() - t) / 1000; //время между кадром
        var fps = Math.round(1 / timePassed); //сколько кадров отрисуется за такую скорость
        t = Date.now();

        context.clearRect(0, 0, cWidth, cHeight)

        drawMas()
        for (let i = 0; i < Animation.length; i++){
            Animation[i].draw(timePassed);

        }

        context.beginPath();
        context.font = cWidth / 100 * 50 / 12 + "px Arial";
        context.fillStyle = "#17ab00";
        context.fillText("Fps " + fps, 20, cWidth / 100 * 50 / 12 + 5); //вывод fps на экран

        //canvasConsole(k) //отрисовка canvas консоли

        context.beginPath();
        context.font = cWidth / 100 * 50 / 10 + "px Arial";
        context.fillStyle = "#17ab00";
        context.fillText("beta 5", cWidth - 150, cHeight - 2); //отрисовки версии

        window.requestAnimationFrame(draw);
    }
    draw();
}