

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

function makenewcode(event){
    const text = $('.qrCoder__text')[0].value;
    const code = qrcode(0,'M')
    code.addData(text);
    code.make();
    const moduleCount = code.getModuleCount();
    const moduleSize = 5;

    $('.qrCoder__outputs').children().remove()
    
    const svg = d3.select('.qrCoder__outputs').append("svg")
        .attr('height',moduleCount*moduleSize)
        .attr('width',moduleCount*moduleSize);
    
    const codeMatrix = qrcodeToMatrix(code);
    for(let rowNum in codeMatrix){
        const row = codeMatrix[rowNum];
        for(let moduleNum in row){
            const rect = svg.append('rect')
                .attr('x',moduleNum*moduleSize)
                .attr('y',rowNum*moduleSize)
                .attr('height', moduleSize)
                .attr('width', moduleSize);
            if(codeMatrix[rowNum][moduleNum]) rect.attr('fill', 'black');
            else rect.attr('fill', 'white');
        }
    }
}

$('.qrCoder__submit')[0].addEventListener('click',makenewcode);
const code = qrcode(0,'M')
code.addData('plu');
code.make();