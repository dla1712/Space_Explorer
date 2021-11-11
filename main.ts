namespace SpriteKind {
    export const Gas = SpriteKind.create()
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
    Rocket.setImage(assets.image`myImage4`)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    while (controller.A.isPressed()) {
        let y = 0
        let x = 0
        projectile = sprites.createProjectileFromSprite(Rocket, mySprite, x, y)
        projectile.startEffect(effects.spray)
        pause(350)
    }
})
function left () {
    left()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`myImage1`)
    Rocket.setImage(assets.image`myImage7`)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 500)
    otherSprite.destroy(effects.fire, 500)
    info.changeScoreBy(1000)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`myImage2`)
    Rocket.setImage(assets.image`myImage6`)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`myImage3`)
    Rocket.setImage(assets.image`myImage5`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 200)
})
let myEnemy: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let Rocket: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
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
        . . . . . . f f f f . . . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . f b 1 1 1 1 1 1 b f . . . 
        . . . f 1 1 1 1 1 1 1 1 f . . . 
        . . f d 1 1 1 1 1 1 1 1 d f . . 
        . . f d 1 1 1 1 1 1 1 1 d f . . 
        . . f d d d 1 1 1 1 d d d f . . 
        . . f b d b f d d f b d b f . . 
        . . f c d c f 1 1 f c d c f . . 
        . . . f b 1 1 1 1 1 1 b f . . . 
        . . f f f c d b 1 b d f f f f . 
        f c 1 1 1 c b f b f c 1 1 1 c f 
        f 1 b 1 b 1 f f f f 1 b 1 b 1 f 
        f b f b f f f f f f b f b f b f 
        . . . . . f f f f f f . . . . . 
        . . . . . . . f f f . . . . . . 
        `, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
