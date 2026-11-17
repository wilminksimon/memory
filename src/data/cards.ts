import type { Theme } from '../types/theme-types';

//Code Vibes
import angular from '../assets/memory-images/code-vibes/angular.svg';
import bootstrap from '../assets/memory-images/code-vibes/bootstrap.svg';
import css from '../assets/memory-images/code-vibes/css-logo.svg';
import django from '../assets/memory-images/code-vibes/django-icon.svg';
import firebase from '../assets/memory-images/code-vibes/firebase.svg';
import git from '../assets/memory-images/code-vibes/git-icon.svg';
import github from '../assets/memory-images/code-vibes/github-logo.svg';
import html from '../assets/memory-images/code-vibes/html-logo.svg';
import javascript from '../assets/memory-images/code-vibes/javascript-logo.svg';
import molekul from '../assets/memory-images/code-vibes/molekul.svg';
import node from '../assets/memory-images/code-vibes/node-logo.svg';
import python from '../assets/memory-images/code-vibes/python-icon.svg';
import sass from '../assets/memory-images/code-vibes/sass-logo.svg';
import staple from '../assets/memory-images/code-vibes/staple.svg';
import terminal from '../assets/memory-images/code-vibes/terminal-logo.svg';
import typescript from '../assets/memory-images/code-vibes/typescript-logo.svg';
import vite from '../assets/memory-images/code-vibes/vita.svg';
import vscode from '../assets/memory-images/code-vibes/vscode-logo.svg';

//gaming
import banana from '../assets/memory-images/gaming/banana.svg';
import coin from '../assets/memory-images/gaming/coin.svg';
import controller from '../assets/memory-images/gaming/controller.svg';
import creeper from '../assets/memory-images/gaming/creeper.svg';
import dice from '../assets/memory-images/gaming/dice.svg';
import gameCard from '../assets/memory-images/gaming/game-card.svg';
import gameboy from '../assets/memory-images/gaming/gameboy.svg';
import labyrinth from '../assets/memory-images/gaming/labyrinth.svg';
import levelUp from '../assets/memory-images/gaming/level-up.svg';
import mushroom from '../assets/memory-images/gaming/mushroom.svg';
import pacmanOnly from '../assets/memory-images/gaming/pacman-only.svg';
import pacman from '../assets/memory-images/gaming/pacman.svg';
import playButton from '../assets/memory-images/gaming/play-button.svg';
import puzzle from '../assets/memory-images/gaming/puzzle.svg';
import snake from '../assets/memory-images/gaming/snake.svg';
import squidCircle from '../assets/memory-images/gaming/squid-circle.svg';
import squidSquare from '../assets/memory-images/gaming/squid-square.svg';
import squidTriangle from '../assets/memory-images/gaming/squid-triangle.svg';

//DA-Projects
import arrow from '../assets/memory-images/da-project/arrow.svg';
import basket from '../assets/memory-images/da-project/basket.svg';
import bomb from '../assets/memory-images/da-project/bomb.svg';
import chef from '../assets/memory-images/da-project/chef.svg';
import coins from '../assets/memory-images/da-project/coins.svg';
import cruisine from '../assets/memory-images/da-project/cruisine.svg';
import daBubble from '../assets/memory-images/da-project/da-bubble.svg';
import elPolloLoco from '../assets/memory-images/da-project/el-pollo-loco.svg';
import greenLogo from '../assets/memory-images/da-project/green-logo.svg';
import join from '../assets/memory-images/da-project/join.svg';
import massenger from '../assets/memory-images/da-project/massenger.svg';
import pokedex from '../assets/memory-images/da-project/pokedex.svg';
import sakuraBowl from '../assets/memory-images/da-project/sakura-bowl.svg';
import sakuraEgg from '../assets/memory-images/da-project/sakura-egg.svg';
import sakuraLogo from '../assets/memory-images/da-project/sakura-logo.svg';
import sakuraRamen from '../assets/memory-images/da-project/sakura-ramen.svg';
import sharky from '../assets/memory-images/da-project/sharky.svg';
import ticTacToe from '../assets/memory-images/da-project/tic-tac-toe.svg';

//Foods
import brezel from '../assets/memory-images/foods/brezel.svg';
import burger from '../assets/memory-images/foods/burger.svg';
import choc from '../assets/memory-images/foods/choc.svg';
import corndog from '../assets/memory-images/foods/corndog.svg';
import cupcake from '../assets/memory-images/foods/cupcake.svg';
import donut from '../assets/memory-images/foods/donut.svg';
import fries from '../assets/memory-images/foods/fries.svg';
import ice from '../assets/memory-images/foods/ice.svg';
import macaroons from '../assets/memory-images/foods/macaroons.svg';
import pizza from '../assets/memory-images/foods/pizza.svg';
import pudding from '../assets/memory-images/foods/pudding.svg';
import salad from '../assets/memory-images/foods/salad.svg';
import sandwich from '../assets/memory-images/foods/sandwich.svg';
import sushi from '../assets/memory-images/foods/sushi.svg';
import taco from '../assets/memory-images/foods/taco.svg';
import tarte from '../assets/memory-images/foods/tarte.svg';
import wings from '../assets/memory-images/foods/wings.svg';
import wrap from '../assets/memory-images/foods/wrap.svg';

//Backsides
import codeVibesBack from '../assets/memory-images/code-vibes/backside-code-vibes.svg';
import gamingBack from '../assets/memory-images/gaming/backside-gaming.svg';
import daProjectsBack from '../assets/memory-images/da-project/backside-da-projekt.svg';
import foodsBack from '../assets/memory-images/foods/backside-foods.svg';

export const cards: Record<Theme, string[]> = {
    'code-vibes': [
        angular, bootstrap, css, django, firebase, git,
        github, html, javascript, molekul, node, python,
        sass, staple, terminal, typescript, vite, vscode
    ],

    games: [
        banana, coin, controller, creeper, dice, gameCard,
        gameboy, labyrinth, levelUp, mushroom, pacmanOnly, pacman,
        playButton, puzzle, snake, squidCircle, squidSquare, squidTriangle
    ],

    'da-projects': [
        arrow, basket, bomb, chef, coins, cruisine,
        daBubble, elPolloLoco, greenLogo, join, massenger, pokedex,
        sakuraBowl, sakuraEgg, sakuraLogo, sakuraRamen, sharky, ticTacToe
    ],

    food: [
        brezel, burger, choc, corndog, cupcake, donut,
        fries, ice, macaroons, pizza, pudding, salad,
        sandwich, sushi, taco, tarte, wings, wrap
    ]
};

export const cardBacks: Record<Theme, string> = {
    'code-vibes': codeVibesBack,
    games: gamingBack,
    'da-projects': daProjectsBack,
    food: foodsBack
};