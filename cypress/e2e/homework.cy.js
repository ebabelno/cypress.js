import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/');
           });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');
        });

   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Авторизация прошла успешно');
    })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('iLoveqastudio2');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('Неправильный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login_test);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('Валидация на наличие @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })

    it('Проверка логина в строке', function () {
        cy.get(main_page.email).type("GerMan@Dolnikov.ru");
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Авторизация прошла успешно');
})
})

describe('Проверка покупки нового аватара', function () {                 // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[id="k_email"]').type('USER_LOGIN');                   // вводим логин
         cy.get('input[id="k_password"]').type('USER_PASSWORD');               // вводим пароль
         cy.get('button[type="submit"]').click();                // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
         cy.wait(2000);
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // нажимаем кнопку Смена аватара
         cy.get('.available > button').first().click();   // кликаем Купить у первого доступного аватара
         cy.get('.card_number').type('4620869113632996');                     // вводим номер карты
         cy.get('.card_csv').type('125');                             // вводим CVV карты
         cy.get('.card_date').type('1226');                           // вводим срок действия карты
         cy.get('.card_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // нажимаем кнопку Оплатить
         cy.get('.threeds_number').type('56456');                            // вводим код подтверждения СМС
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // нажимаем кнопку Оплатить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
     });
 });