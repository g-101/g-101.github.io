const texts = [
    "<span class='terminal-text__prompt'>Hello world! Bem vindo ao meu porfólio. Meu nome é <span class='highlight'>Genesis</span>.</span>",
    "<span class='terminal-text__prompt'>Apenas uma entusiata de tecnologia da informação, que gosta de resolver problemas de forma criativa!</span>",
    "<span class='terminal-text__prompt'>Adoro jogos que envolvem estrategia e resolução de puzzles.</span>",
    "<span class='terminal-text__prompt'>No momento estudo a linguagem C e como funciona o sistema operacional.</span>",
    "<span class='terminal-text__prompt'>____________________________________</span>",
    "<span class='terminal-text__prompt'>Veja meus <a href='/projetos' target='_blank'>projetos</a> e <a href='https://medium.com/@g101' target='_blank'>blog</a>.",
    "<span class='terminal-text__prompt'>Você pode entrar em contato comigo no <a href='https://www.linkedin.com/in/genesislima101/' target='_blank'>linkedin</a>.",
];

const scrollAt = 20;
let typedText = document.getElementById("typedText");
let content = "";
let index = 0;
let row = 0;
let arrLen = texts[0].length;
let textPosition = 0;
let speed = 60;

function typer() {
    content = " ";
    row = Math.max(0, index - scrollAt);

    while (row < index) {
        content += texts[row++] + "<br />";
    }
    typedText.innerHTML =
        content + texts[index].substring(0, textPosition) + "<b class='cursor'>█</b>";
    if (textPosition++ === arrLen) {
        textPosition = 0;
        index++;
        if (index !== texts.length) {
            arrLen = texts[index].length;
            setTimeout("typer()", 300);
        }
    } else {
        setTimeout("typer()", speed);
    }
}

window.addEventListener("load", typer);
