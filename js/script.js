//=========================================
//  Объект игры
//=========================================
var game = {
    //=========================================
    //  Параметры и переменные
    //=========================================
    sqr: [], //Массив для игры
    moveCount: 0, //Количество ходов
    player: 0, //Узнаем чей сейчас ход
    ended: 0, //Закончена ли игра

    //=========================================
    //  Функция: Сбор данных о полях
    //=========================================
    getFields: function () {
        //Перебор игровых полей
        $('.cell').each(function (ind) {
            game.sqr[ind] = $(this); //Получить данные поля
        });
    },

    //=========================================
    //  Функция: Проверка игровых полей
    //=========================================
    check: function () {
        //Проверка условия победы (Горизонталь)
        if (game.sqr[0].hasClass("tic") && game.sqr[1].hasClass("tic") && game.sqr[2].hasClass("tic")) {
            game.end(1);
        }
        else if (game.sqr[3].hasClass("tic") && game.sqr[4].hasClass("tic") && game.sqr[5].hasClass("tic")) {
            game.end(1);
        }
        else if (game.sqr[6].hasClass("tic") && game.sqr[7].hasClass("tic") && game.sqr[8].hasClass("tic")) {
            game.end(1);
        }
        //Проверка условия победы (Вертикаль)
        else if (game.sqr[0].hasClass("tic") && game.sqr[3].hasClass("tic") && game.sqr[6].hasClass("tic")) {
            game.end(1);
        }
        else if (game.sqr[1].hasClass("tic") && game.sqr[4].hasClass("tic") && game.sqr[7].hasClass("tic")) {
            game.end(1);
        }
        else if (game.sqr[2].hasClass("tic") && game.sqr[5].hasClass("tic") && game.sqr[8].hasClass("tic")) {
            game.end(1);
        }
        //Проверка условия победы (Диагональ)
        else if (game.sqr[0].hasClass("tic") && game.sqr[4].hasClass("tic") && game.sqr[8].hasClass("tic")) {
            game.end(1);
        }
        else if (game.sqr[2].hasClass("tic") && game.sqr[4].hasClass("tic") && game.sqr[6].hasClass("tic")) {
            game.end(1);
        }
        //Проверка условия поражения (Горизонталь)
        else if (game.sqr[0].hasClass("tac") && game.sqr[1].hasClass("tac") && game.sqr[2].hasClass("tac")) {
            game.end(0);
        }
        else if (game.sqr[3].hasClass("tac") && game.sqr[4].hasClass("tac") && game.sqr[5].hasClass("tac")) {
            game.end(0);
        }
        else if (game.sqr[6].hasClass("tac") && game.sqr[7].hasClass("tac") && game.sqr[8].hasClass("tac")) {
            game.end(0);
        }
        //Проверка условия поражения (Вертикаль)
        else if (game.sqr[0].hasClass("tac") && game.sqr[3].hasClass("tac") && game.sqr[6].hasClass("tac")) {
            game.end(0);
        }
        else if (game.sqr[1].hasClass("tac") && game.sqr[4].hasClass("tac") && game.sqr[7].hasClass("tac")) {
            game.end(0);
        }
        else if (game.sqr[2].hasClass("tac") && game.sqr[5].hasClass("tac") && game.sqr[8].hasClass("tac")) {
            game.end(0);
        }
        //Проверка условия поражения (Диагональ)
        else if (game.sqr[0].hasClass("tac") && game.sqr[4].hasClass("tac") && game.sqr[8].hasClass("tac")) {
            game.end(0);
        }
        else if (game.sqr[2].hasClass("tac") && game.sqr[4].hasClass("tac") && game.sqr[6].hasClass("tac")) {
            game.end(0);
        }
        // Проверка на ничью
        else {
            game.moveCount = 0;
            for (i = 0; i < game.sqr.length; i++) {
                if (game.sqr[i].hasClass("tic") || game.sqr[i].hasClass("tac")) {
                    game.moveCount++;
                }
            }
            if (game.moveCount == 9) {
                game.end(2);
            }
        }
    },

    //=========================================
    //  Функция: Ход игрока
    //=========================================
    go: function (cell) {
        if (game.ended == 0) {
            if (game.player == 0) {
                $('#gameState').empty().append('<h3>Ход Игрока 2 (Нолики)</h3>');
                $('#' + cell).empty().addClass('tic');
                game.player = 1;
                game.getFields();
                game.check();
            } else {
                $('#gameState').empty().append('<h3>Ход Игрока 1 (Крестики)</h3>');
                $('#' + cell).empty().addClass('tac');
                game.player = 0;
                game.getFields();
                game.check();
            }
        }
    },

    //=========================================
    //  Функция: Конец игры
    //=========================================
    end: function (mode) {
        //Установить статус законченной игры
        game.ended = 1;

        //Переключение режимов
        switch (mode) {
            case 0:
                $('#gameState').empty().append('Победа осталась за <b>Игроком 2</b>.<b>Игрок 1</b> потерпел поражение.<br>' +
                '<a onclick="document.location.reload();" style="cursor: pointer;">Начать заново</a>');
                break;
            case 1:
                $('#gameState').empty().append('Победа осталась за <b>Игроком 1</b>.<b>Игрок 2</b> потерпел поражение.<br>' +
                '<a onclick="document.location.reload();" style="cursor: pointer;">Начать заново</a>');
                break;
            case 2:
                $('#gameState').empty().append('Игра закончилась дружеской ничьей.<br>' +
                '<a onclick="document.location.reload();" style="cursor: pointer;">Начать заново</a>');
                break;
        }
    }
};

$(document).ready(function () {
    $('#gameState').empty().append('<h1>ИГРА НАЧАЛАСЬ!</h1><h3>Ход Игрока 1 (Крестики)</h3>');
    $('.cell').on("click", function () {
        game.go($(this).attr('id'));
    });
});