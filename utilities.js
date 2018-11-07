(function (root) {
    root.utilities = {};

    /**
     * Returns a random decimal number between min (inclusive) and max (exclusive).
     * https://stackoverflow.com/a/1527820/4480674
     * @param {number} min - Minimum number.
     * @param {number} max - Maxmium number.
     * @returns {number}   - Random numer.
     */
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    utilities.getRandom = getRandom;

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * https://stackoverflow.com/a/1527820/4480674
     * @param {number} min - Minimum number.
     * @param {number} max - Maxmium number.
     * @returns {number}   - Random numer.
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    utilities.getRandomInt = getRandomInt;

    /**
     * Generate a random circle position within a certain screen size.
     * @param {number} screenWidth  - Screen width.
     * @param {number} screenHeight - Screen height.
     * @param {number} radius       - Circle radius.
     * @returns {object}            - The coordinate of circle, x and y.
     */
    function generateRandomPosition(screenWidth, screenHeight, radius) {
        const xRangeMin = radius;
        const xRangeMax = screenWidth / 2 + screenWidth / 2 - radius;

        const yRangeMin = radius;
        const yRangeMax = screenHeight / 2 + screenHeight / 2 - radius;

        return {
            x: getRandomInt(xRangeMin, xRangeMax),
            y: getRandomInt(yRangeMin, yRangeMax),
        };
    }

    utilities.generateRandomPosition = generateRandomPosition;

    /**
     * Returns sine value of angle.
     * https://stackoverflow.com/a/9705160
     * @param {number} angle - Angle.
     * @returns {number}     - Sine value of angle.
     */
    function getSineByAngle(angle) {
        return Math.sin(angle * (Math.PI / 180));
    }

    utilities.getSineByAngle = getSineByAngle;

    /**
     * Returns cosine value of angle.
     * https://stackoverflow.com/a/9705160
     * @param {number} angle - Angle.
     * @returns {number}     - Cosine value of angle.
     */
    function getCosineByAngle(angle) {
        return Math.cos(angle * (Math.PI / 180));
    }

    utilities.getCosineByAngle = getCosineByAngle;

    /**
     * Generate a ramdom circle position inside another circle.
     * @param {number} outerX      - Outer circle's x coordinate.
     * @param {number} outerY      - Outer circle's y coordinate.
     * @param {number} outerRadius - Outer circle's radius.
     * @param {number} innerRadius - Inner circle's radius.
     * @returns {object}           - The coordinate of circle, x and y.
     */
    function generatePositionInOuterCircle(outerX, outerY, outerRadius, innerRadius) {
        const minDistance = 0;
        const maxDistance = outerRadius - innerRadius;

        // Hypotenuse's length
        const hypotenuse = getRandom(minDistance, maxDistance);

        // Angle must less than 90.
        // TODO: when angle is 0 or 90?
        const angle = getRandom(0, 90);

        // Use angle and hypotenuse to calculate opposite and adjacent.
        // https://www.shuxuele.com/sine-cosine-tangent.html
        // https://www.shuxuele.com/algebra/trig-finding-angle-right-triangle.html

        const angleSine = getSineByAngle(angle);
        const angleCosine = getCosineByAngle(angle);

        let opposite = (hypotenuse * angleSine);
        let adjacent = (hypotenuse * angleCosine);

        // Randomly make opposite negative.
        if (Math.random() >= 0.5) {
            opposite = -Math.abs(opposite);
        }

        // Randomly make adjacent negative.
        if (Math.random() >= 0.5) {
            adjacent = -Math.abs(adjacent);
        }

        const result = {
            x: +(outerX + opposite).toFixed(1),
            y: +(outerY + adjacent).toFixed(1),
        };

        return result;
    }

    utilities.generatePositionInOuterCircle = generatePositionInOuterCircle;

    /**
     * Generate circle.
     * @param {number} radius - Circle's radius.
     * @returns {object}      - Pixi circle object.
     */
    function generateCircle(radius) {
        let circle = new PIXI.Graphics;
        circle.lineStyle(1, 0xFFFFFF);

        // Can't use x y arguments https://pixijs.download/v4.5.2/docs/PIXI.Graphics.html#drawCircle
        // https://github.com/pixijs/pixi.js/issues/2589
        circle.drawCircle(0, 0, radius);
        circle.endFill();

        return circle;
    }

    utilities.generateCircle = generateCircle;

    /**
     * Check a range of a number.
     * https://stackoverflow.com/a/6454237/4480674
     * @param {number} x   - The number you want to check.
     * @param {number} min - Minimum range.
     * @param {number} max - Maxmium range.
     * @returns {boolean}
     */
    function between(x, min, max) {
        return x >= min && x <= max;
    }

    utilities.between = between;
})(window);
