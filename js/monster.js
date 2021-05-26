/*
 * Grégoire Alexis S2D
 * Grégoire Alexis S2D
 * Grégoire Alexis S2D
 */

//Constante pour la fonction hasard
const timer = 12000;

//Variables globables d'un monstre
let name;
let life;
let money;
let awake = new Boolean(true);

//Variables globales de chaque bouton de la page
let but_newlife = document.getElementById("b1");
let but_run = document.getElementById("b2");
let but_fight = document.getElementById("b3");
let but_sleep = document.getElementById("b4");
let but_eat = document.getElementById("b5");
let but_show = document.getElementById("b6");
let but_work = document.getElementById("b7");
let but_kill = document.getElementById("k");

//Variable globale pour l'actionbox
let actionbox = document.getElementById("actionbox");
//Variable globale pour la boite de statut du monstre
let status = document.getElementById('status');
//Varible globale pour la boite monster (colorée)
let colorbox = document.getElementById('monster');

//Variable qui contient le setinterval de la fonction hasard
let vartime;

//Fonction qui initialise les variables globales du monstre à partir des valeurs en paramètre
function init(n, l, m) {
    name = n;
    life = l;
    money = m;
}

//Fonction qui permet d'afficher les caractéristiques du monstre dans l'actionbox
function showme() {
    log("Name : " + name + " | Life : " + life + " | Money : " + money + " | Awake : " + awake);
}

//Fonction qui permet de lancer le jeu
function go() {
    init(window.prompt('Name of your MONSTER ?'), 8, 15);
    displayStatus(life,money,awake);
    but_show.addEventListener('click', showme);
    but_run.addEventListener('click', run);
    but_fight.addEventListener('click', fight);
    but_work.addEventListener('click', work);
    but_eat.addEventListener('click', eat);
    but_sleep.addEventListener('click', sleep);
    but_newlife.addEventListener('click', newlife);
    but_kill.addEventListener('click', kill);
    vartime = setInterval(hasard, timer);
}

//Fonction qui permet d'afficher n'importe quel message en paramètre dans l'actionbox
function log(message) {
    let p = document.createElement("p");
    let t = document.createTextNode(message);
    p.appendChild(t);
    let fc = this.actionbox.firstChild;
    actionbox.insertBefore(p,fc);
}

//Fonction qui met à jour l'état du monstre dans la partie statut de la page
//et qui fait varier la couleur et l'épaisseur de la boite monster en fonction des variables
function displayStatus(life, money, awake) {
    while(status.firstChild) {
        status.removeChild(status.firstChild);
    }
    let li_1 = document.createElement("li");
    let li_2 = document.createElement("li");
    let li_3 = document.createElement("li");
    let txt_1 = document.createTextNode("Life : " + life);
    let txt_2 = document.createTextNode("Money : " + money);
    let txt_3 = document.createTextNode("Awake : " + awake);
    li_1.appendChild(txt_1);
    li_2.appendChild(txt_2);
    li_3.appendChild(txt_3);
    status.appendChild(li_1);
    status.appendChild(li_2);
    status.appendChild(li_3);
    if (life < 5) {
        colorbox.style.backgroundColor = 'red';
    }else if (life < 10) {
        colorbox.style.backgroundColor = 'orange';
    }else if (life < 15) {
        colorbox.style.backgroundColor = 'yellow';
    }else if (life < 20) {
        colorbox.style.backgroundColor = 'blue';
    }else if (life >= 20) {
        colorbox.style.backgroundColor = 'green';
    }
    if (money < 5) {
        colorbox.style.border = '0px solid black';
    }else if (money < 10) {
        colorbox.style.border = '5px solid black';
    }else if (money < 15) {
        colorbox.style.border = '10px solid black';
    }else if (money < 20) {
        colorbox.style.border = '15px solid black';
    }else if (money >= 20) {
        colorbox.style.border = '20px solid black';
    }
    if (life <= 0) {
        clearInterval(vartime);
    }
}

