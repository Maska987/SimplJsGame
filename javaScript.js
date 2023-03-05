window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var t = Date.now();
    var cWidth = canvas.width;
    var cHeight = canvas.height;

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

    //var messeg = "mobile " + mobile;
    function canvasConsole(messeg){ //консоль в canvas
        context.beginPath();
        context.font = cWidth / 100 * 50 / 5 + "px Arial";
        context.fillStyle = "#17ab00";
        context.fillText(messeg, 20, cHeight);
    }

    //отрисовываем сетку и числа в ней
    function drawMas(sizepx = cWidth / 100 * 50 / Msize){
        var Xmas = cWidth / 100 * 25;
        var Ymas = cHeight / 100 * 25;
        for(i = 0; i < Msize; i++){
            for(j = 0; j < Msize; j++){
                context.beginPath();
                context.strokeStyle = "#17ab00";
                context.strokeRect(j * sizepx + Xmas, i * sizepx + Ymas, sizepx, sizepx);

                if(M[i][j] != 0){
                    var lengthNumper = M[i][j] + ""
                    lengthNumper = lengthNumper.length
                    context.beginPath();
                    context.font = sizepx / lengthNumper + "px Arial";
                    context.fillStyle = "#17ab00";
                    context.fillText(M[i][j], j * sizepx + Xmas + sizepx / 100 * 25, i * sizepx + Ymas + sizepx - sizepx / 100 * 10);
                }

            }
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
                    M[rx][rt] = 4;
                }else{
                    M[rx][rt] = 2;
                }
                return 1;
            }
        }
    }


    randomSpawn();
    randomSpawn();

    

    //обнаружение свайпа и его направления
    function swipe(evt = 0){
        var sizepx = cWidth / 100 * 50 / Msize

        if(mobile){ //обработка свайпа на телефоне
            /*
            evt.preventDefault();
            var touch = evt.changedTouches[0];
            var mouseX = touch.pageX;
            var mouseY = touch.pageY;
            //console.log(mouseX + " " + mouseY)
            canvas.addEventListener('touchend', function(evt){
                evt.preventDefault();
                var touch = evt.changedTouches[0];
                //console.log(touch.mouseX + " " + touch.mouseY)
                if(Math.abs(touch.pageX - mouseX) > sizepx / 10 || Math.abs(touch.pageY - mouseY) > sizepx / 10){
                    if(Math.abs(touch.pageX - mouseX) > Math.abs(touch.pageY - mouseY)){
                        if(touch.pageX - mouseX > 0){
                            move(1);
                        }else{
                            move(3);
                        }
                    }else{
                        if(touch.pageY - mouseY > 0){
                            move(2);
                        }else{
                            move(4);
                        }
                    }
                }
            }, listener = "once");
            */

            var swipeDir;
            var startX, startY, distX, distY;
            var threshold = sizepx / 100 * 50; // минимальное расстояние, чтобы считать свайп
          
            canvas.addEventListener('touchstart', function(e) {
              var touch = e.changedTouches[0];
              startX = touch.pageX;
              startY = touch.pageY;
            });
          
            canvas.addEventListener('touchend', function(e) {
              var touch = e.changedTouches[0];
              distX = touch.pageX - startX;
              distY = touch.pageY - startY;
          
              if (Math.abs(distX) >= threshold && Math.abs(distY) <= threshold) {
                swipeDir = (distX < 0) ? move(3) : move(1);
              } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= threshold) {
                swipeDir = (distY < 0) ? move(4) : move(2);
              }
          
              if (swipeDir && callback) {
                callback(swipeDir);
              }
            });

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
                        for(lj = Msize - 1; lj >= 0; lj -= 1){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li][lj + 1] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li][lj + 1] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li][lj + 1] == M[li][lj]){ //если одинаковые значения увеличиваем
                                    M[li][lj + 1] = M[li][lj] * 2;
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
                        for(lj = 0; lj < Msize; lj++){
                            if(M[li][lj] != 0){ //находим не пустое значение
                                if(M[li][lj - 1] == 0){ //если клетка впереди пустая двигаем значение
                                    M[li][lj - 1] = M[li][lj];
                                    M[li][lj] = 0;
                                    flag = true;
                                    flagup = true;
                                }else if(M[li][lj - 1] == M[li][lj]){ //если одинаковые значения увеличиваем
                                    M[li][lj - 1] = M[li][lj] * 2;
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
                                }else if(M[li + 1][lj] == M[li][lj]){ //если одинаковые значения увеличиваем
                                    M[li + 1][lj] = M[li][lj] * 2;
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
                                }else if(M[li - 1][lj] == M[li][lj]){ //если одинаковые значения увеличиваем
                                    M[li - 1][lj] = M[li][lj] * 2;
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
    }

    function update(){

    }

    //функция отрисоки и обновления
    function draw(){
        //подсчет и отрисовка fps
        var timePassed = (Date.now() - t) / 1000; //время между кадром
        var fps = Math.round(1 / timePassed); //сколько кадров отрисуется за такую скорость
        t = Date.now();

        context.clearRect(0, 0, cWidth, cHeight)

        drawMas()

        context.beginPath();
        context.font = "20px Arial";
        context.fillStyle = "#17ab00";
        context.fillText("Fps " + fps, 20, 20); //вывод fps на экран

        //canvasConsole(k) //отрисовка canvas консоли
        

        window.requestAnimationFrame(draw);
    }
    draw();
}