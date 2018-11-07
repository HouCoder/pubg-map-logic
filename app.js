let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    Graphics = PIXI.Graphics;

let app = new Application({width: 1024, height: 1024});

document.querySelector('.container').appendChild(app.view);

/**
 * Recursively shrinks circle count times.
 * @param {object} outerCircle  - Outer circle.
 * @param {object} globalParent - Global parent.
 * @param {number} duration     - Duration of each circle.
 * @param {number} count        - Recurse count - 1 times.
 */
function shrinker(outerCircle, globalParent, duration = 30, count = 4) {
    const outerCircleRadius = outerCircle.width / 2;
    const innerCircle = utilities.generateCircle(outerCircleRadius / 2);

    const outerCirclePosition = outerCircle.getGlobalPosition();
    const innerCirclePosition = utilities.generatePositionInOuterCircle(
        outerCirclePosition.x,
        outerCirclePosition.y,
        outerCircleRadius,
        outerCircleRadius / 2
    );

    innerCircle.x = innerCirclePosition.x;
    innerCircle.y = innerCirclePosition.y;

    globalParent.addChild(innerCircle);

    let xMovePerSec = Math.abs(outerCirclePosition.x - innerCirclePosition.x) / duration;
    let yMovePerSec = Math.abs(outerCirclePosition.y - innerCirclePosition.y) / duration;
    let sizeShrinkPerSec = (outerCircle.width - innerCircle.width) / duration;

    let shrinkCircle = setInterval(() => {
        outerCircle.width = outerCircle.width - sizeShrinkPerSec;
        outerCircle.height = outerCircle.height - sizeShrinkPerSec;

        if (utilities.between(outerCircle.x, innerCirclePosition.x - 0.1, innerCirclePosition.x + 0.1) &&
            utilities.between(outerCircle.y, innerCirclePosition.y - 0.1, innerCirclePosition.y + 0.1))
        {
            // Remove outerCircle
            globalParent.removeChild(outerCircle);

            if (count === 0) {
                alert('🏅️🏅️🐓🥣');
            } else {
                // Generate new inner circle and shrink the outer circle again.
                shrinker(innerCircle, globalParent, duration, count - 1);
            }

            clearInterval(shrinkCircle);
        }

        // Outer circle's x greater than small circle's x, decrease outer circle's x value.
        if (outerCirclePosition.x > innerCirclePosition.x) {
            outerCircle.x = outerCircle.x - xMovePerSec;
        }

        // Outer circle's x less than small circle's x, increase outer circle's x value.
        if (outerCirclePosition.x < innerCirclePosition.x) {
            outerCircle.x = outerCircle.x + xMovePerSec;
        }

        // Outer circle's y greater than small circle's y, decrease outer circle's y value.
        if (outerCirclePosition.y > innerCirclePosition.y) {
            outerCircle.y = outerCircle.y - yMovePerSec;
        }

        // Outer circle's y less than small circle's y, increase outer circle's y value.
        if (outerCirclePosition.y < innerCirclePosition.y) {
            outerCircle.y = outerCircle.y + yMovePerSec;
        }
    }, 1000);
}

// Load image
loader
    // https://www.reddit.com/r/PUBATTLEGROUNDS/comments/6g1u2v/alternative_pubg_maps_topographic_realistic_raw/
    .add('./erangel.jpg')
    .load(() => {
        let erangel = new Sprite(loader.resources['./erangel.jpg'].texture);

        erangel.width = app.view.width;
        erangel.height = app.view.height;

        const initialRadius = 300;
        const circle = utilities.generateCircle(initialRadius);

        const randomPosition = utilities.generateRandomPosition(erangel.width, erangel.height, initialRadius);

        circle.x = randomPosition.x;
        circle.y = randomPosition.y;

        erangel.addChild(circle);
        app.stage.addChild(erangel);

        shrinker(circle, erangel, 10, 2);
    });
