namespace SpriteKind {
    export const Gas = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const EnemyFire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(img`
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . . 8 8 8 8 8 8 . . . . . 
        . . . . 8 8 f f f f 8 8 . . . . 
        . . . 8 8 8 f 1 1 f 8 8 8 . . . 
        . . 8 8 8 8 f 1 1 f 8 8 8 8 . . 
        8 8 8 8 8 8 f f f f 8 8 8 8 8 8 
        8 . 8 8 8 8 8 8 8 8 8 8 8 8 . 8 
        8 . 8 f f f f 1 1 f f f f 8 . 8 
        8 . 8 f 4 4 f f f f 4 4 f 8 . 8 
        8 . 8 f 4 4 f 1 1 f 4 4 f 8 . 8 
        8 . 8 f 4 4 f f f f 4 4 f 8 . 8 
        8 . 8 f 4 4 f 1 1 f 4 4 f 8 . 8 
        8 . . f 4 4 f f f f 4 4 f 8 . 8 
        8 . . . 2 2 . . . . 2 2 . . . 8 
        `)
    direction = 3
    rx = 0
    ry = -150
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.pewPew.play()
    if (direction == 1) {
        projectile = sprites.createProjectileFromSprite(assets.image`myImage7`, mySprite, rx, ry)
        projectile.startEffect(effects.spray)
        pause(200)
    } else if (direction == 2) {
        projectile = sprites.createProjectileFromSprite(assets.image`myImage6`, mySprite, rx, ry)
        projectile.startEffect(effects.spray)
        pause(200)
    } else if (direction == 3) {
        projectile = sprites.createProjectileFromSprite(assets.image`myImage4`, mySprite, rx, ry)
        projectile.startEffect(effects.spray)
        pause(200)
    } else if (direction == 4) {
        projectile = sprites.createProjectileFromSprite(assets.image`myImage5`, mySprite, rx, ry)
        projectile.startEffect(effects.spray)
        pause(200)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`myImage1`)
    direction = 1
    rx = -150
    ry = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyFire, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.bigCrash.play()
    music.setVolume(255)
    pause(1000)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 500)
    otherSprite.destroy(effects.fire, 500)
    info.changeScoreBy(1000)
})
function startNextLevel () {
    effects.starField.startScreenEffect()
    mySprite = sprites.create(img`
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . . 8 8 8 8 8 8 . . . . . 
        . . . . 8 8 f f f f 8 8 . . . . 
        . . . 8 8 8 f 1 1 f 8 8 8 . . . 
        . . 8 8 8 8 f 1 1 f 8 8 8 8 . . 
        8 8 8 8 8 8 f f f f 8 8 8 8 8 8 
        8 . 8 8 8 8 8 8 8 8 8 8 8 8 . 8 
        8 . 8 f f f f 1 1 f f f f 8 . 8 
        8 . 8 f 4 4 f f f f 4 4 f 8 . 8 
        8 . 8 f 4 4 f 1 1 f 4 4 f 8 . 8 
        8 . 8 f 4 4 f f f f 4 4 f 8 . 8 
        8 . 8 f 4 4 f 1 1 f 4 4 f 8 . 8 
        8 . . f 4 4 f f f f 4 4 f 8 . 8 
        8 . . . 2 2 . . . . 2 2 . . . 8 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite)
    mySprite.setStayInScreen(true)
    statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
    statusbar.attachToSprite(mySprite, -23, 0)
    info.setScore(0)
    info.setLife(3)
    game.splash("Welcome Player to David's Game")
    game.splash("To play: Use the arrow keys to move and the a button(space bar) to shoot missles at the aliens")
    Epoch = 0
    Level = 0
    Level += 1
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`myImage2`)
    direction = 2
    rx = 150
    ry = 0
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`myImage3`)
    direction = 4
    rx = 0
    ry = 150
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.EnemyFire, function (sprite, otherSprite) {
    tiles.destroySpritesOfKind(SpriteKind.EnemyFire)
    tiles.destroySpritesOfKind(SpriteKind.Projectile)
    animation.runImageAnimation(
    projectile,
    [img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . 5 5 4 4 2 4 4 5 5 . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . 5 5 4 4 2 4 4 5 5 . . . 
        . . 5 5 4 4 2 2 2 4 4 5 5 . . 
        . . . 5 5 4 4 2 4 4 5 5 . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . 5 5 4 4 2 4 4 5 5 . . . 
        . . 5 5 4 4 2 2 2 4 4 5 5 . . 
        . 5 5 4 4 2 2 . 2 2 4 4 5 5 . 
        . . 5 5 4 4 2 2 2 4 4 5 5 . . 
        . . . 5 5 4 4 2 4 4 5 5 . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . 5 5 4 4 2 4 4 5 5 . . . 
        . . 5 5 4 4 2 2 2 4 4 5 5 . . 
        . 5 5 4 4 2 2 . 2 2 4 4 5 5 . 
        5 5 4 4 2 2 . . . 2 2 4 4 5 5 
        . 5 5 4 4 2 2 . 2 2 4 4 5 5 . 
        . . 5 5 4 4 2 2 2 4 4 5 5 . . 
        . . . 5 5 4 4 2 4 4 5 5 . . . 
        . . . . 5 5 4 4 4 5 5 . . . . 
        . . . . . 5 5 4 5 5 . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . . . 5 . . . . . . . 
        `,img`
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 4 5 . . . . . . 
        . . . . . 5 4 4 4 5 . . . . . 
        . . . . 5 4 4 2 4 4 5 . . . . 
        . . . 5 4 4 2 2 2 4 4 5 . . . 
        . . 5 4 4 2 2 . 2 2 4 4 5 . . 
        . 5 4 4 2 2 . . . 2 2 4 4 5 . 
        5 4 4 2 2 . . . . . 2 2 4 4 5 
        . 5 4 4 2 2 . . . 2 2 4 4 5 . 
        . . 5 4 4 2 2 . 2 2 4 4 5 . . 
        . . . 5 4 4 2 2 2 4 4 5 . . . 
        . . . . 5 4 4 2 4 4 5 . . . . 
        . . . . . 5 4 4 4 5 . . . . . 
        . . . . . . 5 4 5 . . . . . . 
        . . . . . . . 5 . . . . . . . 
        `,img`
        . . . . . . . 4 . . . . . . . 
        . . . . . . 4 4 4 . . . . . . 
        . . . . . 4 4 2 4 4 . . . . . 
        . . . . 4 4 2 2 2 4 4 . . . . 
        . . . 4 4 2 2 . 2 2 4 4 . . . 
        . . 4 4 2 2 . . . 2 2 4 4 . . 
        . 4 4 2 2 . . . . . 2 2 4 4 . 
        4 4 2 2 . . . . . . . 2 2 4 4 
        . 4 4 2 2 . . . . . 2 2 4 4 . 
        . . 4 4 2 2 . . . 2 2 4 4 . . 
        . . . 4 4 2 2 . 2 2 4 4 . . . 
        . . . . 4 4 2 2 2 4 4 . . . . 
        . . . . . 4 4 2 4 4 . . . . . 
        . . . . . . 4 4 4 . . . . . . 
        . . . . . . . 4 . . . . . . . 
        `,img`
        . . . . . . . 4 . . . . . . . 
        . . . . . . 4 2 4 . . . . . . 
        . . . . . 4 2 2 2 4 . . . . . 
        . . . . 4 2 2 . 2 2 4 . . . . 
        . . . 4 2 2 . . . 2 2 4 . . . 
        . . 4 2 2 . . . . . 2 2 4 . . 
        . 4 2 2 . . . . . . . 2 2 4 . 
        4 2 2 . . . . . . . . . 2 2 4 
        . 4 2 2 . . . . . . . 2 2 4 . 
        . . 4 2 2 . . . . . 2 2 4 . . 
        . . . 4 2 2 . . . 2 2 4 . . . 
        . . . . 4 2 2 . 2 2 4 . . . . 
        . . . . . 4 2 2 2 4 . . . . . 
        . . . . . . 4 2 4 . . . . . . 
        . . . . . . . 4 . . . . . . . 
        `,img`
        . . . . . . . 2 . . . . . . . 
        . . . . . . 2 2 2 . . . . . . 
        . . . . . 2 2 . 2 2 . . . . . 
        . . . . 2 2 . . . 2 2 . . . . 
        . . . 2 2 . . . . . 2 2 . . . 
        . . 2 2 . . . . . . . 2 2 . . 
        . 2 2 . . . . . . . . . 2 2 . 
        2 2 . . . . . . . . . . . 2 2 
        . 2 2 . . . . . . . . . 2 2 . 
        . . 2 2 . . . . . . . 2 2 . . 
        . . . 2 2 . . . . . 2 2 . . . 
        . . . . 2 2 . . . 2 2 . . . . 
        . . . . . 2 2 . 2 2 . . . . . 
        . . . . . . 2 2 2 . . . . . . 
        . . . . . . . 2 . . . . . . . 
        `,img`
        . . . . . . . 2 . . . . . . . 
        . . . . . . 2 . 2 . . . . . . 
        . . . . . 2 . . . 2 . . . . . 
        . . . . 2 . . . . . 2 . . . . 
        . . . 2 . . . . . . . 2 . . . 
        . . 2 . . . . . . . . . 2 . . 
        . 2 . . . . . . . . . . . 2 . 
        2 . . . . . . . . . . . . . 2 
        . 2 . . . . . . . . . . . 2 . 
        . . 2 . . . . . . . . . 2 . . 
        . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . 2 . . . . 
        . . . . . 2 . . . 2 . . . . . 
        . . . . . . 2 . 2 . . . . . . 
        . . . . . . . 2 . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `],
    50,
    false
    )
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Boss, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (statusbar2.value == 0) {
        sprite.destroy(effects.fire, 5000)
        BossHealth = 1
        music.bigCrash.play()
    } else if (BossHealth == 1) {
        startLevelTwo()
    } else {
        statusbar2.value += -100
        music.smallCrash.play()
        sprite.startEffect(effects.fire, 1000)
    }
})
function startLevelTwo () {
    effects.starField.startScreenEffect()
    mySprite = sprites.create(img`
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . . 8 8 8 8 8 8 . . . . . 
        . . . . 8 8 f f f f 8 8 . . . . 
        . . . 8 8 8 f 1 1 f 8 8 8 . . . 
        . . 8 8 8 8 f 1 1 f 8 8 8 8 . . 
        8 8 8 8 8 8 f f f f 8 8 8 8 8 8 
        8 . 8 8 8 8 8 8 8 8 8 8 8 8 . 8 
        8 . 8 f f f f 1 1 f f f f 8 . 8 
        8 . 8 f 4 4 f f f f 4 4 f 8 . 8 
        8 . 8 f 4 4 f 1 1 f 4 4 f 8 . 8 
        8 . 8 f 4 4 f f f f 4 4 f 8 . 8 
        8 . 8 f 4 4 f 1 1 f 4 4 f 8 . 8 
        8 . . f 4 4 f f f f 4 4 f 8 . 8 
        8 . . . 2 2 . . . . 2 2 . . . 8 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite)
    mySprite.setStayInScreen(true)
    statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
    statusbar.attachToSprite(mySprite, -23, 0)
    info.setLife(3)
    game.splash("Start Level 2")
    game.splash("Destroy the Final Boss to Complete the Game")
    Epoch = 0
    Level = 2
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    otherSprite.destroy(effects.disintegrate, 200)
})
let L1Boss: Sprite = null
let projectile2: Sprite = null
let Level1Finish = 0
let Level1Boss = 0
let BossLife1 = 0
let myEnemy: Sprite = null
let myFuel: Sprite = null
let BossHealth = 0
let statusbar2: StatusBarSprite = null
let Level = 0
let Epoch = 0
let statusbar: StatusBarSprite = null
let projectile: Sprite = null
let ry = 0
let rx = 0
let direction = 0
let mySprite: Sprite = null
startNextLevel()
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(img`
        . . . f f f f . . . 
        . . f 5 5 5 5 f . . 
        . f 5 1 5 5 5 5 f . 
        f 5 1 5 2 5 5 5 4 f 
        f 5 1 5 5 5 5 5 4 f 
        f 5 5 5 5 2 5 5 4 f 
        f 5 5 5 5 5 5 5 4 f 
        . f 5 5 5 5 5 4 f . 
        . . f 4 4 4 4 f . . 
        . . . f f f f . . . 
        `, 0, 50)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(1000, function () {
    myEnemy = sprites.createProjectileFromSide(img`
        . 2 . . . . . . . . . . 2 . 
        . . 2 . . . . . . . . 2 . . 
        . . . 2 . . . . . . 2 . . . 
        . . 2 2 2 2 2 2 2 2 2 2 . . 
        . . 2 7 7 2 2 2 2 7 7 2 . . 
        . . 2 2 2 2 e e 2 2 2 2 . . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 . 
        2 . . 5 . . . . . . 5 . . 2 
        2 . . . 5 . . . . 5 . . . 2 
        2 . . . . 5 . . 5 . . . . 2 
        . 2 2 2 2 . . . . 2 2 2 2 . 
        `, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    Epoch += 1
})
game.onUpdateInterval(1000, function () {
    if (BossLife1 == 1) {
        if (Level1Finish == 0) {
            tiles.destroySpritesOfKind(SpriteKind.EnemyFire)
            tiles.destroySpritesOfKind(SpriteKind.Enemy)
            tiles.destroySpritesOfKind(SpriteKind.Boss)
            mySprite.destroy()
            Level1Finish = 1
            startLevelTwo()
        }
    } else if (Level1Boss == 1) {
        projectile2 = sprites.createProjectileFromSprite(assets.image`myImage5`, L1Boss, 0, 100)
        projectile2.setKind(SpriteKind.EnemyFire)
        projectile2.x = randint(5, 155)
        projectile2.startEffect(effects.spray)
        pause(200)
    }
})
game.onUpdateInterval(500, function () {
    if (Epoch == 2 && Level == 1) {
        L1Boss = sprites.createProjectileFromSide(img`
            ....................................................................................................
            .........................22222222222222222222222222222222222222222222222222.........................
            .........................22222222222222222222222222222222222222222222222222.........................
            .........................22222222222222222222222222222222222222222222222222.........................
            .........................22222222222222222222222222222222222222222222222222.........................
            .........................22222222222222222222222222222222222222222222222222.........................
            ....................222222222222222222222222222222222222222222222222222222222222....................
            ....................222222222222222222222222222222222222222222222222222222222222....................
            ....................222222222222222222222222222222222222222222222222222222222222....................
            ....................222222222222222222222222222222222222222222222222222222222222....................
            ....................222222222222222222222222222222222222222222222222222222222222....................
            ...............2222222222222222222222222222222222222222222222222222222222222222222222...............
            ...............2222222222222222222222222222222222222222222222222222222222222222222222...............
            ...............2222222222222222222222222222222222222222222222222222222222222222222222...............
            ...............2222222222222222222222222222222222222222222222222222222222222222222222...............
            ...............2222222222222222222222222222222222222222222222222222222222222222222222...............
            ..........22222222222222222222222222222222222222222222222222222222222222222222222222222222..........
            ..........22222222222222222222222222222222222222222222222222222222222222222222222222222222..........
            ..........22222222222222222222222222222222222222222222222222222222222222222222222222222222..........
            ..........22222222222222222222222222222222222222222222222222222222222222222222222222222222..........
            ..........22222222222222222222222222222222222222222222222222222222222222222222222222222222..........
            .....222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222.....
            .....222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222.....
            .....222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222.....
            .....222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222.....
            .....222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222.....
            2222222222222222222211111222222222221111122222222222222222211111222222222221111122222222222222222222
            2222222222222222222211111222222222221111122222222222222222211111222222222221111122222222222222222222
            2222222222222222222211111222222222221111122222222222222222211111222222222221111122222222222222222222
            2222222222222222222211111222222222221111122222222222222222211111222222222221111122222222222222222222
            2222222222222222222211111222222222221111122222222222222222211111222222222221111122222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            .....222222222222222.........................2222222222.........................222222222222222.....
            .....222222222222222.........................2222222222.........................222222222222222.....
            .....222222222222222.........................2222222222.........................222222222222222.....
            .....222222222222222.........................2222222222.........................222222222222222.....
            .....222222222222222.........................2222222222.........................222222222222222.....
            ..........22222......................................................................22222..........
            ..........22222......................................................................22222..........
            ..........22222......................................................................22222..........
            ..........22222......................................................................22222..........
            ..........22222......................................................................22222..........
            `, 0, 0)
        L1Boss.setKind(SpriteKind.Boss)
        L1Boss.x = 80
        L1Boss.y = 23
        statusbar2 = statusbars.create(20, 4, StatusBarKind.Health)
        statusbar2.attachToSprite(L1Boss, -65, 0)
        statusbar2.max = 2000
        statusbar2.value = 2000
        Level1Boss = 1
    } else if (BossHealth == 1) {
        BossLife1 = 1
    }
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
