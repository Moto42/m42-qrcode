

function qrcodeToMatrix(code) {
    const width = code.getModuleCount();
    const output = [];
    for(let i = 0; i < width; i++){ output.push([]) }

    for(let y = 0; y < width; y++){
        for(let x = 0; x < width; x++){
            output[y][x] = code.isDark(y,x);
        }
    }
    return output;
}

function getRect(x,y,height,width,isdark=false,hue=160){
    color = `hsl(${hue},${Math.random()*60+40}%,${Math.random()*30}%)`;
    const rect = d3.create('svg:rect')
        .attr('x',x)
        .attr('y',y)
        .attr('height',height)
        .attr('width', width);
    if(isdark) rect.attr('fill', color);
    else rect.attr('fill', 'white');
    return rect;
}

function makenewcode(event){
    const text = $('.qrCoder__text')[0].value;
    const code = qrcode(0,'H')
    code.addData(text);
    code.make();
    const moduleCount = code.getModuleCount();
    const moduleSize = 5;

    $('.qrCoder__outputs').children().remove()

    const svg = d3.select('.qrCoder__outputs').append("svg")
        .attr('height',moduleCount*moduleSize)
        .attr('width',moduleCount*moduleSize);
    
    const codeMatrix = qrcodeToMatrix(code);
    const hue = Math.random()*360;
    for(let rowNum in codeMatrix){
        const row = codeMatrix[rowNum];
        for(let moduleNum in row){
            const rect = getRect(moduleSize*moduleNum, moduleSize*rowNum,moduleSize, moduleSize, codeMatrix[rowNum][moduleNum],hue);
            svg.append(()=>rect.node());
        }
    }
}

$('.qrCoder__submit')[0].addEventListener('click',makenewcode);
const code = qrcode(0,'M')
code.addData('plu');
code.make();