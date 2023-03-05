window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var t = Date.now();
    var cWidth = canvas.width;
    var cHeight = canvas.height;

    var mobile = ('ontouchstart' in window) ? true : false; //проверка сайт мобильный или комп

    var Msize = 4;

    var M = [];
    for(i = 0; i < Msize; i++){
        M[i] = []
        for(j = 0; j < Msize; j++){
            M[i][j] = 0;
        }
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
    function swipe(){
        if(mobile){ //обработка свайпа на телефоне
            evt.preventDefault();
            var touch = evt.changedTouches[0];
            var mouseX = touch.pageX;
            var mouseY = touch.pageY;
            elem.addEventListener('touchend', function(){
                if(Math.abs(touch.pageX - mouseX) > 10 || Math.abs(touch.pageY - mouseY) > 10){
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
            }, false);

        }else{
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            //console.log(mouseX + " " + mouseY);
            canvas.onmouseup = function(){
                if(Math.abs(event.clientX - mouseX) > 10 || Math.abs(event.clientY - mouseY) > 10){
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

    }

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

        

        window.requestAnimationFrame(draw);
    }
    draw();
}