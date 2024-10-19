
function decodeValue(value, base) {
    return BigInt(parseInt(value, base));  
}


function lagrangeInterpolation(points) {
    const k = points.length;
    let secret = BigInt(0);

    for (let i = 0; i < k; i++) {
        const xi = BigInt(points[i].x);
        const yi = points[i].y;
        let term = yi;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const xj = BigInt(points[j].x);
                term = term * (-xj) / (xi - xj);  
            }
        }
        secret += term;
    }

    return secret;
}


function solveSecretSharing(testCase) {
    const n = testCase.keys.n;
    const k = testCase.keys.k;

    const points = [];

    
    Object.keys(testCase).forEach(key => {
        if (key === 'keys') return;  

        const x = parseInt(key);  
        const pointObject = testCase[key];
        const base = parseInt(pointObject.base);
        const value = pointObject.value;
        const y = decodeValue(value, base);  

        points.push({ x, y });
    });

    
    const secret = lagrangeInterpolation(points.slice(0, k));

    return secret;
}


function main() {
    
    const testCase1 = {
        "keys": {
            "n": 4,
            "k": 3
        },
        "1": {
            "base": "10",
            "value": "4"
        },
        "2": {
            "base": "2",
            "value": "111"
        },
        "3": {
            "base": "10",
            "value": "12"
        },
        "6": {
            "base": "4",
            "value": "213"
        }
    };

    
    const testCase2 = {
        "keys": {
            "n": 10,
            "k": 7
        },
        "1": {
            "base": "6",
            "value": "13444211440455345511"
        },
        "2": {
            "base": "15",
            "value": "aed7015a346d63"
        },
        "3": {
            "base": "15",
            "value": "6aeeb69631c227c"
        },
        "4": {
            "base": "16",
            "value": "e1b5e05623d881f"
        },
        "5": {
            "base": "8",
            "value": "316034514573652620673"
        },
        "6": {
            "base": "3",
            "value": "2122212201122002221120200210011020220200"
        },
        "7": {
            "base": "3",
            "value": "20120221122211000100210021102001201112121"
        },
        "8": {
            "base": "6",
            "value": "20220554335330240002224253"
        },
        "9": {
            "base": "12",
            "value": "45153788322a1255483"
        },
        "10": {
            "base": "7",
            "value": "1101613130313526312514143"
        }
    };

    try {
        
        const secret1 = solveSecretSharing(testCase1);
        console.log('Secret for first test case:', secret1.toString());

       
        const secret2 = solveSecretSharing(testCase2);
        console.log('Secret for second test case:', secret2.toString());
    } catch (error) {
        console.error('Error:', error);
    }
}


main();




//---------------------------------------------------------------------------------------------output---------------------------------------------------------
//Secret for first test case: 3
//Secret for second test case: 79836264059587
