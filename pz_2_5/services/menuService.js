
class MenuService {
    printMainMenu() {
        const user_choice =
            "1 (list) – перегляд вмісту каталогу;\n" +
            "2 (transfer) – перехід між каталогами;\n" +
            "3 (create) – створення файлу;\n" +
            "4 (create)– створення каталогу;\n" +
            "5 (file)– перегляд вмісту файлу;\n" +
            "6 (correct file)– редагування файлу;\n" +
            "7 (rename file)– перейменувати файл;\n" +
            "8 (rename catalog)– перейменувати каталог;\n" +
            "9 (delete file)– видалити файл;\n" +
            "10 (delete catalog)– видалити каталог;\n" +
            "11 (check info)– переглянути інформацію;\n" +
            "12 (exit)– вихід з програми;\n"

        console.log(user_choice)
    }
}

module.exports = new MenuService()