console.log("E")
const DIV = document.getElementById("t")
const CI = document.getElementById("c")
const PI = document.getElementById("p")
const GOB = document.getElementById("GO")
const CLB = document.getElementById("CL")
function GetAll(w) {
    let all = []
    for (let i = 1; i < w + 1; i++) {
        all.push(i)
    }
    return all
}

function main(c, p) {
    var count = c
    var pass = p
    let all = GetAll(Number(c))
    let show = "　" + all.join("　　") + "　"
    results += "\n" + "-------------------------------------------------------------"
    results += "\n" + count + "，" + p + "：\n" + show
    // DIV.innerText = results
    for (let i = 0; i < count - 1; i++) {
        let r = dostep(all, show, pass)
        all = r[0]
        show = r[1]
        results += "\n" + show.slice()
        // DIV.innerText = results
    }
    results2[p] = all[0]
    results += "\n" + show.replace(/\｛[^\]]+\｝/g, '　_　')
    results += "\n=" + all[0]
    // DIV.innerText = results

}

function dostep(all, show, p) {
    let i = (p) % (all.length) - 1
    i = i < 0 ? all.length - 1 : i
    let r = all.splice(i, 1)
    r = r[0]
    // console.log(r)
    // let Ns = show
    let Ns = show.replace(/\｛[^\]]+\｝/g, '　_　')
    // let Ns = show.replace(new RegExp(targetChar, r), '['+r+']')
    Ns = Ns.replace("　" + r + "　", '｛' + r + '｝')
    return [all, Ns]
}

function createAnalysisTable(data,c) {
    const resultGroups = {};

    for (const key in data) {
        const value = data[key];
        if (!resultGroups[value]) {
            resultGroups[value] = [];
        }
        resultGroups[value].push(key);
    }

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const th = document.createElement('th');
    th.textContent = 'Result('+c+')';
    th.style.width = '40px'
    headerRow.appendChild(th);
    const th2 = document.createElement('th');
    th2.textContent = 'Numbers';
    headerRow.appendChild(th2);

    for (const result in resultGroups) {
        const numbers = resultGroups[result];
        const row = table.insertRow();
        const resultCell = row.insertCell();
        resultCell.textContent = result;
        const numbersCell = row.insertCell();
        numbersCell.textContent = numbers.join(', ');
    }

    return table;
}

function findGCD(a, b) {
    if (b === 0) {
        return a;
    } else {
        return findGCD(b, a % b);
    }
}

function findLCM(numbers) {
    // 初始化 lcm 為第一個數字
    console.log(numbers)
    let lcm = numbers[0];
    // 遍歷所有數字，找到它們的最小公倍數
    for (let i = 1; i < numbers.length; i++) {
        // 找到當前數字與前一次計算的 lcm 的最小公倍數
        lcm = (lcm * numbers[i]) / findGCD(lcm, numbers[i]);
    }
    return lcm;
}

let results = ""
let results2 = {}

CLB.addEventListener("click", () => {
    results = ""
    DIV.innerText = results
    document.getElementById('analysisTable').innerHTML = ""
})
GOB.addEventListener("click", () => {
    results2 = {}
    if (PI.value == 0) {
        results = ""
        const lcm = findLCM(GetAll(Number(CI.value)));
        console.log(lcm)
        for (let i = 1; i < lcm + 1; i++) {
            main(CI.value, i)
        }
        console.log(results2)
        const analysisTable = createAnalysisTable(results2,CI.value);
        document.getElementById('analysisTable').appendChild(analysisTable);
    } else {
        main(CI.value, PI.value)
    }
    DIV.innerText = results
})
