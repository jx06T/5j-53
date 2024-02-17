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
    let result = ""
    result += "\n" + "--------------------------------------"
    result += "\n" + count + "，" + p + "：\n" + show
    // DIV.innerText = results
    for (let i = 0; i < count - 1; i++) {
        let r = dostep(all, show, pass)
        all = r[0]
        show = r[1]
        result += "\n" + show.slice()
        // DIV.innerText = results
    }
    result2[p] = all[0]
    result += "\n" + show.replace(/\｛[^\]]+\｝/g, '　_　')
    result += "\n=" + all[0]
    // DIV.innerText = results
    return result
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

function createAnalysisTable(data, c, lcm) {
    const ddiv = document.createElement('div');
    const resultGroups = data;

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const th = document.createElement('th');
    th.textContent = 'Result(' + c + ')';
    th.style.width = '40px'
    headerRow.appendChild(th);
    const th2 = document.createElement('th');
    th2.textContent = 'Numbers';
    headerRow.appendChild(th2);
    const th3 = document.createElement('th');
    th3.textContent = 'Count';
    headerRow.appendChild(th3);
    th3.style.width = '35px'
    // const th4 = document.createElement('th');
    // th4.textContent = 'v';
    // headerRow.appendChild(th4);
    // th4.style.width = '25px'


    for (const result in resultGroups) {
        const numbers = resultGroups[result];
        const row = table.insertRow();
        const resultCell = row.insertCell();
        resultCell.textContent = result;
        const numbersCell = row.insertCell();
        numbersCell.textContent = numbers.join(', ');
        const countCell = row.insertCell();
        countCell.textContent = numbers.length;
        // const vCell = row.insertCell();
        // const v = document.createElement('button')
        // v.style.width = '25px'
        // v.className = 'v'
        // v.textContent = 'v';
        // // vCell.textContent = numbers.length;
        // vCell.appendChild(v)
    }

    ddiv.appendChild(table)
    return ddiv;
}

function createAnalysisTable2(data, c, lcm) {
    const ddiv = document.createElement('div')

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "1";
    slider.max = findFactors(lcm).length;
    slider.value = "6";
    slider.className = "slider";
    slider.id = "Range";
    slider.style.width = "80%";
    slider.dataset.id = result2s.length - 1;

    slider.addEventListener("input", () => {
        console.log("fffffffff")
        slider.parentNode.parentNode.querySelector(".div2").remove();
        const N = createAnalysisTable3(Number(slider.dataset.id), c, lcm, findFactors(lcm)[Number(slider.value) - 1])
        slider.parentNode.insertAdjacentElement('afterend', N);
    })

    const captureButton = document.createElement("button");
    captureButton.className = "D"
    captureButton.textContent = "DD"; // 设置按钮文本内容
    captureButton.addEventListener("click", () => {
        captureAndDownload(slider.parentNode.parentNode.querySelector('[class="div2"]'))
    });

    const captureButton2 = document.createElement("button");
    captureButton2.className = "D"
    captureButton2.textContent = "DU"; // 设置按钮文本内容
    captureButton2.addEventListener("click", () => {
        exportToExcel(data)
    });
    ddiv.appendChild(slider)
    ddiv.appendChild(captureButton)
    ddiv.appendChild(captureButton2)

    return ddiv;
}

function exportToExcel(data) {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet([]);

    var headers = [];
    var headers2 = [];
    for (var key in data) {
        headers.push(key);
        headers2.push("");
    }
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(ws, [headers2], { origin: 'A2' });

    // 添加数据
    var maxRowCount = 0;
    for (var i = 0; i < Object.values(data).reduce((a, b) => Math.max(a, b.length), 0); i++) {
        var rowData = [];
        // rowData.push(i + 1); // Row number
        for (var key in data) {
            var columnData = data[key];
            rowData.push(columnData[i] || "");
        }
        XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: XLSX.utils.encode_cell({ r: i + 2, c: 0 }) });
    }

    // 调整表格大小
    ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: Object.values(data).reduce((a, b) => Math.max(a, b.length), 0), c: Object.keys(data).length } });

    // 写入文件
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
}

function captureAndDownload(container) {
    html2canvas(container).then(function (canvas) {
        // 将画布转换为数据 URL
        var imageUrl = canvas.toDataURL("image/png");

        // 创建下载链接
        var downloadLink = document.createElement("a");
        downloadLink.download = "content.png"; // 设置下载文件名
        downloadLink.href = imageUrl; // 设置下载链接的 URL
        downloadLink.click(); // 模拟点击下载链接
    });
}


function data0(data) {
    const resultGroups = {};

    for (const key in data) {
        const value = data[key];
        if (!resultGroups[value]) {
            resultGroups[value] = [];
        }
        resultGroups[value].push(key);
    }
    return resultGroups
}
function createAnalysisTable3(id, c, lcm, x) {
    let data = result2s[id][0]
    let randomColors = result2s[id][1]
    const div2 = document.createElement('div')
    div2.classList.add("div2")
    const r = Math.ceil(lcm / x)

    for (let i = 0; i < r; i++) {
        const div3 = document.createElement('div')
        // div3.style.width = "90%";
        div3.className = "LR"
        for (let j = 0; j < x; j++) {
            const div4 = document.createElement('div')
            div4.textContent = i * x + j + 1
            div4.style.backgroundColor = randomColors[data[parseInt(div4.textContent)] - 1]
            div4.className = "item"
            div4.style.height = "30px"
            div3.appendChild(div4)
        }
        div2.appendChild(div3)
    }
    return div2
}

function findFactors(number) {
    var factors = [];

    for (var i = 1; i <= number; i++) {
        if (number % i === 0) {
            factors.push(i);
        }
    }

    return factors;
}

function generateRandomHexColors(n) {
    var colors = [];
    for (var i = 0; i < n; i++) {
        var color = '#';
        for (var j = 0; j < 6; j++) {
            var randomHex = Math.floor(Math.random() * 16);
            color += randomHex.toString(16);
        }
        colors.push(color);
    }
    return colors;
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
let result2s = []
let result2 = {}

CLB.addEventListener("click", () => {
    results = ""
    result2s = []
    DIV.innerText = results
    document.getElementById('analysisTable').innerHTML = ""
})
GOB.addEventListener("click", () => {
    result2 = {}
    if (PI.value == 0) {
        results = ""
        const lcm = findLCM(GetAll(Number(CI.value)));
        console.log(lcm)
        for (let i = 1; i < lcm + 1; i++) {
            var result = main(CI.value, i)
            results = result + results
        }
        console.log(result2)
        const randomColors = generateRandomHexColors(CI.value);
        const d0 = data0(result2)
        result2s.push([result2, randomColors, d0])
        const id = result2s.length - 1

        const ddiv = document.createElement("div")
        const analysisTable = createAnalysisTable(d0, CI.value, lcm);
        const analysisTable3 = createAnalysisTable3(id, c, lcm, 6);
        const analysisTable2 = createAnalysisTable2(d0, c, lcm, analysisTable3);

        ddiv.appendChild(analysisTable)
        ddiv.appendChild(analysisTable2)
        ddiv.appendChild(analysisTable3)
        document.getElementById('analysisTable').appendChild(ddiv);
    } else {
        var result = main(CI.value, PI.value)
    }

    results = result + results
    DIV.innerText = results
})
