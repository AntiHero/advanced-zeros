module.exports = function getZerosCount(number, base) {
    /*if (number < 1 || number > Math.pow(10, 7) || base < 2 || base > 256) {
        return -1;
    }*/

    function isPrime (num) {
        let res = false;

        if (num == 2) {
            res = true;
        } else if (num >= 3 && num <= base) {
            for (let i = 2; i <= base; i++) {
                if (num%i == 0) {
                    num == i ? res = true : res = false;
                    break;
                }
            }
        }
        return res;
    }

    /* calculating prime factors of a number,
    "i.e. 3*3*7 = 63 => 3, 7 are prime factors" */
    function calcPrimeFactors(num) {
        let primeFactros = [];

        if (num >= 2 && num <= base) {
            for (let i = 2; i <= base; i++){
                if (num%i == 0) {
                    if (isPrime(i)) {
                        primeFactros.push(i);
                    }
                }
            }
        }
        return primeFactros;
    }

    function multiply(factors, powers) {
        let res = 1;
        let len = factors.length - 1;

        for (let i = len; i >= 0; i--) {
            res *= Math.pow(factors[i], powers[i]);
        }
        return res;
    }

    /* calculating powers of prime factors of a number, "i.e number is 63,
    prime factors are 3, 7 => 3^2*7^1 = 63, powers are [2, 1]"*/
    function factorize(num) {
        let primeFactors = calcPrimeFactors(num);
        let len = primeFactors.length;
        let powers = new Array(len);
        powers.fill(0);

        let tmp = num;

        while (tmp > 1) {
            for (let i = 0; i < len ; i++) {
                if (tmp%primeFactors[i] == 0) {
                    tmp /= primeFactors[i];
                    powers[i] += 1;
                    i = -1;
                }
            }
        }
        return powers;
    }

    let primeFactors = calcPrimeFactors(base);
    let powers = factorize(base);
    let len = primeFactors.length;
    let count = new Array(len);
    count.fill(0);

    let tmp = number;
    let power = 1;

    /*
    FIRST STEP: count how many time prime factor goes in our number
    SECOND STEP: divide this number by exponent of this factor in a number
    STEP THREE: do the same steps for other factors
    STEP FOUR: find the lowest result, this will be the number of trailing zeros
     */
    for (let i = 0; i < len; i++) {
        while (tmp/(Math.pow(primeFactors[i], power)) > 1) {
            count[i] += Math.floor(tmp/(Math.pow(primeFactors[i], power)));
            power++;
        }
        count[i] = Math.floor(count[i] / powers[i]);
        power = 1;
    }
    count.sort((a, b) => a - b);

    return count[0];
}