//Fonction qui permet au monstre de courir
function run() {
    if (life >= 1 && awake == true) {
        life = life - 1;
        log("Run : successful action");
    } else if (life <= 0 && awake == false) {
        log("Run : failed action (the monster is dead)");
    } else if (life <= 0) {
        log("Run : failed action (the monster is dead)");
        awake = new Boolean(false);
    } else if (awake == false) {
        log("Run : failed action (the monster isn't awake)");
    }
    displayStatus(life,money,awake);
}

//Fonction qui permet au monstre de se combattre
function fight() {
    if (life >= 3 && awake == true) {
        life = life - 3;
        log("Fight : successful action");
    } else if (life > 0 && life < 3 && awake == false) {
        log("Fight : failed action (the monster isn't awake)");
    } else if (life <= 0 && awake == false) {
        log("Fight : failed action (the monster is dead)");
    } else if (life > 0 && life < 3) {
        log("Fight : failed action (not enough life points)");
    } else if (life <= 0) {
        log("Fight : failed action (the monster is dead)");
        awake = new Boolean(false);
    } else if (awake == false) {
        log("Fight : failed action (the monster isn't awake)");
    }
    displayStatus(life,money,awake);
} 

//Fonction qui permet au monstre de travailler
function work() {
    if (life >= 1 && awake == true) {
        life = life - 1;
        money ++;
        money ++;
        log("Work : successful action");
    } else if (life <= 0 && awake == false) {
        log("Work : failed action (the monster is dead)");
    } else if (life <= 0) {
        log("Work : failed action (the monster is dead)");
        awake = new Boolean(false);
    } else if (awake == false) {
        log("Work : failed action (the monster isn't awake)");
    }
    displayStatus(life,money,awake);
} 

//Fonction qui permet au monstre de manger
function eat() {
    if (money >= 3 && awake == true && life > 0) {
        money = money - 3;
        life ++; 
        life ++;
        log("Eat : successful action");
    } else if (life <= 0) {
        log("Eat : failed action (the monster is dead)");
        awake = new Boolean(false);
    } else if (life > 0 && awake == false) {
        log("Eat : failed action (the monster isn't awake)");
    } else if (awake == true && life > 0 && money >= 0 && money < 3) {
        log("Eat : failed action (not enough money points)");
    }
    displayStatus(life,money,awake);   
} 

//Fonction qui permet au monstre de dormir
function sleep() {
    if (awake == true && life > 0) {
        log("Sleep : the monster starts to sleep (wait 7 seconds)");
        awake = new Boolean(false);
        displayStatus(life,money,awake);
        setTimeout(function(){ 
            log("Sleep : action completed");
            awake = new Boolean(true);
            life ++;
            displayStatus(life,money,awake);  
        }, 7000);
    }else if (life <= 0) {
        log("Sleep : failed action (the monster is dead)");
        awake = new Boolean(false);
    }else {
        log("Sleep : failed action (the monster is already sleeping)");
    }
}

//Fonction qui lance des actions au hasard toutes les 12 secondes
function hasard() {
    let tab = [but_run, but_fight, but_eat, but_work];
    tab[Math.floor(Math.random()*4)].click();
}

//Fonction qui permet de tuer le monstre
function kill() {
    if (life > 0) {
        life = 0;
        awake = new Boolean(false);
        log("Kill : successful action");
    }else {
        log("Kill : failed action (the monster is already dead)");
    }
    displayStatus(life,money,awake);
}

//Fonction qui permet de redemarrer le jeu lorsque le monstre a été tué
function newlife() {
    if (life <= 0) {
        awake = new Boolean(true);
        init(window.prompt('Name of your MONSTER ?'), 8, 15);
        log("New life : successful action");
    } else if (life > 0) {
        log("New life : failed action (the monster is already alive)");
    }
    vartime = setInterval(hasard, timer);
    displayStatus(life,money,awake);
}

//Ligne qui permet de lancer le jeu au lancement de la page
window.onload = go;