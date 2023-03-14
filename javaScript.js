//Я КОРОЛЬ КОСТЫЛЕЙ
window.onload = function(){
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, { passive: false });

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var t = Date.now();

    var Msize = 4;

    var score = 0;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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


    var M = [];
    for(i = 0; i < Msize; i++){
        M[i] = []
        for(j = 0; j < Msize; j++){
            M[i][j] = 0;
        }
    }





    var Animation = [];
    var Menu = [];
    


    class AnimKletka{
        constructor(x, y, v, vek = 0, kk = 0, summed = false, spawn = false){
            //console.log(x, y, kk)
            this.x = x;
            this.y = y;
            this.cx = x * sizepx + Xmas;
            this.cy = y * sizepx + Ymas;

            if(spawn){
                this.sizek = 20;
            }else{
                this.sizek = 8;
            }
            this.v = v;
            this.vekx = 0;
            this.veky = 0;
            this.moved = true;
            this.summed = summed;
            this.k = 0;
            this.lk = 0;
            this.kk = kk;
            this.speed = sizepx * kk * 6;
            this.spawn = spawn;

            if(vek){
                this.move(vek);
            }
        }
        move(vek = 0){
            switch(vek){
                case 0:
                    this.vekx = 0;
                    this.veky = 0;
                    break;
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
            this.k = sizepx * this.kk;
            this.cx = this.cx + sizepx * this.vekx * this.kk * -1;
            this.cy = this.cy + sizepx * this.veky * this.kk * -1;
        }
        draw(timePassed){
            if(this.spawn){
                //console.log(this.sizek)
                if(this.sizek <= 8){
                    this.spawn = false;
                    this.sizek = 8;
                }else{
                    this.sizek -= sizepx / 2 * timePassed;
                }
            }
            if(!this.moved){
                drawValue(this.cx, this.cy, this.v, this.sizek);
                return 0}
            this.cx += this.speed * timePassed * this.vekx;
            this.cy += this.speed * timePassed * this.veky;
            this.k -= this.speed * timePassed;
            if(this.k <= 0){
                this.moved = false;
                this.cx = this.x * sizepx + Xmas;
                this.cy = this.y * sizepx + Ymas;
            }

            if(this.summed){
                //console.log(this.x, this.y)
                drawValue(this.cx, this.cy, this.v / 2, this.sizek)
            }else{
                drawValue(this.cx, this.cy, this.v, this.sizek)
            }
        }
    }

    function drawValue(cx, cy, v, size = 8){
        context.beginPath();
        context.fillStyle = colorB;
        context.fillRect(cx + sizepx / 100 * size, cy + sizepx / 100 * size, sizepx - sizepx / 100 * size * 2, sizepx - sizepx / 100 * size * 2);
        context.beginPath();
        context.strokeStyle = colorK;
        context.lineWidth = sizepx / 100 * 4;
        context.strokeRect(cx + sizepx / 100 * size, cy + sizepx / 100 * size, sizepx - sizepx / 100 * size * 2, sizepx - sizepx / 100 * size * 2);

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


    //задаем размеры canvas
    if(cWidth > cHeight){
        var Ymas = cHeight / 100 * 25;
        var Xmas = cWidth / 2 - Ymas;
        sizepx = cHeight / 100 * 50 / Msize
    }else{
        var Xmas = cWidth / 100 * 25;
        var Ymas = cHeight / 2 - Xmas;
        sizepx = cWidth / 100 * 50 / Msize
    }

    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cWidth = canvas.width;
        cHeight = canvas.height;
        if(cWidth > cHeight){
            Ymas = cHeight / 100 * 25;
            Xmas = cWidth / 2 - Ymas;
            sizepx = cHeight / 100 * 50 / Msize
        }else{
            Xmas = cWidth / 100 * 25;
            Ymas = cHeight / 2 - Xmas;
            sizepx = cWidth / 100 * 50 / Msize
        }

        Animation = [];
        for(i = 0; i < Msize; i++){
            for(j = 0; j < Msize; j++){
                if(M[i][j] == 0){continue;}
                Animation.push(new AnimKletka(j, i, M[i][j].v, 0, 0, false, false))
            }
        }
    }
    //var Xmas = cWidth / 100 * 25;
    //var Ymas = cHeight / 100 * 25;

    //отрисовываем сетку и числа в ней
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
            this.kk = 0;
        }
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
                    Animation.push(new AnimKletka(rt, rx, M[rx][rt].v, 0, 0, false, true))
                }else{
                    M[rx][rt] = new Value(2);
                    Animation.push(new AnimKletka(rt, rx, M[rx][rt].v, 0, 0, false, true))
                }
                return 1;
            }
        }
    }


    randomSpawn();
    randomSpawn();

    

    if(!mobile){ //добавляем слушателся нажатий клавишь
        document.addEventListener("keydown", function(event) {
            //console.log(event.keyCode); // Выводим код нажатой клавиши в консоль
            switch(event.keyCode){
                case 68:
                case 102:
                case 39:
                    move(1);
                    break;
                case 83:
                case 98:
                case 40:
                    move(2);
                    break;
                case 65:
                case 100:
                case 37:
                    move(3);
                    break;
                case 87:
                case 104:
                case 38:
                    move(4);
                    break;
            }
          });
    }
    //обнаружение свайпа и его направления
    function swipe(evt = 0){
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
                var push = false;
                while (flag){
                    flag = false;
                    for(li = 0; li < Msize; li++){
                        for(lj = Msize - 2; lj >= 0; lj -= 1){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li][lj + 1] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li][lj].kk += 1;
                                    M[li][lj + 1] = M[li][lj];
                                    //Animation.push(new AnimKletka(lj, li, M[li][lj].v, 1))
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li][lj + 1].v == M[li][lj].v){ //если одинаковые значения увеличиваем
                                    if(M[li][lj + 1].summed || M[li][lj].summed){continue}
                                    score += M[li][lj].v * 2
                                    //console.log(M[li][lj])
                                    if(!push){
                                        Animation = [];
                                        push = true;
                                    }
                                    Animation.push(new AnimKletka(lj + 1, li, M[li][lj].v * 2, 1, M[li][lj].kk + 1, true))
                                    //M[li][lj].kk += 1;
                                    //Animation.push(new AnimKletka(lj, li, M[li][lj].v, 1))
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
                    for(pi = 0; pi < Msize; pi++){
                        for(pj = 0; pj < Msize; pj++){
                            if(M[pj][pi] != 0){
                                if(!push){
                                    
                                    Animation = [];
                                    push = true;
                                }
                                Animation.unshift(new AnimKletka(pi, pj, M[pj][pi].v, 1, M[pj][pi].kk))
                                M[pj][pi].kk = 0;
                            }
                        }
                    }
                    randomSpawn();
                }
                break;

            case 3: //свайп влево
                var push = false;
                var flag = true;
                var flagup = false;
                while (flag){
                    flag = false;
                    for(li = 0; li < Msize; li++){
                        for(lj = 1; lj < Msize; lj++){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li][lj - 1] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li][lj].kk += 1;
                                    M[li][lj - 1] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li][lj - 1].v == M[li][lj].v){ //если одинаковые значения увеличиваем
                                    if(M[li][lj - 1].summed || M[li][lj].summed){continue}
                                    score += M[li][lj].v * 2
                                    if(!push){
                                        //console.log(Animation)
                                        Animation = [];
                                        push = true;
                                    }
                                    Animation.push(new AnimKletka(lj - 1, li, M[li][lj].v * 2, 3, M[li][lj].kk + 1, true))
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
                    for(pi = 0; pi < Msize; pi++){
                        for(pj = 0; pj < Msize; pj++){
                            if(M[pj][pi] != 0){
                                if(!push){
                                    //console.log(Animation)
                                    Animation = [];
                                    push = true;
                                }
                                Animation.unshift(new AnimKletka(pi, pj, M[pj][pi].v, 3, M[pj][pi].kk))
                                M[pj][pi].kk = 0;
                            }
                        }
                    }
                    randomSpawn();
                }
                break;
            case 2: //свайп вниз
                var push = false;
                var flag = true;
                var flagup = false;
                while (flag){
                    flag = false;
                    for(li = Msize - 2; li >= 0; li -= 1){
                        for(lj = 0; lj < Msize; lj++){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li + 1][lj] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li][lj].kk += 1;
                                    M[li + 1][lj] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li + 1][lj].v == M[li][lj].v){ //если одинаковые значения увеличиваем
                                    if(M[li + 1][lj].summed || M[li][lj].summed){continue}
                                    score += M[li][lj].v * 2
                                    if(!push){
                                        //console.log(Animation)
                                        Animation = [];
                                        push = true;
                                    }
                                    Animation.push(new AnimKletka(lj, li + 1, M[li][lj].v * 2, 2, M[li][lj].kk + 1, true))
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
                    for(pi = 0; pi < Msize; pi++){
                        for(pj = 0; pj < Msize; pj++){
                            if(M[pj][pi] != 0){
                                if(!push){
                                    //console.log(Animation)
                                    Animation = [];
                                    push = true;
                                }
                                Animation.unshift(new AnimKletka(pi, pj, M[pj][pi].v, 2, M[pj][pi].kk))
                                M[pj][pi].kk = 0;
                            }
                        }
                    }
                    randomSpawn();
                }
                break;
            case 4: //свайп вверх
                var push = false;
                var flag = true;
                var flagup = false;
                while (flag){
                    flag = false;
                    for(li = 0 + 1; li < Msize; li++){
                        for(lj = 0; lj < Msize; lj++){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li - 1][lj] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li][lj].kk += 1;
                                    M[li - 1][lj] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li - 1][lj].v == M[li][lj].v){ //если одинаковые значения увеличиваем
                                    if(M[li - 1][lj].summed || M[li][lj].summed){continue}
                                    score += M[li][lj].v * 2
                                    if(!push){
                                        Animation = [];
                                        push = true;
                                    }
                                    Animation.push(new AnimKletka(lj, li - 1, M[li][lj].v * 2, 4, M[li][lj].kk + 1, true))
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
                    for(pi = 0; pi < Msize; pi++){
                        for(pj = 0; pj < Msize; pj++){
                            if(M[pj][pi] != 0){
                                if(!push){
                                    Animation = [];
                                    push = true;
                                }
                                Animation.unshift(new AnimKletka(pi, pj, M[pj][pi].v, 4, M[pj][pi].kk))
                                M[pj][pi].kk = 0;
                            }
                        }
                    }
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


    //функция отрисоки и обновления
    function draw(){
        //подсчет и отрисовка fps
        var timePassed = (Date.now() - t) / 1000; //время между кадром
        var fps = Math.round(1 / timePassed); //сколько кадров отрисуется за такую скорость
        t = Date.now();

        context.clearRect(0, 0, cWidth, cHeight)

        drawMas()
        for (let i = Animation.length - 1; i >= 0; i--){
            //console.log(Animation[i].moved)
            Animation[i].draw(timePassed);
        }
        /*for (let i = Animation.length - 1; i >= 0; i--){
            if(!Animation[i].moved){
                Animation.pop();
            }
            
        }*/

        context.beginPath();
        context.font = sizepx / 2 + "px trebuchet ms";
        context.fillStyle = "#17ab00";
        context.fillText("Очки: " + score, Xmas, Ymas - 10);

        context.beginPath();
        context.font = sizepx / 2 + "px Arial";
        context.fillStyle = "#17ab00";
        context.fillText("Fps " + fps, 5, sizepx / 2); //вывод fps на экран

        //canvasConsole(k) //отрисовка canvas консоли

        context.beginPath();
        context.font = sizepx / 2 + "px Arial";
        context.fillStyle = "#17ab00";
        context.fillText("beta 8", cWidth - sizepx * 1.5, cHeight - 2); //отрисовки версии

        window.requestAnimationFrame(draw);
    }
    draw();
}